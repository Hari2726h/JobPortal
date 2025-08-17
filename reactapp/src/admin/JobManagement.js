import React, { useEffect, useMemo, useState } from "react";
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
    Badge,
} from "react-bootstrap";
import { PencilSquare, Trash, PlusCircle } from "react-bootstrap-icons";
import AdminSidebar from "./AdminSidebar";
import {
    fetchJobs,
    searchJobs,
    deleteJob,
    updateJob,
    createJob,
    getJobsByCompany,
} from "../utils/api";

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterType, setFilterType] = useState("all");
    const [companyFilter, setCompanyFilter] = useState(""); // optional company id/name

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const [serverTotalPages, setServerTotalPages] = useState(null); // if backend provides

    // modals
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [editJob, setEditJob] = useState(null);

    // helper
    const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

    useEffect(() => {
        loadJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, companyFilter]);

    const loadJobs = async () => {
        setLoading(true);
        try {
            let data;

            if (companyFilter && !isNaN(Number(companyFilter))) {
                // if user typed a numeric companyId, try fetching jobs by company
                data = await getJobsByCompany(companyFilter);
            } else if (searchTerm) {
                data = await searchJobs(searchTerm);
            } else {
                data = await fetchJobs();
            }

            const content = Array.isArray(data) ? data : (data?.content || []);
            setJobs(content);
            setServerTotalPages(Array.isArray(data) ? null : (data?.totalPages ?? null));
            setCurrentPage(0); // reset page when dataset changes
        } catch (err) {
            console.error("Error loading jobs:", err);
            setJobs([]);
            setServerTotalPages(null);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = useMemo(() => {
        let list = [...jobs];

        if (filterStatus !== "all") {
            list = list.filter(
                (j) => (j.status || "").toLowerCase() === filterStatus
            );
        }
        if (filterType !== "all") {
            list = list.filter(
                (j) => (j.type || "").toLowerCase() === filterType
            );
        }

        return list;
    }, [jobs, filterStatus, filterType]);

    const totalPages = useMemo(() => {
        if (serverTotalPages !== null) return serverTotalPages; // backend provided
        return Math.max(1, Math.ceil(filteredJobs.length / pageSize));
    }, [filteredJobs.length, serverTotalPages]);

    const visibleJobs = useMemo(() => {
        if (serverTotalPages !== null) {
            // assume server already paginated; we just render the list received
            return filteredJobs;
        }
        const start = currentPage * pageSize;
        return filteredJobs.slice(start, start + pageSize);
    }, [filteredJobs, currentPage, pageSize, serverTotalPages]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await deleteJob(id);
            await loadJobs();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleEditSave = async () => {
        try {
            await updateJob(editJob.id, editJob);
            setShowEditModal(false);
            await loadJobs();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const payload = {
            title: form.title.value,
            description: form.description.value,
            location: form.location.value,
            type: form.type.value || "full-time",
            status: form.status.value || "open",
            salary: form.salary.value ? Number(form.salary.value) : undefined,
        };
        try {
            await createJob(payload);
            setShowCreateModal(false);
            form.reset();
            await loadJobs();
        } catch (err) {
            console.error("Create failed:", err);
        }
    };

    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="p-4 flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Job Management</h3>
                    <Button variant="success" onClick={() => setShowCreateModal(true)}>
                        <PlusCircle className="me-2" />
                        New Job
                    </Button>
                </div>

                <Row className="mb-3 mt-2 g-3">
                    <Col md={4}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search jobs (title/keyword)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="primary" onClick={() => loadJobs()}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col md={3}>
                        <InputGroup>
                            <FormControl
                                placeholder="Filter by companyId (optional)"
                                value={companyFilter}
                                onChange={(e) => setCompanyFilter(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setCompanyFilter("");
                                    setSearchTerm("");
                                    loadJobs();
                                }}
                            >
                                Clear
                            </Button>
                        </InputGroup>
                    </Col>

                    <Col md={2}>
                        <Dropdown
                            onSelect={(val) => {
                                setFilterStatus(val);
                                setCurrentPage(0);
                            }}
                        >
                            <Dropdown.Toggle variant="outline-secondary" className="w-100">
                                Status: {filterStatus}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="all">All</Dropdown.Item>
                                <Dropdown.Item eventKey="open">Open</Dropdown.Item>
                                <Dropdown.Item eventKey="closed">Closed</Dropdown.Item>
                                <Dropdown.Item eventKey="draft">Draft</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col md={3}>
                        <Dropdown
                            onSelect={(val) => {
                                setFilterType(val);
                                setCurrentPage(0);
                            }}
                        >
                            <Dropdown.Toggle variant="outline-secondary" className="w-100">
                                Type: {filterType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="all">All</Dropdown.Item>
                                <Dropdown.Item eventKey="full-time">Full-time</Dropdown.Item>
                                <Dropdown.Item eventKey="part-time">Part-time</Dropdown.Item>
                                <Dropdown.Item eventKey="contract">Contract</Dropdown.Item>
                                <Dropdown.Item eventKey="internship">Internship</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {loading ? (
                    <Spinner animation="border" />
                ) : visibleJobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    visibleJobs.map((job) => (
                        <Card key={job.id} className="mb-3">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <Card.Title className="mb-1">
                                            {job.title || "Untitled Job"}{" "}
                                            {job.status && (
                                                <Badge
                                                    bg={
                                                        (job.status || "").toLowerCase() === "open"
                                                            ? "success"
                                                            : (job.status || "").toLowerCase() === "closed"
                                                                ? "secondary"
                                                                : "warning"
                                                    }
                                                    className="ms-2"
                                                >
                                                    {job.status}
                                                </Badge>
                                            )}
                                        </Card.Title>
                                        <Card.Subtitle className="text-muted mb-2">
                                            {(job.companyName || job.company?.name || "Unknown Company") +
                                                "   " +
                                                (job.location || "Location N/A")}
                                        </Card.Subtitle>
                                        <Card.Text className="mb-1">
                                            <strong>Type:</strong> {job.type || "N/A"}
                                            {"  "} {"  "}
                                            <strong>Salary:</strong>{" "}
                                            {job.salary != null ? job.salary : "N/A"}
                                        </Card.Text>
                                        {job.description && (
                                            <Card.Text className="text-truncate" style={{ maxWidth: 900 }}>
                                                {job.description}
                                            </Card.Text>
                                        )}
                                    </div>

                                    <div className="d-flex">
                                        <OverlayTrigger overlay={renderTooltip("Edit")} placement="top">
                                            <Button
                                                variant="warning"
                                                className="me-2"
                                                onClick={() => {
                                                    setEditJob({
                                                        id: job.id,
                                                        title: job.title || "",
                                                        description: job.description || "",
                                                        location: job.location || "",
                                                        type: job.type || "full-time",
                                                        status: job.status || "open",
                                                        salary: job.salary ?? "",
                                                        companyId:
                                                            job.companyId ||
                                                            job.company?.id ||
                                                            "",
                                                    });
                                                    setShowEditModal(true);
                                                }}
                                            >
                                                <PencilSquare />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger overlay={renderTooltip("Delete")} placement="top">
                                            <Button variant="danger" onClick={() => handleDelete(job.id)}>
                                                <Trash />
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}

                <div className="d-flex justify-content-between mt-3">
                    <Button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    >
                        Previous
                    </Button>
                    <span>
                        Page {Math.min(currentPage + 1, totalPages)} of {totalPages}
                    </span>
                    <Button
                        disabled={currentPage + 1 >= totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>

                <Modal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editJob && (
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editJob.title}
                                        onChange={(e) =>
                                            setEditJob({ ...editJob, title: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={editJob.description}
                                        onChange={(e) =>
                                            setEditJob({ ...editJob, description: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editJob.location}
                                                onChange={(e) =>
                                                    setEditJob({ ...editJob, location: e.target.value })
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Salary</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={editJob.salary}
                                                onChange={(e) =>
                                                    setEditJob({
                                                        ...editJob,
                                                        salary: e.target.value === "" ? "" : Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select
                                                value={editJob.type}
                                                onChange={(e) =>
                                                    setEditJob({ ...editJob, type: e.target.value })
                                                }
                                            >
                                                <option value="full-time">Full-time</option>
                                                <option value="part-time">Part-time</option>
                                                <option value="contract">Contract</option>
                                                <option value="internship">Internship</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select
                                                value={editJob.status}
                                                onChange={(e) =>
                                                    setEditJob({ ...editJob, status: e.target.value })
                                                }
                                            >
                                                <option value="open">Open</option>
                                                <option value="closed">Closed</option>
                                                <option value="draft">Draft</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleEditSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Job</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleCreate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={4} />
                            </Form.Group>


                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control name="location" type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Salary</Form.Label>
                                        <Form.Control name="salary" type="number" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select name="type" defaultValue="full-time">
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select name="status" defaultValue="open">
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
                                            <option value="draft">Draft</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="success" type="submit">
                                Create Job
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default JobManagement;