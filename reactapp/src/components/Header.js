import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { HouseDoorFill, PersonFill, BriefcaseFill, BoxArrowInRight, ClipboardCheck, Building } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import JobSearch from './JobSearch';

const Header = ({ setJobs }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const company = JSON.parse(localStorage.getItem('company'));

    const hoverHandlers = {
        onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ffc107', 'important'),
        onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
    };

    const handleLogout = () => {
        if (user) localStorage.removeItem('user');
        if (company) localStorage.removeItem('company');
        navigate(company ? '/company/login' : '/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom sticky-top shadow-sm">
            <Container>
                <Navbar.Brand
                    onClick={() => navigate(company ? '/company/dashboard' : '/')}
                    className="fw-bold text-light"
                    style={{ cursor: 'pointer', fontSize: '1.3rem' }}
                >
                    Job Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-content" />
                <Navbar.Collapse id="navbar-content">
                    {!company && (
                        <div className="ms-3 flex-grow-1">
                            <JobSearch setJobs={setJobs} />
                        </div>
                    )}
                    <Nav className="ms-auto">
                        <Nav.Link
                            onClick={() => navigate(company ? '/company/dashboard' : '/')}
                            className="text-light px-3 d-flex align-items-center"
                            {...hoverHandlers}
                        >
                            <HouseDoorFill size={20} className="me-1" /> Home
                        </Nav.Link>

                        {!company && user && (
                            <Nav.Link
                                onClick={() => navigate('/applied-jobs')}
                                className="text-light px-3 d-flex align-items-center"
                                {...hoverHandlers}
                            >
                                <ClipboardCheck size={20} className="me-1" /> Applied Jobs
                            </Nav.Link>
                        )}

                        {user || company ? (
                            <>
                                {company ? (
                                    <Nav.Link
                                        onClick={() => navigate('/company/profile')}
                                        className="text-light px-3 d-flex align-items-center"
                                        {...hoverHandlers}
                                    >
                                        <Building size={20} className="me-1" /> {company?.name || 'Company Profile'}
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link
                                        onClick={() => navigate('/profile')}
                                        className="text-light px-3 d-flex align-items-center"
                                        {...hoverHandlers}
                                    >
                                        <PersonFill size={20} className="me-1" /> {user?.name || 'Profile'}
                                    </Nav.Link>
                                )}

                                <Nav.Link
                                    onClick={handleLogout}
                                    className="text-light px-3 d-flex align-items-center"
                                    {...hoverHandlers}
                                >
                                    <BoxArrowInRight size={20} className="me-1" /> Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    onClick={() => navigate('/login')}
                                    className="text-light px-3 d-flex align-items-center"
                                    {...hoverHandlers}
                                >
                                    <BoxArrowInRight size={20} className="me-1" /> Login
                                </Nav.Link>
                                <Nav.Link
                                    onClick={() => navigate('/register')}
                                    className="text-light px-3 d-flex align-items-center"
                                    {...hoverHandlers}
                                >
                                    <PersonFill size={20} className="me-1" /> Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;