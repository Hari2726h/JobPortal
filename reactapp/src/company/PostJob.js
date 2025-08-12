import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const company = JSON.parse(localStorage.getItem('company'));

    useEffect(() => {
        if (!company) {
            navigate('/company/login');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title.trim() || !location.trim() || !description.trim()) {
            setError('Please fill all required fields.');
            return;
        }

        setLoading(true);
        try {
            const jobData = {
                title,
                location,
                description,
                companyy: { id: company.id }, 
                postedDate: new Date().toISOString().split('T')[0], 
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
        <Container className="my-5" style={{ maxWidth: '700px' }}>
            <Card className="shadow-sm">
                <Card.Body>
                    <h3 className="mb-4 text-primary">Post New Job</h3>

                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                    {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Job Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                                required
                                minLength={3}
                            />
                        </Form.Group>

                        <Form.Group controlId="location" className="mb-3">
                            <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description" className="mb-4">
                            <Form.Label>Job Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter detailed job description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={loading}
                                required
                                minLength={10}
                                style={{ resize: 'vertical' }}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between align-items-center">
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