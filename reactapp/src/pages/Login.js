import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import * as api from '../utils/api';
import { BoxArrowInRight } from 'react-bootstrap-icons';

const Login = () => {
    const [loginType, setLoginType] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (loginType === 'user') {
                const user = await api.loginUser({ email, password });
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                const company = await api.loginCompany({ email, password });
                localStorage.setItem('company', JSON.stringify(company));
                navigate('/company/dashboard');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-3">Login</h3>

                <ToggleButtonGroup
                    type="radio"
                    name="loginType"
                    value={loginType}
                    onChange={(val) => setLoginType(val)}
                    className="mb-3 d-flex justify-content-center"
                >
                    <ToggleButton id="tbg-radio-1" value="user" variant="outline-primary">
                        Login as User
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value="company" variant="outline-secondary">
                        Login as Employer
                    </ToggleButton>
                </ToggleButtonGroup>

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
                        {loginType === 'user' ? (
                            <span
                                className="text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/register')}
                            >
                                Register here
                            </span>
                        ) : (
                            <span
                                className="text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/company/register')}
                            >
                                Register your company
                            </span>
                        )}
                        <br />
                        <span
                            className="text-success"
                            style={{ cursor: 'pointer', fontWeight: '500' }}
                            onClick={() => navigate('/admin/login')}
                        >
                            Login as Admin
                        </span>
                    </small>
                </div>
            </Card>
        </Container>
    );
};

export default Login;