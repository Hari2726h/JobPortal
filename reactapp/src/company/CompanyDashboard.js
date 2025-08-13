import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import {
    Container,
    Card,
    Button,
    Badge,
    Spinner,
    Alert,
    Row,
    Col,
    Modal
} from 'react-bootstrap';
import {
    BriefcaseFill,
    PeopleFill,
    PlusCircleFill,
    TrashFill,
    BoxArrowRight,
    BarChartFill
} from 'react-bootstrap-icons';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [errorJobs, setErrorJobs] = useState('');
    const [errorApplications, setErrorApplications] = useState('');
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
            setJobs(prev => prev.filter(j => j.id !== jobToDelete.id));
        } catch {
            alert('Failed to delete job. Please try again later.');
        } finally {
            setShowDeleteModal(false);
            setJobToDelete(null);
        }
    };

    if (!company) return null;

    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const avgApplications = totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : 0;
    return (
        <>
            <section
                className="text-light text-center py-5 mb-4"
                style={{
                    background: 'linear-gradient(135deg, #0d6efd, #001f3f)',
                }}
            >
                <Container>
                    <h2 className="fw-bold mb-2">Welcome, {company.name || company.companyName}</h2>
                    <p className="lead mb-3">Manage your job postings and track applications</p>
                    <Button variant="outline-light" onClick={handleLogout}>
                        <BoxArrowRight className="me-2" />
                        Logout
                    </Button>
                </Container>
            </section>

            <Container className="py-4">

                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold d-flex align-items-center gap-2">
                            <BriefcaseFill /> Posted Jobs
                        </h4>
                        <Button
                            variant="warning"
                            onClick={() => navigate('/company/post-job')}
                            className="fw-semibold"
                        >
                            <PlusCircleFill /> Post New Job
                        </Button>
                    </div>

                    {loadingJobs ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : errorJobs ? (
                        <>
                            <Alert variant="danger">{errorJobs}</Alert>
                            <div className="text-center">
                                <Button variant="primary" onClick={fetchJobs}>Retry</Button>
                            </div>
                        </>
                    ) : jobs.length === 0 ? (
                        <Alert variant="info" className="text-center py-4">
                            No jobs posted yet. Click “Post New Job” to add one.
                        </Alert>
                    ) : (
                        <Row className="g-4">
                            {jobs.map((job, index) => (
                                <Col key={job.id} xs={12} sm={6} lg={4}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <Card
                                            className="border-0 shadow-lg rounded-4 h-100 p-3"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/company/update-job/${job.id}`)}
                                        >
                                            <div className="mb-2 d-flex align-items-center gap-2">
                                                <BriefcaseFill className="text-primary" />
                                                <h6 className="fw-bold mb-0">{job.title}</h6>
                                            </div>

                                            <small className="text-muted">{job.location}</small>

                                            <p className="text-truncate mt-2">
                                                {job.description.length > 100
                                                    ? job.description.slice(0, 100) + "..."
                                                    : job.description}
                                            </p>

                                            <div className="mt-auto d-flex justify-content-between">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/company/job/${job.id}/applications`, {
                                                            state: { jobTitle: job.title }
                                                        });
                                                    }}
                                                >
                                                    <PeopleFill /> Applications{" "}
                                                    {job.applicationsCount > 0 && (
                                                        <Badge bg="secondary">{job.applicationsCount}</Badge>
                                                    )}
                                                </Button>

                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        confirmDeleteJob(job);
                                                    }}
                                                >
                                                    <TrashFill /> Delete
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>

                <div className="mt-5">
                    <h4 className="fw-bold d-flex align-items-center gap-2 mb-4">
                        <BarChartFill /> Job Statistics & Insights
                    </h4>
                    {loadingApplications ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" />
                        </div>
                    ) : errorApplications ? (
                        <>
                            <Alert variant="danger">{errorApplications}</Alert>
                            <div className="text-center">
                                <Button variant="primary" onClick={fetchApplications}>Retry</Button>
                            </div>
                        </>
                    ) : (
                        <Row className="g-4">
                            <Col xs={12} md={4}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Card className="border-0 shadow-lg rounded-4 text-center p-4">
                                        <h5>Total Jobs</h5>
                                        <h2 className="fw-bold text-primary">{totalJobs}</h2>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col xs={12} md={4}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Card className="border-0 shadow-lg rounded-4 text-center p-4">
                                        <h5>Total Applications</h5>
                                        <h2 className="fw-bold text-success">{totalApplications}</h2>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col xs={12} md={4}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Card className="border-0 shadow-lg rounded-4 text-center p-4">
                                        <h5>Avg Applications / Job</h5>
                                        <h2 className="fw-bold text-warning">{avgApplications}</h2>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>
                    )}
                </div>
            </Container>

            <Modal show={showDeleteModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <strong>{jobToDelete?.title}</strong>?
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
        </>
    );
};

export default CompanyDashboard;