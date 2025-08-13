import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Container, Spinner, Alert, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import * as api from '../utils/api';
import { ArrowLeftCircle, Save, Briefcase } from 'react-bootstrap-icons';

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await api.fetchJobById(id);
                setTitle(jobData.title || '');
                setLocation(jobData.location || '');
                setDescription(jobData.description || '');
                setSalary(jobData.salaryRange || '');
                setSkills(jobData.skills || []);
            } catch {
                setError('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            await api.updateJob(id, { title, location, description, salaryRange: salary, skills });
            setSuccess('Job updated successfully!');
            setTimeout(() => navigate('/company/dashboard'), 1200);
        } catch {
            setError('Failed to update job.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container className="py-5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="row g-4"
            >
                <div className="col-lg-6">
                    <Card className="p-4 shadow-lg rounded-4 border-0 glass-card">
                        <div className="d-flex align-items-center mb-3">
                            <Button
                                variant="link"
                                className="text-decoration-none text-primary p-0 me-2"
                                onClick={() => navigate('/company/dashboard')}
                            >
                                <ArrowLeftCircle size={24} />
                            </Button>
                            <h4 className="fw-bold mb-0">Update Job</h4>
                        </div>

                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}

                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Salary Range</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="e.g. 50k - 70k per year or Negotiable"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100 fw-semibold"
                                disabled={saving}
                            >
                                {saving ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <>
                                        <Save className="me-2" /> Save Changes
                                    </>
                                )}
                            </Button>
                        </Form>
                    </Card>
                </div>

                <div className="col-lg-6">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="h-100"
                    >
                        <Card className="p-4 shadow-lg rounded-4 border-0">
                            <div className="d-flex align-items-center mb-3">
                                <Briefcase className="text-primary me-2" size={28} />
                                <h5 className="mb-0">{title || 'Job Title Preview'}</h5>
                            </div>
                            <small className="text-muted">{location || 'Location'}</small>
                            <p className="mt-3">{description || 'Job description will appear here...'}</p>
                            {salary && (
                                <p className="fw-bold text-success">💰 {salary}</p>
                            )}
                            {skills.length > 0 && (
                                <div className="mt-2">
                                    {skills.map((skill, idx) => (
                                        <Badge key={idx} bg="info" className="me-1">{skill}</Badge>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </Container>
    );
};

export default UpdateJob;