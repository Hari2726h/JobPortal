import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { HouseDoorFill, PersonFill, BriefcaseFill, BoxArrowInRight, ClipboardCheck } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import JobSearch from './JobSearch';

const Header = ({ setJobs }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const hoverHandlers = {
        onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ffc107', 'important'),
        onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom sticky-top">
            <Container>
                <Navbar.Brand
                    onClick={() => navigate('/')}
                    className="fw-bold text-light"
                    style={{ cursor: 'pointer' }}
                >
                    Job Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-content" />
                <Navbar.Collapse id="navbar-content">
                    <div className="ms-3 flex-grow-1">
                        <JobSearch setJobs={setJobs} />
                    </div>
                    <div className="d-flex ms-auto align-items-center">
                        <Nav>
                            <Nav.Link
                                onClick={() => navigate('/')}
                                className="text-light px-2 d-flex align-items-center"
                                style={{ transition: 'color 0.3s ease' }}
                                {...hoverHandlers}
                            >
                                <HouseDoorFill size={20} className="me-1" />Home
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => navigate('/')}
                                className="text-light px-2 d-flex align-items-center"
                                style={{ transition: 'color 0.3s ease' }}
                                {...hoverHandlers}
                            >
                                <BriefcaseFill size={20} className="me-1" />Jobs
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => navigate('/applied-jobs')}
                                className="text-light px-2 d-flex align-items-center"
                                style={{ transition: 'color 0.3s ease' }}
                                {...hoverHandlers}
                            >
                                <ClipboardCheck size={20} className="me-1" />Applied Jobs
                            </Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link
                                        onClick={() => navigate('/profile')}
                                        className="text-light px-2 d-flex align-items-center"
                                        style={{ transition: 'color 0.3s ease' }}
                                        {...hoverHandlers}
                                    >
                                        <PersonFill size={20} className="me-1" />{user.name || 'Profile'}
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={handleLogout}
                                        className="text-light px-2 d-flex align-items-center"
                                        style={{ transition: 'color 0.3s ease' }}
                                        {...hoverHandlers}
                                    >
                                        <BoxArrowInRight size={20} className="me-1" />Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link
                                        onClick={() => navigate('/login')}
                                        className="text-light px-2 d-flex align-items-center"
                                        style={{ transition: 'color 0.3s ease' }}
                                        {...hoverHandlers}
                                    >
                                        <BoxArrowInRight size={20} className="me-1" />Login
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => navigate('/register')}
                                        className="text-light px-2 d-flex align-items-center"
                                        style={{ transition: 'color 0.3s ease' }}
                                        {...hoverHandlers}
                                    >
                                        <PersonFill size={20} className="me-1" />Register
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
