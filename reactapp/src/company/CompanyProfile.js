import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Building, GeoAltFill, Globe2, PencilSquare, CheckCircle, BriefcaseFill } from "react-bootstrap-icons";
import * as api from "../utils/api";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
    const [company, setCompany] = useState({
        name: "",
        description: "",
        location: "",
        industry: "",
        website: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();
    const storedCompany = JSON.parse(localStorage.getItem("company"));

    useEffect(() => {
        if (!storedCompany) {
            navigate("/company/login");
            return;
        }
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const data = await api.getCompanyById(storedCompany.id);
            setCompany(data);
        } catch {
            setError("Failed to load company details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const updated = await api.updateCompany(storedCompany.id, company);
            setCompany(updated);
            localStorage.setItem("company", JSON.stringify(updated));
            setSuccess("Company details updated successfully!");
            setIsEditing(false);
        } catch {
            setError("Failed to update company details");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5" style={{ minHeight: "70vh" }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container style={{ maxWidth: "900px", minHeight: "80vh" }} className="mt-4 mb-5">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header
                    className="text-light fw-bold fs-5 d-flex align-items-center justify-content-between"
                    style={{
                        background: "linear-gradient(90deg, #ffc107, #ff9800)",
                        padding: "1rem"
                    }}
                >
                    <div>
                        <Building className="me-2" size={22} /> Company Profile
                    </div>
                    {!isEditing && (
                        <Button
                            variant="light"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="fw-bold shadow-sm"
                        >
                            <PencilSquare className="me-1" /> Edit
                        </Button>
                    )}
                </Card.Header>

                <Card.Body className="p-4">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    {isEditing ? (
                        <Form onSubmit={handleSave}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Company Name</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <Building />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={company.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Industry</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <BriefcaseFill />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="industry"
                                                value={company.industry}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={company.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Location</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <GeoAltFill className="text-primary" />
                                            </span>
                                            <Form.Control
                                                type="text"
                                                name="location"
                                                value={company.location}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Website</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <Globe2 className="text-success" />
                                            </span>
                                            <Form.Control
                                                type="url"
                                                name="website"
                                                value={company.website}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end mt-4">
                                <Button
                                    type="submit"
                                    variant="success"
                                    disabled={saving}
                                    className="me-2 fw-bold"
                                >
                                    {saving ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" /> Saving...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="me-2" /> Save Changes
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditing(false)}
                                    className="fw-bold"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <div className="p-3">
                            <h3 className="fw-bold mb-3">{company.name}</h3>
                            <p className="text-muted mb-2">
                                <BriefcaseFill className="me-2 text-warning" />
                                <strong>Industry:</strong> {company.industry || "N/A"}
                            </p>
                            <p className="mb-2">
                                <strong>Description:</strong>{" "}
                                {company.description || "No description provided."}
                            </p>
                            <p className="mb-2">
                                <GeoAltFill className="me-2 text-primary" />
                                {company.location || "N/A"}
                            </p>
                            <p className="mb-0">
                                <Globe2 className="me-2 text-success" />
                                {company.website ? (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                                        {company.website}
                                    </a>
                                ) : "N/A"}
                            </p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CompanyProfile;