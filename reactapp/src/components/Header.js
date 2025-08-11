import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { HouseDoorFill, PersonPlusFill, BriefcaseFill, BoxArrowInRight, BellFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import JobSearch from './JobSearch';

const Header = ({ setJobs }) => {
    const navigate = useNavigate();

    const hoverHandlers = {
        onMouseEnter: (e) => e.currentTarget.style.setProperty('color', '#ff9800', 'important'),
        onMouseLeave: (e) => e.currentTarget.style.setProperty('color', 'white', 'important'),
    };

    return (
        <Navbar bg='dark' variant='dark' expand="lg" className="border-bottom sticky-top">
            <Container>
                <Navbar.Brand href='/' className="fw-bold text-light">
                    Job Portal
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar-content' />
                <Navbar.Collapse id="navbar-content">
                    <div className="ms-3 flex-grow-1">
                        <JobSearch setJobs={setJobs} />
                    </div>

                    <div className="d-flex ms-auto align-items-center">
                        <Nav>
                            <Nav.Link href='/' className='text-light px-2 d-flex align-items-center'
                                style={{ transition: '0.3s' }}
                                {...hoverHandlers}>
                                <HouseDoorFill size={20} className='me-1' />Home
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate('/')} className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
                                {...hoverHandlers}>
                                <BriefcaseFill size={20} className='me-1' />Jobs
                            </Nav.Link>
                            <Nav.Link href='#notification' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
                                {...hoverHandlers}>
                                <BellFill size={20} className='me-1' />Notification
                            </Nav.Link>
                            <Nav.Link href='/login' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
                                {...hoverHandlers}>
                                <BoxArrowInRight size={20} className='me-1' />Login
                            </Nav.Link>
                            <Nav.Link href='/register' className='text-light px-2 d-flex align-items-center' style={{ transition: '0.3s' }}
                                {...hoverHandlers}>
                                <PersonPlusFill size={20} className='me-1' />Register
                            </Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;