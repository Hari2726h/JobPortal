import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import { Form, Button, Spinner, Alert, Card } from 'react-bootstrap';

const ApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [errorJob, setErrorJob] = useState('');

  const [coverLetter, setCoverLetter] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await api.fetchJobById(jobId);
        setJob(data);
      } catch {
        setErrorJob('Failed to load job details.');
      } finally {
        setLoadingJob(false);
      }
    };
    loadJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setErrorSubmit('');
    setSuccess('');

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      alert('Please log in before applying.');
      navigate('/login');
      return;
    }

    const applicationData = {
      jobId: job.id,
      coverLetter,
      resumeLink,
      appliedDate: new Date().toISOString(),
    };

    try {
      await api.createApplication(loggedInUser.id, applicationData);
      setSuccess('Application submitted successfully!');
      setCoverLetter('');
      setResumeLink('');

      // Redirect to home after short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch {
      setErrorSubmit('Failed to submit application.');
    } finally {
      setLoadingSubmit(false);
    }
  };


  return (
    <>
      {/* Banner */}
      <section className="py-4 text-light"
        style={{
          background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <h2 className="fw-bold">Apply for Job</h2>
          <p className="mb-0">Submit your application below</p>
        </div>    </section>

      <div className="container my-4">
        {loadingJob && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading job details...</p>
          </div>
        )}

        {errorJob && <Alert variant="danger">{errorJob}</Alert>}

        {job && (
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <h4 className="fw-bold text-primary">{job.title}</h4>
              <p className="mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="mb-1"><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </Card.Body>
          </Card>)}

        {/* Application Form */}
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h5 className="fw-bold mb-3">Application Form</h5>
            {errorSubmit && <Alert variant="danger">{errorSubmit}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Cover Letter</Form.Label>
                <Form.Control as="textarea"
                  rows={5}
                  placeholder="Write your cover letter here..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume Link</Form.Label>
                <Form.Control type="url"
                  placeholder="Paste your resume link (Google Drive, Dropbox, etc.)"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  required />
              </Form.Group>

              <Button type="submit"
                variant="primary"
                className="fw-semibold"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? 'Submitting...' : 'Submit Application'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ApplicationPage;