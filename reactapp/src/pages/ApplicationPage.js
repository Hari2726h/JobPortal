import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import { Form, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons';

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
            setLoadingSubmit(false);
            return;
        }

        if (!job || !job.id) {
            setErrorSubmit('Job information is missing.');
            setLoadingSubmit(false);
            return;
        }

        const applicationData = {
            job: { id: job.id },
            coverLetter,
            resumeLink,
            appliedDate: new Date().toISOString(),
        };

        try {
            await api.createApplication(loggedInUser.id, applicationData);
            setSuccess('Application submitted successfully!');
            setCoverLetter('');
            setResumeLink('');

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
            <section
                className="py-5 text-light"
                style={{
                    background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
                    minHeight: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgb(13 110 253 / 0.5)',
                    marginBottom: '2rem',
                }}
            >
                <div className="container">
                    <h1 className="fw-bold display-5 mb-2">Apply for Job</h1>
                    <p className="lead mb-0">Submit your application below to take the next step in your career.</p>
                </div>
            </section>

            <div className="container" style={{ maxWidth: '720px' }}>
                {loadingJob && (
                    <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" role="status" />
                        <p className="mt-3 fs-5 text-secondary">Loading job details...</p>
                    </div>
                )}

                {errorJob && (
                    <Alert variant="danger" className="d-flex align-items-center">
                        <ExclamationCircleFill className="me-2" />
                        {errorJob}
                    </Alert>
                )}

                {job && (
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Body>
                            <h3 className="fw-bold text-primary mb-3">{job.title}</h3>
                            <p className="mb-1"><strong>Company:</strong> {job.company}</p>
                            <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                            <hr />
                            <p className="mb-0"><strong>Description:</strong></p>
                            <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
                        </Card.Body>
                    </Card>
                )}

                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h4 className="fw-bold mb-4 border-bottom pb-2">Application Form</h4>

                        {errorSubmit && (
                            <Alert variant="danger" className="d-flex align-items-center">
                                <ExclamationCircleFill className="me-2" />
                                {errorSubmit}
                            </Alert>
                        )}

                        {success && (
                            <Alert variant="success" className="d-flex align-items-center">
                                <CheckCircleFill className="me-2" />
                                {success}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="mb-4" controlId="coverLetter">
                                <Form.Label className="fw-semibold">Cover Letter</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    placeholder="Introduce yourself and explain why you're a good fit..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    required
                                    minLength={50}
                                />
                                <Form.Text className="text-muted">Minimum 50 characters recommended.</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="resumeLink">
                                <Form.Label className="fw-semibold">Resume Link</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="Google Drive, Dropbox, or any public link"
                                    value={resumeLink}
                                    onChange={(e) => setResumeLink(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                className="fw-semibold w-100"
                                disabled={loadingSubmit}
                                style={{ fontSize: '1.1rem', padding: '0.65rem' }}
                            >
                                {loadingSubmit ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default ApplicationPage;
