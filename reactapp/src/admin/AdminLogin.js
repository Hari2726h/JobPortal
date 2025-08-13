import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';

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
            localStorage.setItem('admin', JSON.stringify({ email }));
            navigate('/admin/dashboard');
        } else {
            setError('Invalid admin credentials');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Admin Login</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                        />
                    </Form.Group>

                    <Button type="submit" variant="dark" className="w-100">
                        <BoxArrowInRight size={18} className="me-2" /> Login as Admin
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small>
                        Go back to{' '}
                        <span
                            className="text-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/company/login')}
                        >
                            Company Login
                        </span>
                    </small>
                </div>
            </Card>
        </Container>
    );
};

export default AdminLogin;
