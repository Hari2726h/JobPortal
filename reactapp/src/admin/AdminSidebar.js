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
        { name: 'Logout', icon: <BoxArrowRight />, action: handleLogout, isLogout: true },
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
                className="bg-black text-white sidebar-full-height"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Admin Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0 sidebar-full-height">
                    <Nav className="flex-column">
                        {menuItems.map((item) => (
                            <Nav.Link
                                key={item.name}
                                onClick={() => {
                                    if (item.isLogout) {
                                        item.action();
                                    } else {
                                        navigate(item.path);
                                        setShow(false);
                                    }
                                }}
                                className={`d - flex align-items-center px-3 py-2 sidebar-link
                                ${location.pathname === item.path ? 'active' : ''}
                                ${item.isLogout ? 'logout-link' : ''}`}
                            >
                                <span className="me-2">{item.icon}</span>
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas >

            <div className="d-none d-md-flex flex-column bg-black text-white p-3 sidebar-full-height" style={{ width: '220px' }}>
                <h5 className="text-center mb-4">Admin Panel</h5>
                <Nav className="flex-column">
                    {menuItems.map((item) => (
                        <Nav.Link
                            key={item.name}
                            onClick={() => {
                                if (item.isLogout) {
                                    item.action();
                                } else {
                                    navigate(item.path);
                                }
                            }}
                            className={`d - flex align-items-center px-3 py-2 sidebar-link
                            ${location.pathname === item.path ? 'active' : ''}
                            ${item.isLogout ? 'logout-link' : ''}`}
                        >
                            <span className="me-2">{item.icon}</span>
                            {item.name}
                        </Nav.Link>
                    ))}
                </Nav>
            </div >
        </>
    );
};

export default AdminSidebar;
