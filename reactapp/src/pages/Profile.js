import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { PersonFill, EnvelopeFill, TelephoneFill, CalendarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../utils/api';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!storedUser || !storedUser.id) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const data = await getUserById(storedUser.id);
                setUserData(data);
            } catch {
                setError('Failed to load profile information.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [storedUser, navigate]);

    const handleRequestUpdate = () => {
        alert('Please contact support@example.com to request profile updates.');
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="text-center">
                            <PersonFill size={70} className="text-primary mb-3" />
                            <h3 className="fw-bold">{userData?.name || 'User'}</h3>
                            <p className="text-muted mb-4">{userData?.role || 'Job Seeker'}</p>

                            <div className="mb-3">
                                <EnvelopeFill className="me-2 text-secondary" />
                                {userData?.email}
                            </div>
                            {userData?.phone && (
                                <div className="mb-3">
                                    <TelephoneFill className="me-2 text-secondary" />
                                    {userData.phone}
                                </div>
                            )}
                            {userData?.createdAt && (
                                <div className="mb-4">
                                    <CalendarFill className="me-2 text-secondary" />
                                    Joined on {new Date(userData.createdAt).toLocaleDateString()}
                                </div>
                            )}

                            {userData?.role === 'admin' ? (
                                <Button variant="primary" className="me-2" onClick={() => navigate('/edit-profile')}>
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button variant="outline-primary" className="me-2" onClick={handleRequestUpdate}>
                                    Request Profile Update
                                </Button>
                            )}

                            <Button variant="secondary" onClick={() => navigate('/')}>
                                Back to Home
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
