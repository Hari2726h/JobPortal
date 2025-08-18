import React, { useEffect, useState } from "react";
import {
    Form,
    Button,
    Card,
    Container,
    Alert,
    Spinner,
    Row,
    Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../utils/api";

const EditProfile = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phNo: "",
        bio: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!storedUser || !storedUser.id) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const data = await getUserById(storedUser.id);
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phNo: data.phNo || "",
                    bio: data.bio || "",
                });
            } catch {
                setError("Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const updatedUser = await updateUser(storedUser.id, formData);
            setSuccess("Profile updated successfully!");
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setTimeout(() => navigate("/profile"), 1500);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 fs-5 text-secondary">Loading profile...</p>
            </div>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <h3 className="text-center mb-4 fw-bold">Edit Profile</h3>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="name">Full Name</Form.Label>
                                    <Form.Control
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email Address</Form.Label>
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phNo">Phone Number</Form.Label>
                                    <Form.Control
                                        id="phNo"
                                        type="text"
                                        placeholder="Enter phone number"
                                        name="phNo"
                                        value={formData.phNo}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="bio">Bio</Form.Label>
                                    <Form.Control
                                        id="bio"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Write something about yourself"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate("/profile")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={saving}>
                                        {saving ? (
                                            <>
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default EditProfile;