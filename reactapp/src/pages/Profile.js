import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    Spinner,
    Alert,
    Container,
    Row,
    Col,
    Tooltip,
    OverlayTrigger,
} from 'react-bootstrap';
import {
    PersonFill,
    EnvelopeFill,
    TelephoneFill,
    CalendarFill,
    PencilSquare,
    ArrowLeftCircle,
    InfoCircle,
} from 'react-bootstrap-icons';
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

    const renderTooltip = (props, text) => (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    );

    const getInitials = (name = '') => {
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 fs-5 text-secondary">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card
                        className="shadow-lg border-0"
                        style={{
                            background:
                                'linear-gradient(135deg, #f0f4ff, #dbe6ff)',
                            animation: 'fadeIn 0.6s ease forwards',
                            minHeight: '480px',
                        }}
                    >
                        <Card.Body className="text-center d-flex flex-column align-items-center p-5">

                            <div
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    background: '#0d6efd',
                                    color: 'white',
                                    fontSize: 36,
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    userSelect: 'none',
                                    boxShadow: '0 4px 12px rgb(13 110 253 / 0.4)',
                                }}
                                aria-label="User Initials Avatar"
                            >
                                {getInitials(userData?.name)}
                            </div>

                            <h2 className="fw-bold mb-1">{userData?.name || 'User'}</h2>
                            <p className="text-primary fw-semibold mb-4" style={{ letterSpacing: '1px' }}>
                                {userData?.role?.toUpperCase() || 'JOB SEEKER'}
                            </p>

                            <Card
                                bg="white"
                                text="dark"
                                className="w-100 shadow-sm mb-4 p-3 rounded"
                                style={{ border: '1px solid #dee2e6' }}
                            >
                                <div className="d-flex align-items-center mb-3">
                                    <EnvelopeFill className="me-3 text-primary" size={22} />
                                    <span className="text-truncate" title={userData?.email}>
                                        {userData?.email || 'Email not provided'}
                                    </span>
                                </div>
                                {userData?.phone && (
                                    <div className="d-flex align-items-center mb-3">
                                        <TelephoneFill className="me-3 text-primary" size={22} />
                                        <span>{userData.phone}</span>
                                    </div>
                                )}
                                {userData?.createdAt && (
                                    <div className="d-flex align-items-center">
                                        <CalendarFill className="me-3 text-primary" size={22} />
                                        <span>
                                            Joined on {new Date(userData.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </Card>

                            <div className="d-flex gap-3 mt-auto w-100 justify-content-center flex-wrap">
                                {userData?.role === 'admin' ? (
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) => renderTooltip(props, 'Edit your profile')}
                                    >
                                        <Button
                                            variant="primary"
                                            className="d-flex align-items-center gap-2 px-4"
                                            onClick={() => navigate('/edit-profile')}
                                            style={{ minWidth: 140 }}
                                        >
                                            <PencilSquare /> Edit Profile
                                        </Button>
                                    </OverlayTrigger>
                                ) : (
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(props) =>
                                            renderTooltip(props, 'Request support to update your profile')
                                        }
                                    >
                                        <Button
                                            variant="outline-primary"
                                            className="d-flex align-items-center gap-2 px-4"
                                            onClick={handleRequestUpdate}
                                            style={{ minWidth: 180 }}
                                        >
                                            <InfoCircle /> Request Profile Update
                                        </Button>
                                    </OverlayTrigger>
                                )}

                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, 'Go back to homepage')}
                                >
                                    <Button
                                        variant="secondary"
                                        className="d-flex align-items-center gap-2 px-4"
                                        onClick={() => navigate('/')}
                                        style={{ minWidth: 130 }}
                                    >
                                        <ArrowLeftCircle /> Back to Home
                                 </Button>
                                </OverlayTrigger>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            

            <style>{`
                  @keyframes fadeIn {
                              0% { opacity: 0; transform: translateY(12px);}
                                        100% { opacity: 1; transform: translateY(0);}
                                                }
            `} </style>
        </Container>
    );
};

export default Profile;