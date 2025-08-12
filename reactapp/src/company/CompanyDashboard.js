import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ListGroup, Alert, Spinner, Modal, Badge, Row, Col } from 'react-bootstrap';
import { BriefcaseFill, PeopleFill, PlusCircleFill, TrashFill, BoxArrowRight, ClipboardCheck } from 'react-bootstrap-icons';
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

    const fetchJobs = async () => {
        setLoadingJobs(true);
        setErrorJobs('');
        try {
            const data = await api.getJobsByCompany(company.id);
            setJobs(data || []);
        } catch {
            setErrorJobs('Failed to load jobs. Please try again later.');
        } finally {
            setLoadingJobs(false);
        }
    };

    const fetchApplications = async () => {
        setLoadingApplications(true);
        setErrorApplications('');
        try {
            const data = await api.getApplicationsByCompany(company.id);
            setApplications(data || []);
        } catch {
            setErrorApplications('Failed to load applications. Please try again later.');
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
            await api.deleteJob(jobToDelete.id);
            setJobs((prev) => prev.filter((job) => job.id !== jobToDelete.id));
        } catch {
            alert('Failed to delete job. Please try again later.');
        } finally {
            setShowDeleteModal(false);
            setJobToDelete(null);
        }
    };

    if (!company) return null;

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-0">Welcome, {company.name || company.companyName}</h2>
                    <p className="text-muted mb-0">Manage your job postings and track applications.</p>
                </div>
                <Button variant="outline-danger" onClick={handleLogout}>
                    <BoxArrowRight className="me-2" /> Logout
                </Button>
            </div>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm border-0 text-center p-3">
                        <BriefcaseFill size={28} className="text-primary mb-2" />
                        <h4 className="fw-bold">{jobs.length}</h4>
                        <p className="text-muted mb-0">Active Jobs</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 text-center p-3">
                        <PeopleFill size={28} className="text-success mb-2" />
                        <h4 className="fw-bold">{applications.length}</h4>
                        <p className="text-muted mb-0">Total Applications</p>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0 text-center p-3">
                        <ClipboardCheck size={28} className="text-warning mb-2" />
                        <h4 className="fw-bold">{applications.filter(a => a.status === 'Reviewed').length}</h4>
                        <p className="text-muted mb-0">Reviewed Applications</p>
                    </Card>
                </Col>
            </Row>

            <Card className="mb-5 shadow-sm border-0">
                <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <h5 className="mb-0"><BriefcaseFill className="me-2" /> Posted Jobs</h5>
                    <Button variant="light" onClick={() => navigate('/company/post-job')}>
                        <PlusCircleFill className="me-1" /> Post New Job
                    </Button>
                </Card.Header>
                <Card.Body>
                    {loadingJobs ? (
                        <div className="text-center py-4"><Spinner animation="border" /></div>
                    ) : errorJobs ? (
                        <>
                            <Alert variant="danger">{errorJobs}</Alert>
                            <div className="text-center">
                                <Button variant="primary" onClick={fetchJobs}>Retry</Button>
                            </div>
                        </>
                    ) : jobs.length === 0 ? (
                        <Alert variant="info" className="text-center">No jobs posted yet. Click “Post New Job” to add one.</Alert>
                    ) : (
                        <ListGroup variant="flush">
                            {jobs.map((job) => (
                                <ListGroup.Item
                                    key={job.id}
                                    className="d-flex justify-content-between align-items-start p-3"
                                    style={{ borderRadius: '6px', transition: 'background 0.2s' }}

                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <div className="flex-grow-1">
                                        <h6 className="fw-bold mb-1">{job.title}</h6>
                                        <small className="text-muted">{job.location}</small>
                                        <p className="mb-1 text-truncate" style={{ maxWidth: '500px' }}>
                                            {job.description.length > 150 ? job.description.slice(0, 150) + '...' : job.description}
                                        </p>
                                    </div>
                                    <div className="text-nowrap">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => navigate(`/company/job/${job.id}/applications`, { state: { jobTitle: job.title } })}
                                            className="me-2"
                                        >
                                            <PeopleFill className="me-1" /> Applications
                                            {job.applicationsCount > 0 && (
                                                <Badge bg="secondary" className="ms-1">{job.applicationsCount}</Badge>
                                            )}
                                        </Button>

                                        <Button variant="outline-danger" size="sm" onClick={() => confirmDeleteJob(job)}>
                                            <TrashFill className="me-1" /> Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
                <Card.Header className="bg-secondary text-white">
                    <h5 className="mb-0"><PeopleFill className="me-2" /> Recent Applications</h5>
                </Card.Header>
                <Card.Body>
                    {loadingApplications ? (
                        <div className="text-center py-4"><Spinner animation="border" /></div>
                    ) : errorApplications ? (
                        <>
                            <Alert variant="danger">{errorApplications}</Alert>
                            <div className="text-center">
                                <Button variant="primary" onClick={fetchApplications}>Retry</Button>
                            </div>
                        </>
                    ) : applications.length === 0 ? (
                        <Alert variant="info" className="text-center">No applications received yet.</Alert>
                    ) : (
                        <ListGroup variant="flush">
                            {applications.slice(0, 5).map((app) => (
                                <ListGroup.Item key={app.id} className="p-3">
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
                    Are you sure you want to delete <strong>{jobToDelete?.title}</strong>? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteJob}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CompanyDashboard;