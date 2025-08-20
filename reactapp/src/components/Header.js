import ChatModal from './ChatModal';
import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { HouseDoorFill, PersonFill, BoxArrowInRight, ClipboardCheck, Building, ChatDotsFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import JobSearch from './JobSearch';
     
const Header = ({ setJobs }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const company = JSON.parse(localStorage.getItem('company'));
    const [showChat, setShowChat] = useState(false);

    const hoverHandlers = {
        onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ffc107', 'important'),
        onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
    };

    const handleLogout = () => {
        if (user) localStorage.removeItem('user');
        if (company) localStorage.removeItem('company');
        navigate('/login');
    };

    const currentUser = user || company;
    const currentType = company ? 'company' : 'user';

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom sticky-top shadow-sm">
                <Container>
                    <Navbar.Brand
                        onClick={() => navigate(company ? '/company/dashboard' : '/')}
                        className="fw-bold"
                        style={{ cursor: 'pointer', fontSize: '1.3rem', fontFamily: "'Inter', sans-serif" }}
                    >
                        <span style={{ color: '#facc15' }}>Job</span>
                        <span style={{ color: '#2563eb' }}>Portal</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-content" />
                    <Navbar.Collapse id="navbar-content">
                        {!company && <div className="ms-3 flex-grow-1"><JobSearch setJobs={setJobs} /></div>}
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => navigate(company ? '/company/dashboard' : '/')} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                <HouseDoorFill size={20} className="me-1" /> Home
                            </Nav.Link>
                            {(user || company) && (
                                <Nav.Link onClick={() => setShowChat(true)} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                    <ChatDotsFill size={20} className="me-1" /> Chat
                                </Nav.Link>
                            )}
                            {user || company ? (
                                <>
                                    {company ? (
                                        <Nav.Link onClick={() => navigate('/company/profile')} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                            <Building size={20} className="me-1" /> {company?.name || 'Company Profile'}
                                        </Nav.Link>
                                    ) : (
                                        <Nav.Link onClick={() => navigate('/profile')} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                            <PersonFill size={20} className="me-1" /> {user?.name || 'Profile'}
                                        </Nav.Link>
                                    )}
                                    <Nav.Link onClick={handleLogout} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                        <BoxArrowInRight size={20} className="me-1" /> Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link onClick={() => navigate('/login')} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                        <BoxArrowInRight size={20} className="me-1" /> Login
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navigate('/register')} className="text-light px-3 d-flex align-items-center" {...hoverHandlers}>
                                        <PersonFill size={20} className="me-1" /> Register
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                    {showChat && currentUser && (
                        <ChatModal show={showChat} handleClose={() => setShowChat(false)} currentUser={currentUser} currentType={currentType} />
                        )}

                </Container>
            </Navbar>

         
        </>
    );
};

export default Header;