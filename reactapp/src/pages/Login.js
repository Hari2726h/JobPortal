import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import * as api from '../utils/api';
import { BoxArrowInRight } from 'react-bootstrap-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await api.loginUser({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Welcome Back</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
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

                    <Button type="submit" variant="warning" className="w-100">
                        <BoxArrowInRight size={18} className="me-2" /> Login
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small>
                        Don't have an account?{' '}
                        <span
                            className="text-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/register')}
                        >
                            Register here
                        </span>
                    </small>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
