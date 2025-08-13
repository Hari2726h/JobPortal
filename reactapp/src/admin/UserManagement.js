import React, { useEffect, useState } from 'react';
import { Card, Spinner, Button, Modal, Form, Row, Col, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AdminSidebar from './AdminSidebar';
import { getAllUsers, deleteUserById, updateUser } from '../utils/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [search, setSearch] = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (search === '') setFilteredUsers(users);
        else
            setFilteredUsers(
                users.filter(
                    (u) =>
                        u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
                )
            );
    }, [search, users]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUserById(id, 1);
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
            await updateUser(selectedUser.id, 1, formData);
            setShowModal(false);
            loadUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: 0 }}>
            <AdminSidebar />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h2 className="mb-4">User Management</h2>

                <InputGroup className="mb-4" style={{ maxWidth: '400px' }}>
                    <FormControl
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>

                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {filteredUsers.map((user) => (
                            <Col key={user.id}>
                                <Card className="shadow-sm h-100 hover-card" style={{ transition: '0.3s' }}>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>{user.email}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-end gap-2">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Edit User</Tooltip>}
                                        >
                                            <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                                                <PencilSquare />
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Delete User</Tooltip>}
                                        >
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
            </div>

            <style>{
                `.hover - card:hover {
                    transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              `}</style>
        </div>
    );
};

export default UserManagement;