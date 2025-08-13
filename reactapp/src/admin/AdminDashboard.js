import React, { useEffect, useState } from 'react';
import { Card, Spinner, Row, Col, Table, Button } from 'react-bootstrap';
import {
    PeopleFill,
    BriefcaseFill,
    Building,
    FileEarmarkTextFill,
} from 'react-bootstrap-icons';
import { getAllUsers, getAllCompanies, fetchJobs, getAllApplications } from '../utils/api';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        companies: 0,
        jobs: 0,
        applications: 0,
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [topCompanies, setTopCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
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

                setRecentUsers(users.slice(-5).reverse());
                setRecentJobs(jobs.slice(-5).reverse());
                setRecentApplications(applications.slice(-5).reverse());

                const companyJobCounts = companies.map(company => {
                    const jobCount = jobs.filter(job => job.companyId === company.id).length;
                    return { ...company, jobCount };
                });
                setTopCompanies(companyJobCounts.sort((a, b) => b.jobCount - a.jobCount).slice(0, 5));
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const cardData = [
        { title: 'Total Users', value: stats.users, icon: <PeopleFill size={30} />, color: '#0d6efd' },
        { title: 'Total Companies', value: stats.companies, icon: <Building size={30} />, color: '#20c997' },
        { title: 'Total Jobs', value: stats.jobs, icon: <BriefcaseFill size={30} />, color: '#ffc107' },
        { title: 'Total Applications', value: stats.applications, icon: <FileEarmarkTextFill size={30} />, color: '#dc3545' },
    ];

    return (
        <div style={{ display: 'flex', gap: 0 }}>
            <AdminSidebar />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h2 className="mb-4">Welcome, Admin</h2>
                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading dashboard data...</p>
                    </div>
                ) : (
                    <>
                        <Row>
                            {cardData.map((card, index) => (
                                <Col md={6} lg={3} key={index} className="mb-4">
                                    <Card
                                        className="shadow-sm"
                                        style={{
                                            borderLeft: `5px solid ${card.color}`,
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Card.Body>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

                        <Row className="mb-4">
                            <Col md={6} lg={3}>
                                <Button variant="primary" style={{ width: '100%' }}>Create Job</Button>
                            </Col>
                            <Col md={6} lg={3}>
                                <Button variant="success" style={{ width: '100%' }}>Register Company</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <h5>Recent Users</h5>
                                <Table striped bordered hover size="sm" className="bg-white">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>

                            <Col md={6}>
                                <h5>Recent Jobs</h5>
                                <Table striped bordered hover size="sm" className="bg-white">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Company</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentJobs.map(job => (
                                            <tr key={job.id}>
                                                <td>{job.title}</td>
                                                <td>{job.companyName || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6}>
                                <h5>Recent Applications</h5>
                                <Table striped bordered hover size="sm" className="bg-white">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Job</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentApplications.map(app => (
                                            <tr key={app.id}>
                                                <td>{app.userName || 'N/A'}</td>
                                                <td>{app.jobTitle || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>

                            <Col md={6}>
                                <h5>Top Companies by Job Count</h5>
                                <Table striped bordered hover size="sm" className="bg-white">
                                    <thead>
                                        <tr>
                                            <th>Company</th>
                                            <th>Jobs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topCompanies.map(company => (
                                            <tr key={company.id}>
                                                <td>{company.name}</td>
                                                <td>{company.jobCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div >
    );
};

export default AdminDashboard;