import React, { useEffect, useState } from 'react';
import * as api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const JobDetails = ({ jobId, onBack }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        setJob(null);

        api.fetchJobById(jobId)
            .then((data) => {
                if (!isMounted) return;
                setJob(data);
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

    if (loading) return <div data-testid="detail-loading" className="text-center py-4">Loading job details...</div>;
    if (error) return <div data-testid="detail-error" className="alert alert-danger text-center">{error}</div>;
    if (!job) return null;

    const handleApply = (e, jobId) => {
        e.stopPropagation();
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            alert('Please log in or register before applying.');
            navigate('/login');
            return;
        }
        navigate(`/apply/${ jobId }`);
    };

    return (
        <div className="container my-5" data-testid="job-detail">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <button
                        data-testid="back-button"
                        onClick={onBack}
                        className="btn btn-outline-secondary mb-4"
                    >
                        ← Back to Listings
                    </button>
                    <h2 className="fw-bold text-primary mb-3">{job.title}</h2>
                    <p className="mb-1"><strong>Company:</strong> {job.company}</p>
                    <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="mb-1"><strong>Type:</strong> {job.type}</p>
                    <p className="mb-1"><strong>Posted Date:</strong> {job.postedDate}</p>
                    <hr />
                    <p><strong>Description:</strong></p>
                    <p className="text-muted">{job.description}</p>
                    <p><strong>Skills:</strong> {job.skills?.map((skill, idx) => (
                        <span key={idx} className="badge bg-light text-dark me-2">{skill}</span>
                    ))}</p>
                    <p className="mb-1"><strong>Salary Range:</strong> {job.salaryRange}</p>
                    <p className="mb-4"><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
                    <button
                        onClick={(e) => handleApply(e, job.id)}
                        className="btn btn-primary fw-semibold"
                        style={{ padding: '10px 20px', fontSize: '16px' }}
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;