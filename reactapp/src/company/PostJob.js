import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Spinner, Row, Col, Badge } from 'react-bootstrap';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type: '',
        description: '',
        skills: '',
        salaryRange: '',
        applicationDeadline: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const company = JSON.parse(localStorage.getItem('company'));

    useEffect(() => {
        if (!company) {
            navigate('/company/login');
        }
    }, [company, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.title || !formData.location || !formData.type || !formData.description || !formData.skills || !formData.salaryRange || !formData.applicationDeadline) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const jobData = {
                title: formData.title,
                location: formData.location,
                type: formData.type,
                description: formData.description,
                skills: formData.skills.split(',').map(skill => skill.trim()),
                salaryRange: formData.salaryRange,
                applicationDeadline: formData.applicationDeadline,
                companyy: { id: company.id },
                postedDate: new Date().toISOString().split('T')[0]
            };
            await api.createJobForCompany(company.id, jobData);
            setSuccess('Job posted successfully!');
            setTimeout(() => {
                navigate('/company/dashboard');
            }, 1500);
        } catch (err) {
            setError('Failed to post job. Please try again.');
            console.error('Create Job Error:', err.response || err.message || err);
        } finally {
            setLoading(false);
        }
    };

    if (!company) return null;

    return (
        <Container className="my-5" style={{ maxWidth: '800px' }}>
            <Card className="shadow-lg border-0">
                <Card.Body className="p-4">
                    <h3 className="mb-4 fw-bold text-primary">
                        <Badge bg="primary" className="me-2">✚</Badge>
                        Post New Job
                    </h3>

                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                    {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="title">
                                    <Form.Label>Job Title <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Software Engineer"
                                        value={formData.title}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="location">
                                    <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Remote / Chennai"
                                        value={formData.location}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="type">
                                    <Form.Label>Job Type <span className="text-danger">*</span></Form.Label>
                                    <Form.Select name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        <option value="">Select type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Contract">Contract</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="salaryRange">
                                    <Form.Label>Salary Range <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="salaryRange"
                                        placeholder="e.g. ₹5 LPA - ₹8 LPA"
                                        value={formData.salaryRange}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="skills">
                            <Form.Label>Required Skills <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="skills"
                                placeholder="Comma separated (e.g. React, Node.js, SQL)"
                                value={formData.skills}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="applicationDeadline">
                            <Form.Label>Application Deadline <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="date"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="description">
                            <Form.Label>Job Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="description"
                                placeholder="Describe the role, responsibilities, and requirements"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/company/dashboard')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostJob;