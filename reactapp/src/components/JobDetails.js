import React, { useEffect, useState } from 'react';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const JobDetails = ({ jobId, onBack }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [similarJobs, setSimilarJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        setJob(null);

        api.fetchJobById(jobId)
            .then(data => {
                if (!isMounted) return;
                setJob(data);

                if (data.companyId) {
                    api.getJobsByCompany(data.companyId)
                        .then(jobs => {
                            if (!isMounted) return;
                            // Filter out current job from similar jobs
                            setSimilarJobs(jobs.filter(j => j.id !== jobId).slice(0, 3));
                        })
                        .catch(() => {
                            if (!isMounted) return;
                            setSimilarJobs([]);
                        });
                }
            })
            .catch((error) => {
                if (!isMounted) return;
                const msg = error?.response?.data?.message || 'Failed to load job details';
                setError(msg);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

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
                        <h2 className="fw-bold text-primary mb-3">{job.title}</h2>
                        <p className="mb-1"><strong>Company:</strong> {job.company}</p>
                        <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                        <p className="mb-1"><strong>Type:</strong> {job.type}</p>
                        <p className="mb-1"><strong>Posted Date:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
                        <hr />
                        <p><strong>Description:</strong></p>
                        <p className="text-muted">{job.description}</p>
                        <p><strong>Skills:</strong> {job.skills?.map((skill, idx) => (
                            <span key={idx} className="badge bg-light text-dark me-2">{skill}</span>
                        ))}</p>
                        <p className="mb-1"><strong>Salary Range:</strong> {job.salaryRange}</p>
                        <p className="mb-4"><strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
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
                    <div className="card shadow-sm border-0 p-4 mb-4">
                        <h5 className="mb-3 text-secondary">About Company</h5>
                        {job.companyLogo ? (
                            <img
                                src={job.companyLogo}
                                alt={`${job.company} logo`}
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: '100px', objectFit: 'contain' }}
                                                                                                                                                  />
                        ) : (
                        <div className="text-muted mb-3">No logo available</div>
                                                                                                                                                                                        )}
                        <p>{job.companyDescription || "No description available."}</p>
                        {job.companyWebsite && (
                            <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-primary">
                                Visit Website &rarr;
                            </a>
                        )}
                    </div>

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

                    <div className="card shadow-sm border-0 p-4">
                        <h5 className="mb-3 text-secondary">Application Info</h5>
                        <p><strong>Applicants:</strong> {job.applicantsCount ?? 'N/A'}</p>
                        <p><strong>Views:</strong> {job.views ?? 'N/A'}</p>
                        <p className="text-muted">Apply before the deadline to increase your chances!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;