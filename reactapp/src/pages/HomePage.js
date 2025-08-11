import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { BriefcaseFill, GeoAltFill, CurrencyDollar } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ jobs, setJobs }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        if (jobs && jobs.length > 0) {
            setLoading(false);
            return;
        }

        const loadJobs = async () => {
            try {
                const data = await api.fetchJobs();
                if (isMounted) {
                    setJobs(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load jobs.');
                    setLoading(false);
                }
            }
        };

        loadJobs();

        return () => {
            isMounted = false;
        };
    }, [jobs, setJobs]);

    return (
        <>
            <section
                className="py-5 text-light"
                style={{
                    background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
                    minHeight: '250px',
                    display: 'flex',
                    alignItems: 'center'
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
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        Browse Jobs
                    </Button>
                </div>
            </section>

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
                                    onClick={() => navigate(`/jobDetail/${ job.id }`)} // Updated to match App.js route
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="d-flex align-items-center">
                                            <BriefcaseFill className="me-2 text-primary" /> {job.title}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {job.company}
                                        </Card.Subtitle>
                                        <div className="mb-2">
                                            <GeoAltFill className="me-1 text-secondary" />
                                            {job.location}
                                        </div>
                                        <div className="mb-3">
                                            <CurrencyDollar className="me-1 text-success" />
                                            {job.salary || 'Not specified'}
                                        </div>
                                        <Card.Text className="text-truncate">
                                            {job.description}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering card click
                                                navigate(`/jobDetail/${ job.id }`); // Also updated
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
