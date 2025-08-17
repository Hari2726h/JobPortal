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
    Dropdown,
} from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AdminSidebar from "./AdminSidebar";
import {
    getAllCompanies,
    deleteCompanyById,
    updateCompany,
    searchCompanies,
} from "../utils/api";

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editCompany, setEditCompany] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const pageSize = 5;

    useEffect(() => {
        loadCompanies();
    }, [currentPage, filterStatus]);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            let data;
            if (searchTerm) {
                data = await searchCompanies(searchTerm, currentPage, pageSize);
            } else {
                data = await getAllCompanies(currentPage, pageSize);
            }

            const content = Array.isArray(data) ? data : (data?.content || []);

            let filtered =
                filterStatus === "all"
                    ? content
                    : content.filter((c) => (c.status || "").toLowerCase() === filterStatus);

            setCompanies(filtered);
            setTotalPages(Array.isArray(data) ? 1 : (data?.totalPages || 1));
        } catch (error) {
            console.error("Error loading companies:", error);
            setCompanies([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            try {
                await deleteCompanyById(id);
                loadCompanies();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handleEditSave = async () => {
        try {
            await updateCompany(editCompany.id, editCompany);
            setShowModal(false);
            loadCompanies();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(0);
        loadCompanies();
    };

    const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="p-4 flex-grow-1">
                <h3>Company Management</h3>
                <Row className="mb-3">
                    <Col md={4}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col md={3}>
                        <Dropdown
                            onSelect={(val) => {
                                setFilterStatus(val);
                                setCurrentPage(0);
                            }}
                        >
                            <Dropdown.Toggle variant="outline-secondary">
                                Filter: {filterStatus}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="all">All</Dropdown.Item>
                                <Dropdown.Item eventKey="active">Active</Dropdown.Item>
                                <Dropdown.Item eventKey="inactive">Inactive</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {loading ? (
                    <Spinner animation="border" />
                ) : companies.length === 0 ? (
                    <p>No companies found.</p>
                ) : (
                    companies.map((company) => (
                        <Card key={company.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>{company.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {company.email} <br />
                                    <strong>Location:</strong> {company.location} <br />
                                    <strong>Status:</strong> {company.status || "Not specified"}
                                </Card.Text>
                                <OverlayTrigger overlay={renderTooltip("Edit")} placement="top">
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => {
                                            setEditCompany(company);
                                            setShowModal(true);
                                        }}
                                    >
                                        <PencilSquare />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={renderTooltip("Delete")} placement="top">
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(company.id)}
                                    >
                                        <Trash />
                                    </Button>
                                </OverlayTrigger>
                            </Card.Body>
                        </Card>
                    ))
                )}

                <div className="d-flex justify-content-between mt-3">
                    <Button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </Button>
                    <span>
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                        disabled={currentPage + 1 >= totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Company</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editCompany && (
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editCompany.name}
                                        onChange={(e) =>
                                            setEditCompany({ ...editCompany, name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={editCompany.email}
                                        onChange={(e) =>
                                            setEditCompany({ ...editCompany, email: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editCompany.location}
                                        onChange={(e) =>
                                            setEditCompany({ ...editCompany, location: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={editCompany.status || ""}
                                        onChange={(e) =>
                                            setEditCompany({ ...editCompany, status: e.target.value })
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleEditSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default CompanyManagement;
