import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ListGroup, Alert, Spinner, Modal } from 'react-bootstrap';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [errorJobs, setErrorJobs] = useState('');
    const [errorApplications, setErrorApplications] = useState('');
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    const navigate = useNavigate();
    const company = JSON.parse(localStorage.getItem('company'));

    useEffect(() => {
        if (!company) {
            navigate('/company/login');
            return;
        }
        fetchJobs();
        fetchApplications();
    }, []);

    // Fetch jobs posted by company
    const fetchJobs = async () => {
        setLoadingJobs(true);
        setErrorJobs('');
        try {
            const data = await api.getJobsByCompany(company.id);
            setJobs(data || []);
        } catch (err) {
            setErrorJobs('Failed to load jobs. Please try again later.');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoadingJobs(false);
        }
    };

    // Fetch applications received for company's jobs
    const fetchApplications = async () => {
        setLoadingApplications(true);
        setErrorApplications('');
        try {
            const data = await api.getApplicationsByCompany(company.id);
            setApplications(data || []);
        } catch (err) {
            setErrorApplications('Failed to load applications. Please try again later.');
            console.error('Error fetching applications:', err);
        } finally {
            setLoadingApplications(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('company');
        navigate('/company/login');
    };

const confirmDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
};

const cancelDelete = () => {
    setJobToDelete(null);
    setShowDeleteModal(false);
};


const handleDeleteJob = async () => {
    if (!jobToDelete) return;
    try {
        setJobs((prev) => prev.filter((job) => job.id !== jobToDelete.id));
        setShowDeleteModal(false);
        setJobToDelete(null);
    } catch {
        alert('Failed to delete job. Please try again later.');
    }
};

if (!company) return null;

return (
    <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Welcome, {company.name || company.companyName}</h2>
            <Button variant="outline-danger" onClick={handleLogout}>
                Logout
            </Button>
        </div>

        <Card className="mb-5 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                <h5 className="mb-0">Posted Jobs</h5>
                <Button variant="light" onClick={() => navigate('/company/post-job')}>
                    + Post New Job
                </Button>
            </Card.Header>
            <Card.Body>
                {loadingJobs ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : errorJobs ? (
                    <>
                        <Alert variant="danger">{errorJobs}</Alert>
                        <div className="text-center">
                            <Button variant="primary" onClick={fetchJobs}>
                                Retry
                            </Button>
                        </div>
                    </>
                ) : jobs.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No jobs posted yet. Click “Post New Job” to add one.
                    </Alert>
                ) : (
                    <ListGroup variant="flush">
                        {jobs.map((job) => (
                            <ListGroup.Item key={job.id} className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">{job.title}</h6>
                                    <small className="text-muted">{job.location}</small>
                                    <p className="mb-1 text-truncate" style={{ maxWidth: '500px' }}>
                                        {job.description.length > 150 ? job.description.slice(0, 150) + '...' : job.description}
                                    </p>
                                </div>
                                <div className="btn-group btn-group-sm" role="group" aria-label="Job actions">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => navigate(`/company/job/${job.id}/applications`)}
                                        title="View Applications"
                                    >
                                        Applications
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => confirmDeleteJob(job)} title="Delete Job">
                                        Delete
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>

        <Card className="shadow-sm">
            <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">Recent Applications</h5>
            </Card.Header>
            <Card.Body>
                {loadingApplications ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : errorApplications ? (
                    <>
                        <Alert variant="danger">{errorApplications}</Alert>
                        <div className="text-center">
                            <Button variant="primary" onClick={fetchApplications}>
                                Retry
                            </Button>
                        </div>
                    </>
                ) : applications.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No applications received yet.
                    </Alert>
                ) : (
                    <ListGroup variant="flush">
                        {applications.slice(0, 5).map((app) => (
                            <ListGroup.Item key={app.id}>
                                <strong>{app.applicantName}</strong> applied for <em>{app.jobTitle}</em>
                                <p className="mb-0 text-muted">Email: {app.applicantEmail}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={cancelDelete} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the job <strong>{jobToDelete?.title}</strong>? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteJob}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>
);
                        };
export default CompanyDashboard;
