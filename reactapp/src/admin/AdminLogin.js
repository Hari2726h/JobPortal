import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { BoxArrowInRight, ShieldLockFill } from 'react-bootstrap-icons';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const ADMIN_EMAIL = 'admin@example.com';
    const ADMIN_PASSWORD = 'admin123';

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminIdFromDB = 1;
            localStorage.setItem('admin', JSON.stringify({ id: adminIdFromDB, email }));
            navigate('/admin/dashboard');
        }
        else {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)"
            }}
        >
            <Container className="d-flex justify-content-center">
                <Card
                    className="p-4 shadow-lg text-white"
                    style={{
                        maxWidth: '420px',
                        width: '100%',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <div className="text-center mb-4">
                        <ShieldLockFill size={40} className="mb-2 text-warning" />
                        <h3 className="fw-bold">Admin Login</h3>
                        <p className="small text-light">Secure access to the admin dashboard</p>
                    </div>

                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="warning"
                            className="w-100 fw-bold rounded-pill shadow-sm"
                            style={{ transition: '0.3s' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
                            onMouseOut={(e) => e.target.style.backgroundColor = ''}
                        >
                            <BoxArrowInRight size={18} className="me-2" /> Login as Admin
                        </Button>
                    </Form>

                    <div className="text-center mt-4">
                        <small>
                            Not an admin?{' '}
                            <span
                                className="text-info fw-bold"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/login')}
                            >
                                Go to User Login
                            </span>
                        </small>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default AdminLogin;
