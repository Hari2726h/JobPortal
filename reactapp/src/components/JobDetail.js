import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

const JobDetail = ({ jobId, onBack }) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');
        setJob(null);

        api.fetchJobById(jobId)
            .then((data) => {
                if (!isMounted) return;
                setJob(data);
                setError('');
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

    if (loading) return <div data-testid="detail-loading">Loading job details...</div>;
    if (error) return <div data-testid="detail-error">{error}</div>;
    if (!job) return null;

    const handleApply = (e) => {
        // e.stopPropagation();
        // navigate(`apply/${jobId}`);
    };

    return (
        <div data-testid="job-detail">
            <button data-testid="back-button" onClick={onBack}>Back to Listings</button>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Posted Date:</strong> {job.postedDate}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p>
                <strong>Skills:</strong>{' '}
                {job.skills.map((skill, idx) => (
                    <span key={idx}>{skill}{idx < job.skills.length - 1}</span>
                ))}
            </p>
            <p><strong>Salary Range:</strong> {job.salaryRange}</p>
            <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
            <button
                onClick={handleApply}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Apply
            </button>
        </div>
    );
};

export default JobDetail;
