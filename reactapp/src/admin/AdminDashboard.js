import React, { useEffect, useState } from 'react';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { PeopleFill, BriefcaseFill, Building, FileEarmarkTextFill } from 'react-bootstrap-icons';
import { getAllUsers, getAllCompanies, fetchJobs, getAllApplications } from '../utils/api';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        companies: 0,
        jobs: 0,
        applications: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [users, companies, jobs, applications] = await Promise.all([
                    getAllUsers(),
                    getAllCompanies(),
                    fetchJobs(),
                    getAllApplications(),
                ]);

                setStats({
                    users: users.length,
                    companies: companies.length,
                    jobs: jobs.length,
                    applications: applications.length,
                });
            } catch (error) {
                console.error('Error loading admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const cardData = [
        { title: 'Total Users', value: stats.users, icon: <PeopleFill size={30} />, color: '#0d6efd' },
        { title: 'Total Companies', value: stats.companies, icon: <Building size={30} />, color: '#20c997' },
        { title: 'Total Jobs', value: stats.jobs, icon: <BriefcaseFill size={30} />, color: '#ffc107' },
        { title: 'Total Applications', value: stats.applications, icon: <FileEarmarkTextFill size={30} />, color: '#dc3545' },
    ];

    return (
        <div className="d-flex">
            <AdminSidebar />
            <div className="admin-dashboard-content flex-grow-1 p-4">
                <h2 className="mb-4">Welcome, Admin</h2>
                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading statistics...</p>
                    </div>
                ) : (
                    <Row>
                        {cardData.map((card, index) => (
                            <Col md={6} lg={3} key={index} className="mb-4">
                                <Card className="stat-card shadow-sm" style={{ borderLeft: `5px solid ${card.color}` }}>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h5>{card.title}</h5>
                                                <h3 className="fw-bold">{card.value}</h3>
                                            </div>
                                            <div style={{ color: card.color }}>{card.icon}</div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div >
    );
};

export default AdminDashboard;
