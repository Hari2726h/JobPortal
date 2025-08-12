import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import * as api from '../utils/api';
import { PersonPlusFill } from 'react-bootstrap-icons';

const CompanyRegister = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await api.registerUser({ email, password });
            localStorage.setItem('user', JSON.stringify(user));

            const companyName = prompt("Enter your company name");
            const companyData = {
                name: companyName,
                description: "",
                location: ""
            };
            const company = await api.createCompany(user.id, companyData);
            localStorage.setItem('company', JSON.stringify(company));

            navigate('/company/dashboard');
        } catch {
            setError('Registration failed');
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Register Company</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </Form.Group>

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
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="warning" className="w-100">
                        <PersonPlusFill size={18} className="me-2" /> Register
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small>
                        Already have an account?{' '}
                        <span
                            className="text-primary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/company/login')}
                        >
                            Login here
                        </span>
                    </small>
                </div>
            </Card>
        </Container>
    );
};

export default CompanyRegister;