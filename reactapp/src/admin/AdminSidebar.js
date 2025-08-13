import React, { useState } from 'react';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import {
    PeopleFill,
    BriefcaseFill,
    Building,
    FileEarmarkTextFill,
    Speedometer2,
    BoxArrowRight,
    List
} from 'react-bootstrap-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('admin');
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <Speedometer2 />, path: '/admin/dashboard' },
        { name: 'Users', icon: <PeopleFill />, path: '/admin/users' },
        { name: 'Companies', icon: <Building />, path: '/admin/companies' },
        { name: 'Jobs', icon: <BriefcaseFill />, path: '/admin/jobs' },
        { name: 'Applications', icon: <FileEarmarkTextFill />, path: '/admin/applications' },
    ];

    return (
        <>
            <Button
                variant="dark"
                className="d-md-none mb-2"
                onClick={() => setShow(true)}
            >
                <List />
            </Button>

            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                className="bg-dark text-white"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Admin Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column p-0">
                    <Nav className="flex-column">
                        {menuItems.map((item) => (
                            <Nav.Link
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setShow(false);
                                }}
                                className={`d-flex align-items-center px-3 py-2 sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                                style={{ cursor: 'pointer', borderRadius: '0.375rem', margin: '0.25rem 0' }}
                            >
                                <span className="me-2">{item.icon}</span>
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <div className="mt-auto px-3 py-2">
                        <Button
                            variant="outline-light"
                            className="d-flex align-items-center w-100 logout-btn"
                            onClick={handleLogout}
                        >
                            <BoxArrowRight className="me-2" />
                            Logout
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas >

            <div className="d-none d-md-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: '220px' }}>
                <h5 className="text-center mb-4">Admin Panel</h5>
                <Nav className="flex-column">
                    {menuItems.map((item) => (
                        <Nav.Link
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`d-flex align-items-center px-3 py-2 sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                            style={{ cursor: 'pointer', borderRadius: '0.375rem', margin: '0.25rem 0' }}
                        >
                            <span className="me-2">{item.icon}</span>
                            {item.name}
                        </Nav.Link>
                    ))}
                </Nav>
                <div className="mt-auto">
                    <Button
                        variant="outline-light"
                        className="d-flex align-items-center w-100 logout-btn"
                        onClick={handleLogout}
                    >
                        <BoxArrowRight className="me-2" />
                        Logout
                    </Button>
                </div>
            </div >
        </>
    );
};

export default AdminSidebar;
