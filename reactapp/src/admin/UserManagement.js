import React, { useEffect, useState } from 'react';
import {
    Card, Spinner, Button, Modal, Form, Row, Col, InputGroup, FormControl, OverlayTrigger, Tooltip, Badge, Dropdown
} from 'react-bootstrap';
import { PencilSquare, Trash, ToggleOn, ToggleOff, SortAlphaDown, SortAlphaUp } from 'react-bootstrap-icons';
import AdminSidebar from './AdminSidebar';
import { deleteUserById, updateUser, fetchPaginatedUsers, searchUsersPaginated } from '../utils/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterRole, setFilterRole] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 8;

    const loadUsers = async (page = currentPage, keyword = search, role = filterRole, sortDir = sortOrder) => {
        try {
            setLoading(true);
            let data;
            if (keyword.trim()) {
                data = await searchUsersPaginated(keyword, page, usersPerPage, 'name', sortDir);
            } else {
                data = await fetchPaginatedUsers(page, usersPerPage, 'name', sortDir);
            }

            let filtered = role === 'all' ? data.content : data.content.filter(u => u.role?.toLowerCase() === role);

            setUsers(filtered);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [currentPage, sortOrder, search, filterRole]);

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUserById(id);
                loadUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            await updateUser(selectedUser.id,formData);
            setShowModal(false);
            loadUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const toggleStatus = async (user) => {
        try {
            await updateUser(user.id, { ...user, active: !user.active });
            loadUsers();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: 0 }}>
            <AdminSidebar />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h2 className="mb-4">User Management</h2>

                <div className="d-flex flex-wrap gap-2 mb-4">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <FormControl
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                    </InputGroup>

                    <Button variant="outline-primary" onClick={handleSort}>
                        {sortOrder === 'asc' ? <SortAlphaDown /> : <SortAlphaUp />} Sort
                    </Button>

                    <Dropdown onSelect={(val) => { setFilterRole(val); setCurrentPage(0); }}>
                        <Dropdown.Toggle variant="outline-secondary">
                            Filter: {filterRole}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="all">All</Dropdown.Item>
                            <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                            <Dropdown.Item eventKey="user">User</Dropdown.Item>
                            <Dropdown.Item eventKey="employer">Recruiter</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading users...</p>
                    </div>
                ) : users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {users.map((user) => (
                            <Col key={user.id}>
                                <Card className="shadow-sm h-100 hover-card" style={{ transition: '0.3s' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>{user.email}</Card.Text>
                                        <Badge bg={user.active ? 'success' : 'secondary'} className="me-2">
                                            {user.active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        {user.role && <Badge bg="info">{user.role}</Badge>}
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-end gap-2">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Toggle Status</Tooltip>}>
                                            <Button
                                                variant={user.active ? 'success' : 'secondary'}
                                                size="sm"
                                                onClick={() => toggleStatus(user)}
                                            >
                                                {user.active ? <ToggleOn /> : <ToggleOff />}
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit User</Tooltip>}>
                                            <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                                                <PencilSquare />
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete User</Tooltip>}>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                                                <Trash />
                                            </Button>
                                        </OverlayTrigger>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        {[...Array(totalPages)].map((_, idx) => (
                            <Button
                                key={idx}
                                variant={idx === currentPage ? 'primary' : 'outline-primary'}
                                size="sm"
                                className="me-1"
                                onClick={() => setCurrentPage(idx)}
                            >
                                {idx + 1}
                            </Button>
                        ))}
                    </div>
                )}

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>

                <style>{`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        .hover - card:hover {
                        transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `}</style>
            </div>
        </div>
    );
};

export default UserManagement;
