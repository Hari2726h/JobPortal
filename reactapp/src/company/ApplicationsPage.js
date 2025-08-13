import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Modal } from 'react-bootstrap';
import { PeopleFill, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import * as api from '../utils/api';

const ApplicationsPage = () => {
    const { jobId } = useParams();
    const { state } = useLocation();
    const jobTitle = state?.jobTitle || 'Job Applications';

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const company = JSON.parse(localStorage.getItem('company'));

    useEffect(() => {
        if (!company) {
            navigate('/company/login');
            return;
        }
        fetchJobApplications();
    }, []);

    const fetchJobApplications = async () => {
        setLoading(true);
        setError('');
        try {
            const allApplications = await api.getApplicationsByCompany(company.id);
            const jobApplications = allApplications.filter(app => app.job?.id === parseInt(jobId));
            setApplications(jobApplications);
        } catch {
            setError('Failed to load applications. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (application) => {
        setSelectedApp(application);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedApp(null);
        setShowModal(false);
    };

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">
                    <PeopleFill className="me-2" /> Applications for "{jobTitle}"
                </h3>
                <Button variant="outline-secondary" onClick={() => navigate('/company/dashboard')}>
                    <ArrowLeft className="me-1" /> Back
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <>
                    <Alert variant="danger">{error}</Alert>
                    <div className="text-center">
                        <Button variant="primary" onClick={fetchJobApplications}>Retry</Button>
                    </div>
                </>
            ) : applications.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No applications received for this job yet.
                </Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {applications.map(app => (
                        <Col key={app.id}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="fw-bold mb-1">{app.user?.name}</h5>
                                            <small className="text-muted">{app.user?.email}</small>
                                        </div>
                                        <Badge bg={app.status === 'Reviewed' ? 'success' : 'warning'}>
                                            {app.status || 'Pending'}
                                        </Badge>
                                    </div>
                                    <p className="mt-3 mb-2">
                                        <strong>Applied:</strong> {app.appliedDate}
                                    </p>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleViewDetails(app)}
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedApp && (
                        <>
                            <p><strong>Name:</strong> {selectedApp.user?.name}</p>
                            <p><strong>Email:</strong> {selectedApp.user?.email}</p>
                            <p><strong>Status:</strong> {selectedApp.status || 'Pending'}</p>
                            <p><strong>Applied Date:</strong> {selectedApp.appliedDate}</p>
                            <p>
                                <strong>Resume:</strong>{' '}
                                {selectedApp.resumeUrl ? (
                                    <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
                                ) : (
                                    'No resume uploaded'
                                )}
                            </p>
                            <p><strong>Cover Letter:</strong> {selectedApp.coverLetter || 'No cover letter'}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    {selectedApp?.status !== 'Reviewed' && (
                        <Button
                            variant="success"
                            onClick={async () => {
                                try {
                                    await api.updateApplication(selectedApp.id, selectedApp.user?.id, { ...selectedApp, status: 'Reviewed' });
                                    setApplications(prev =>
                                        prev.map(app =>
                                            app.id === selectedApp.id ? { ...app, status: 'Reviewed' } : app
                                        )
                                    );
                                    closeModal();
                                } catch {
                                    alert('Failed to update application status.');
                                }
                            }}
                        >
                            <CheckCircleFill className="me-1" /> Mark as Reviewed
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ApplicationsPage;