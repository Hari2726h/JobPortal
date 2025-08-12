import React, { useEffect, useState } from 'react';
import {
  Card,
  Spinner,
  Alert,
  Button,
  Container,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import {
  Building,
  GeoAlt,
  CalendarCheck,
  BoxArrowInRight,
} from 'react-bootstrap-icons';
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
      } catch (err) {
        console.error('Error fetching applied jobs', err);
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
        className="py-5 text-light"
        style={{
          background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
          minHeight: '160px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgb(0 0 0 / 0.2)',
        }}
      >
        <Container>
          <h2 className="fw-bold mb-1">My Applied Jobs</h2>
          <p className="mb-0 fs-5 opacity-75">Track all the jobs you have applied for</p>
        </Container>
      </section>

      <Container className="my-5">
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 fs-5 text-secondary">Loading applied jobs...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && appliedJobs.length === 0 && (
          <Alert variant="info" className="text-center fs-5">
            You haven’t applied for any jobs yet.{' '}
            <Button variant="link" onClick={() => navigate('/')} className="p-0 align-baseline">
              Browse Jobs
            </Button>
          </Alert>
        )}

        <Row xs={1} md={2} lg={3} className="g-4">
          {appliedJobs.map((job) => (
            <Col key={job.id}>
              <Card className="shadow-sm border-0 h-100 job-card">
                <Card.Body className="d-flex flex-column">
                  <h5 className="fw-bold text-primary mb-3">{job.title}</h5>

                  <div className="mb-2 d-flex align-items-center text-muted" title="Company">
                    <Building className="me-2" />
                    <span>{job.company}</span>
                  </div>

                  <div className="mb-2 d-flex align-items-center text-muted" title="Location">
                    <GeoAlt className="me-2" />
                    <span>{job.location}</span>
                  </div>

                  <div className="mb-3 d-flex align-items-center text-muted" title="Applied Date">
                    <CalendarCheck className="me-2" />
                    <span>{new Date(job.appliedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/jobDetail/${job.id}`)}
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      <BoxArrowInRight />
                      View Job
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
<style>{`.job-card {
              transition: transform 0.2s ease, box-shadow 0.2s ease;
                          cursor: pointer;
                                    }
                                              .job-card:hover {
                                                          transform: translateY(-6px);
                                                                      box-shadow: 0 12px 24px rgb(13 110 253 / 0.3);
                                                                                }`}</style>
                                                                                      </Container>
                                                                                          </>
                                                                                            );
                                                                                            };

                                                                                            export default AppliedJobsPage;