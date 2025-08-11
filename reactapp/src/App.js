import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobDetail from './components/JobDetail';
import JobDetails from './components/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplicationPage from './pages/ApplicationPage';
import Profile from './pages/Profile';
import AppliedJobsPage from './pages/AppliedJobsPage';

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

return (
<BrowserRouter>
<Header setJobs={setJobs} />
<Routes>
<Route path="/" element={<HomePage jobs={jobs} setJobs={setJobs} />} />
<Route path="/apply/:jobId" element={<ApplicationPage />} />
<Route path="/applied-jobs" element={<AppliedJobsPage />} />

<Route path="/jobs/:jobId" element={<JobDetailPage />} />

<Route path="/jobDetail/:jobId" element={<JobDetailsPage />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />
</Routes>
<Footer />
</BrowserRouter>
);
}

export default App;