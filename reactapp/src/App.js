import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobDetail from './components/JobDetail';
import JobDetails from './components/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplicationPage from './pages/ApplicationPage';
import Profile from './pages/Profile';
import CompanyProfile from './company/CompanyProfile';
import AppliedJobsPage from './pages/AppliedJobsPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import CompanyLogin from './company/CompanyLogin';
import ApplicationsPage from './company/ApplicationsPage';
import CompanyRegister from './company/CompanyRegister';
import CompanyDashboard from './company/CompanyDashboard';
import UpdateJob from './company/UpdateJob';
import PostJob from './company/PostJob';

function JobDetailPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    return <JobDetail jobId={jobId} onBack={() => navigate('/')} />;
}

function JobDetailsPage() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    return <JobDetails jobId={jobId} onBack={() => navigate('/')} />;
}

function App() {
    const [jobs, setJobs] = useState([]);
    const location = useLocation();

    const hideHeaderFooter = location.pathname.startsWith("/admin");

    return (
        <>
            {!hideHeaderFooter && <Header setJobs={setJobs} />}
            <Routes>
                <Route path="/" element={<HomePage jobs={jobs} setJobs={setJobs} />} />
                <Route path="/apply/:jobId" element={<ApplicationPage />} />
                <Route path="/company/login" element={<CompanyLogin />} />
                <Route path="/company/register" element={<CompanyRegister />} />
                <Route path="/company/post-job" element={<PostJob />} />
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
                <Route path="/applied-jobs" element={<AppliedJobsPage />} />
                <Route path="/company/job/:jobId/applications" element={<ApplicationsPage />} />
                <Route path="/jobs/:jobId" element={<JobDetailPage />} />
                <Route path="/company/profile" element={<CompanyProfile />} />
                <Route path="/jobDetail/:jobId" element={<JobDetailsPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/company/update-job/:id" element={<UpdateJob />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
