import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

const AppliedJobsPage = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/login');
          return;
        }
        const data = await api.fetchAppliedJobs(user.id);
        setAppliedJobs(data);
      } catch {
        console.error('Erorr fetching applied jobs',error.message || error.response);
        setError('Failed to load applied jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, [navigate]);

  return (
    <>
      <section
        className="py-4 text-light"
        style={{
          background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <h2 className="fw-bold">My Applied Jobs</h2>
          <p className="mb-0">Track all the jobs you have applied for</p>
        </div>
      </section>

      <div className="container my-4">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading applied jobs...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && appliedJobs.length === 0 && (
          <Alert variant="info" className="text-center">
            You haven’t applied for any jobs yet.{' '}
            <Button variant="link" onClick={() => navigate('/')}>
              Browse Jobs
            </Button>
          </Alert>
        )}

        {appliedJobs.map((job) => (
          <Card key={job.id} className="shadow-sm border-0 mb-3">
            <Card.Body>
              <h5 className="fw-bold text-primary">{job.title}</h5>
              <p className="mb-1">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Applied Date:</strong>{' '}
                {new Date(job.appliedDate).toLocaleDateString()}
              </p>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => navigate(`/jobDetail/${ job.id }`)}
              >
                View Job
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AppliedJobsPage;
