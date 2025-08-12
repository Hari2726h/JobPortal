import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Alert, Badge, ListGroup, Modal } from 'react-bootstrap';
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
            const jobApplications = allApplications.filter(app => app.jobId === parseInt(jobId));
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
                <Card className="shadow-sm border-0">
                    <ListGroup variant="flush">
                        {applications.map(app => (
                            <ListGroup.Item key={app.id} className="d-flex justify-content-between align-items-center p-3">
                                <div>
                                    <strong>{app.applicantName}</strong> <br />
                                    <small className="text-muted">{app.applicantEmail}</small>
                                </div>
                                <div className="text-end">
                                    <Badge bg={app.status === 'Reviewed' ? 'success' : 'warning'}>
                                        {app.status}
                                    </Badge>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="ms-3"
                                        onClick={() => handleViewDetails(app)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            )}

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedApp && (
                        <>
                            <p><strong>Name:</strong> {selectedApp.applicantName}</p>
                            <p><strong>Email:</strong> {selectedApp.applicantEmail}</p>
                            <p><strong>Status:</strong> {selectedApp.status}</p>
                            <p><strong>Resume:</strong> <a href={selectedApp.resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                            <p><strong>Cover Letter:</strong> {selectedApp.coverLetter}</p>
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
                                    await api.updateApplication(selectedApp.id, selectedApp.userId, { ...selectedApp, status: 'Reviewed' });
                                    setApplications(prev => prev.map(app =>
                                        app.id === selectedApp.id ? { ...app, status: 'Reviewed' } : app
                                    ));
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