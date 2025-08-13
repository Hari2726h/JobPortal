import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { Card, Button, Spinner, Alert, Badge, Carousel } from 'react-bootstrap';
import { BriefcaseFill, GeoAltFill, CurrencyDollar, Building } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const jobCategories = [
      { id: 1, name: 'Software Development' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'Design' },
      { id: 4, name: 'Finance' },
      { id: 5, name: 'Healthcare' },
      { id: 6, name: 'Education' },
];

const categoryFilters = {
      'Software Development': ['developer', 'software', 'engineer', 'frontend', 'backend', 'fullstack', 'programmer'],
      Marketing: ['marketing', 'seo', 'content', 'social media'],
      Design: ['designer', 'design', 'ui', 'ux', 'graphic'],
      Finance: ['finance', 'accountant', 'financial', 'analyst'],
      Healthcare: ['health', 'medical', 'doctor', 'nurse'],
      Education: ['teacher', 'education', 'tutor', 'trainer'],
};

const HomePage = ({ jobs, setJobs }) => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [companies, setCompanies] = useState([]);
      const [filteredJobs, setFilteredJobs] = useState([]);
      const [activeCategory, setActiveCategory] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {
            let isMounted = true;

            if (jobs && jobs.length > 0) {
                  setLoading(false);
                  setFilteredJobs(jobs);
            } else {
                  api.fetchJobs()
                        .then((data) => {
                              if (isMounted) {
                                    setJobs(data);
                                    setLoading(false);
                                    setFilteredJobs(data);
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
            setActiveCategory(categoryName);
            const keywords = categoryFilters[categoryName] || [];
            if (keywords.length === 0) {
                  setFilteredJobs(jobs);
                  return;
            }
            const filtered = jobs.filter(job => {
                  if (!job.title) return false;
                  const titleLower = job.title.toLowerCase();
                  return keywords.some(keyword => titleLower.includes(keyword.toLowerCase()));
            });
            setFilteredJobs(filtered);
      };

      const fallbackCompanies = [
            {
                  id: 'g1',
                  name: 'Google',
                  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
            },
            {
                  id: 'a1',
                  name: 'Amazon',
                  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
            },
            {
                  id: 'm1',
                  name: 'Microsoft',
                  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
            },
            {
                  id: 'f1',
                  name: 'Facebook',
                  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png',
            },
      ];

      return (
            <>
                  <section
                        className="py-5 text-light text-center"
                        style={{
                              background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
                              minHeight: '250px',
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'column',
                              justifyContent: 'center',
                        }}
                  >
                        <h1 className="fw-bold display-5 mb-3 animated-fade-slide animated-delay-1">
                              Find Your <span className="text-warning">Dream Job</span>
                        </h1>
                        <p className="lead mb-4 animated-fade-slide animated-delay-2">
                              Explore thousands of job opportunities and take the next step in your career.
                        </p>
                        <Button
                              variant="warning"
                              size="lg"
                              className="fw-semibold shadow-sm animated-fade-slide animated-delay-3"
                              onClick={() =>
                                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                              }
                        >
                              Browse Jobs
                        </Button>
                  </section>

                  <section className="container my-5">
                        <h3 className="mb-4 text-center">Browse by Job Categories</h3>
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                              {jobCategories.map((cat) => (
                                    <Badge
                                          key={cat.id}
                                          bg={activeCategory === cat.name ? 'warning' : 'primary'}
                                          pill
                                          className="badge-pill-hover"
                                          style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '1rem' }}
                                          onClick={() => handleCategoryClick(cat.name)}
                                          title={`Browse jobs in ${cat.name}`}
                                    >
                                          {cat.name}
                                    </Badge>
                              ))}
                              <Badge
                                    bg={!activeCategory ? 'warning' : 'primary'}
                                    pill
                                    className="badge-pill-hover"
                                    style={{ cursor: 'pointer', padding: '10px 20px', fontSize: '1rem' }}
                                    onClick={() => {
                                          setActiveCategory(null);
                                          setFilteredJobs(jobs);
                                    }}
                                    title="Show all jobs"
                              >
                                    All
                              </Badge>

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

                        {!loading && !error && filteredJobs.length === 0 && (
                              <p className="text-center text-muted">No jobs available in this category.</p>
                        )}

                        <div className="row">
                              {!loading &&
                                    !error &&
                                    filteredJobs.map((job) => (
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
                                                            <div className="mb-3 text-success" style={{ fontWeight: '600' }}>
                                                                  <CurrencyDollar className="me-1" />
                                                                 {job.salaryRange && job.salaryRange.trim() !== '' ? job.salaryRange : 'Not specified'}
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
                              {(companies.length > 0 || fallbackCompanies.length > 0) && (
                                    <section className="container my-5">
                                          <h3 className="mb-4 text-center">Top Hiring Companies</h3>
                                          <Carousel
                                                indicators={false}
                                                interval={3000}
                                                controls={(companies.length || fallbackCompanies.length) > 1}
                                          >
                                                {(companies.length ? companies : fallbackCompanies).map((company) => (
                                                      <Carousel.Item key={company.id}>
                                                            <div className="d-flex justify-content-center align-items-center" style={{ height: 120 }}>
                                                                  {company.logoUrl ? (
                                                                        <img
                                                                              src={company.logoUrl}
                                                                              style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }}
                                                                        />
                                                                  ) : (
                                                                        <Building size={80} />
                                                                  )}
                                                            </div>
                                                      </Carousel.Item>
                                                ))}
                                          </Carousel>
                                    </section>
                              )}
                        </div>
                  </div>
            </>
      );
};
export default HomePage;