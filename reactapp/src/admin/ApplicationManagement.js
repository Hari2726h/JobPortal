import React, { useEffect, useState } from "react";
import {
    Card,
    Spinner,
    Button,
    Modal,
    Form,
    Row,
    Col,
    InputGroup,
    FormControl,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AdminSidebar from "./AdminSidebar";
import {
    getAllApplications,
    deleteApplicationById,
    updateApplication,
    searchApplications,
} from "../utils/api";

const ApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const normalizeApplications = (data) => {
        return data.map((app) => ({
            ...app,
            applicantName: app.applicantName || (app.user ? app.user.name : ""),
            email: app.email || (app.user ? app.user.email : ""),
            jobTitle: app.jobTitle || (app.job ? app.job.title : ""),
            status: app.status || "Pending",
        }));
    };

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const data = await getAllApplications();
            setApplications(Array.isArray(data) ? normalizeApplications(data) : []);
        } catch (err) {
            console.error("Error fetching applications:", err);
            setError("Failed to load applications.");
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            fetchApplications();
            return;
        }
        try {
            setLoading(true);
            const data = await searchApplications(searchTerm);
            setApplications(Array.isArray(data) ? normalizeApplications(data) : []);
        } catch (err) {
            console.error("Error searching applications:", err);
            setError("Search failed.");
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?.id;

            if (!userId) {
                alert("User not found. Please log in again.");
                return;
            }

            await deleteApplicationById(id, userId);
            setApplications((prev) => prev.filter((app) => app.id !== id));
        } catch (err) {
            console.error("Error deleting application:", err);
        }
    };

    const handleEdit = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await updateApplication(selectedApplication.id, selectedApplication);
            fetchApplications();
            setShowModal(false);
        } catch (err) {
            console.error("Error updating application:", err);
        }
    };

    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="flex-grow-1 p-4">
                <Card>
                    <Card.Body>
                        <h4 className="mb-4">Application Management</h4>

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search applications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button onClick={handleSearch} variant="primary">
                                Search
                            </Button>
                        </InputGroup>

                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" />
                            </div>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Applicant Name</th>
                                            <th>Email</th>
                                            <th>Job Title</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.length > 0 ? (
                                            applications.map((app) => (
                                                <tr key={app.id}>
                                                    <td>{app.id}</td>
                                                    <td>{app.applicantName}</td>
                                                    <td>{app.email}</td>
                                                    <td>{app.jobTitle}</td>
                                                    <td>{app.status}</td>
                                                    <td>
                                                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                                            <Button
                                                                variant="warning"
                                                                size="sm"
                                                                className="me-2"
                                                                onClick={() => handleEdit(app)}
                                                            >
                                                                <PencilSquare />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleDelete(app.id)}
                                                            >
                                                                <Trash />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    No applications found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card.Body>
                </Card>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Application</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {selectedApplication && (
                            <Form>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Applicant Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedApplication.applicantName || ""}
                                            onChange={(e) =>
                                                setSelectedApplication((prev) => ({
                                                    ...prev,
                                                    applicantName: e.target.value,
                                                }))
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={selectedApplication.email || ""}
                                            onChange={(e) =>
                                                setSelectedApplication((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectedApplication.jobTitle || ""}
                                            onChange={(e) =>
                                                setSelectedApplication((prev) => ({
                                                    ...prev,
                                                    jobTitle: e.target.value,
                                                }))
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            value={selectedApplication.status || ""}
                                            onChange={(e) =>
                                                setSelectedApplication((prev) => ({
                                                    ...prev,
                                                    status: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default ApplicationManagement;
