import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import { Alert } from "react-bootstrap";

const JobDetails = ({ jobId, onBack }) => {
    
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    
    useEffect(() => {
        const checkIfApplied = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (loggedInUser) {
                try {
                    const apps = await api.fetchAppliedJobs(loggedInUser.id);
                    const applied = apps.some(app => app.job?.id === parseInt(jobId));
                    setAlreadyApplied(applied);
                } catch (err) {
                    console.error("Error checking applied status:", err);
                }
            }
        };
    
        checkIfApplied();
    }, [jobId]);
    const [job, setJob] = useState(null);
    const [company, setCompany] = useState(null);
    const [similarJobs, setSimilarJobs] = useState([]);
    const [applicationsCount, setApplicationsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        setJob(null);
        setCompany(null);
        setSimilarJobs([]);
        setApplicationsCount(0);

        const fetchJobDetails = async () => {
            try {
                const jobData = await api.fetchJobById(jobId);
                if (!isMounted) return;
                setJob(jobData);

                const companyData = await api.getCompanyById(jobData.companyId || 0).catch(() => null);
                if (!isMounted) return;
                setCompany(companyData);

                const allJobs = await api.fetchJobs();
                if (!isMounted) return;

                const similarByCategory = allJobs
                    .filter(j => j.id !== jobId && j.category === jobData.category)
                    .slice(0, 3);
                setSimilarJobs(similarByCategory);

                const applications = jobData.companyyId
                    ? await api.getApplicationsByCompany(jobData.companyyId)
                    : [];
                if (!isMounted) return;
                setApplicationsCount(applications.length);

            } catch (err) {
                if (!isMounted) return;
                console.error(err);
                setError('Failed to load job details.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchJobDetails();

        return () => { isMounted = false; };
    }, [jobId]);

    const handleApply = (e, jobId) => {
        e.stopPropagation();
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            alert('Please log in or register before applying.');
            navigate('/login');
            return;
        }
        navigate(`/apply/${jobId}`);
    };

    if (loading) return <div className="text-center py-5">Loading job details...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;
    if (!job) return null;
    return (
        <div className="container my-5">
            <div className="row gx-5">
                <div className="col-lg-8">
                    <button onClick={onBack} className="btn btn-outline-secondary mb-4">← Back to Listings</button>
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="fw-bold text-primary mb-3">{job.title || "N/A"}</h2>
                        <p className="mb-1"><strong>Company:</strong> {job.company || "N/A"}</p>
                        <p className="mb-1"><strong>Location:</strong> {job.location || "N/A"}</p>
                        <p className="mb-1"><strong>Type:</strong> {job.type || "N/A"}</p>
                        <p className="mb-1"><strong>Posted Date:</strong> {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}</p>
                        <hr />
                        <p><strong>Description:</strong></p>
                        <p className="text-muted">{job.description || "No description available."}</p>
                        <p><strong>Skills:</strong> {job.skills?.length ? job.skills.map((skill, idx) => (
                            <span key={idx} className="badge bg-light text-dark me-2">{skill}</span>
                        )) : "N/A"}</p>
                        <p className="mb-1"><strong>Salary Range:</strong> {job.salaryRange || "N/A"}</p>
                        <p className="mb-4"><strong>Application Deadline:</strong> {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : "N/A"}</p>
                        <button
                            onClick={(e) => handleApply(e, job.id)}
                            className="btn btn-primary fw-semibold"
                            style={{ padding: '10px 20px', fontSize: '16px' }}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
                <div className="col-lg-4">
                    {/* 
                    <div className="card shadow-sm border-0 p-4 mb-4">
                        <h5 className="mb-3 text-secondary">About Company</h5>
                        {company?.logo ? (
                            <img
                                src={company.logo}
                                alt={`${job.company} logo`}
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: '100px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div className="text-muted mb-3">No logo available</div>
                        )}
                        <p>{company?.description || "No description available."}</p>
                        {company?.website && (
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                                Visit Website &rarr;
                            </a>
                        )}
                    </div> */}

                    <div className="card shadow-sm border-0 p-4 mb-4">
                        <h5 className="mb-3 text-secondary">Similar Jobs</h5>
                        {similarJobs.length === 0 ? (
                            <p className="text-muted">No similar jobs available.</p>
                        ) : (
                            similarJobs.map(job => (
                                <div
                                    key={job.id}
                                    className="mb-3 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/jobs/${job.id}`)}
                                >
                                    <h6 className="mb-1 text-primary">{job.title}</h6>
                                    <small className="text-muted">{job.location} - {job.type}</small>
                                </div>
                            ))
                        )}
                    </div>
                    {alreadyApplied ? (
                        <Alert variant="info" className="fw-semibold">
                            ✅ You have already applied for this job. Track your application in <a href="/applied-jobs">Applied Jobs</a>.
                        </Alert>
                    ) : (
                        <Alert variant="secondary" className="fw-semibold">
                            📌 Tip: Add a strong cover letter highlighting your {job?.skillsRequired?.join(", ")} skills.
                        </Alert>
                    )}
{/* 
                    <div className="card shadow-sm border-0 p-4">
                        <h5 className="mb-3 text-secondary">Application Info</h5>
                        <p><strong>Applicants:</strong> {applicationsCount}</p>
                        <p><strong>Views:</strong> {job.views ?? 'N/A'}</p>
                        <p className="text-muted">Apply before the deadline to increase your chances!</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;