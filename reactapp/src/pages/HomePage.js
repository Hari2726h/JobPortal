import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { Card, Button, Spinner, Alert, Badge, Carousel } from 'react-bootstrap';
import { BriefcaseFill, GeoAltFill, CurrencyDollar, Building } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const jobCategories = [
      { id: 1, name: 'Software Development' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'Design' },
      { id: 4, name: 'Finance' },
      { id: 5, name: 'Healthcare' },
      { id: 6, name: 'Education' },
];

const HomePage = ({ jobs, setJobs }) => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [companies, setCompanies] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
            let isMounted = true;

            if (jobs && jobs.length > 0) {
                  setLoading(false);
            } else {
                  api.fetchJobs()
                        .then((data) => {
                              if (isMounted) {
                                    setJobs(data);
                                    setLoading(false);
                              }
                        })
                        .catch(() => {
                              if (isMounted) {
                                    setError('Failed to load jobs.');
                                    setLoading(false);
                              }
                        });
            }

            api.getAllCompanies()
                  .then((data) => {
                        if (isMounted) setCompanies(data.slice(0, 5));
                  })
                  .catch(() => {
                        if (isMounted) setCompanies([]);
                  });

            return () => { isMounted = false; };
      }, [jobs, setJobs]);

      const handleCategoryClick = (categoryName) => {
            navigate();
      };

      return (
            <>
                  <section
                        className="py-5 text-light"
                        style={{
                              background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
                              minHeight: '250px',
                              display: 'flex',
                              alignItems: 'center',
                        }}
                  >
                        <div className="container text-center">
                              <h1 className="fw-bold display-5 mb-3">
                                    Find Your <span className="text-warning">Dream Job</span>
                              </h1>
                              <p className="lead mb-4">
                                    Explore thousands of job opportunities and take the next step in your career.
                              </p>
                              <Button
                                    variant="warning"
                                    size="lg"
                                    className="fw-semibold shadow-sm"
                                    onClick={() =>
                                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                                    }
                              >
                                    Browse Jobs
                              </Button>
                        </div>
                  </section>
                  {companies.length > 0 && (
                        <section className="container my-5">
                              <h3 className="mb-4 text-center">Top Hiring Companies</h3>
                              <Carousel indicators={false} interval={3000} controls={companies.length > 1}>
                                    {companies.map((company) => (
                                          <Carousel.Item key={company.id}>
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: 120 }}>
                                                      {company.logoUrl ? (
                                                            <img
                                                                  src={company.logoUrl}
                                                                  alt={company.name}
                                                                  style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }}
                                                            />
                                                      ) : (
                                                            <Building size={80} />
                                                      )}
                                                </div>
                                                <Carousel.Caption>
                                                      <h5>{company.name}</h5>
                                                </Carousel.Caption>
                                          </Carousel.Item>
                                    ))}
                              </Carousel>
                        </section>
                  )}

                  <section className="container my-5">
                        <h3 className="mb-4 text-center">Browse by Job Categories</h3>
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                              {jobCategories.map((cat) => (
                                    <Badge
                                          key={cat.id}
                                          bg="primary"
                                          pill
                                          style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '1rem' }}
                                          onClick={() => handleCategoryClick(cat.name)}
                                          title={`Browse jobs in ${cat.name}`}
                                    >
                                          {cat.name}
                                    </Badge>
                              ))}
                        </div>
                  </section >

                  <div className="container my-5">
                        {loading && (
                              <div className="text-center my-5">
                                    <Spinner animation="border" variant="primary" />
                                    <p className="mt-3">Loading jobs...</p>
                              </div>
                        )}

                        {error && (
                              <Alert variant="danger" className="text-center">
                                    {error}
                              </Alert>
                        )}

                        {!loading && !error && jobs.length === 0 && (
                              <p className="text-center text-muted">No jobs available at the moment.</p>
                        )}

                        <div className="row">
                              {!loading &&
                                    !error &&
                                    jobs.map((job) => (
                                          <div className="col-md-4 mb-4" key={job.id}>
                                                <Card
                                                      className="shadow-sm border-0 h-100 clickable"
                                                      onClick={() => navigate(`/jobDetail/${job.id}`)}
                                                      style={{ cursor: 'pointer' }}
                                                >
                                                      <Card.Body>
                                                            <Card.Title className="d-flex align-items-center">
                                                                  <BriefcaseFill className="me-2 text-primary" /> {job.title}
                                                            </Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                                            <div className="mb-2">
                                                                  <GeoAltFill className="me-1 text-secondary" />
                                                                  {job.location}
                                                            </div>
                                                            <div className="mb-3">
                                                                  <CurrencyDollar className="me-1 text-success" />
                                                                  {job.salary || 'Not specified'}
                                                            </div>
                                                            <Card.Text className="text-truncate">{job.description}</Card.Text>
                                                            <Button
                                                                  variant="primary"
                                                                  onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate(`/jobDetail/${job.id}`);
                                                                  }}
                                                            >
                                                                  View Details
                                                            </Button>
                                                      </Card.Body>
                                                </Card>
                                          </div>
                                    ))}
                        </div>
                  </div>
            </>
      );
};
export default HomePage;