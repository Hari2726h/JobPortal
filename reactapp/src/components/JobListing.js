import React, { useEffect, useState } from 'react'
import * as api from '../utils/api';

const JobListing = ({ setJobs, jobs = [], onSelectJob }) => {
    const [localJobs, setLocalJobs] = useState(jobs);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError('');

        if (jobs && jobs.length > 0) {
            setLocalJobs(jobs);
            setLoading(false);
            return;
        }
        api.fetchJobs()
            .then((data) => {
                if (!isMounted) return;
                setJobs && setJobs(data);
                setLocalJobs(data);
            })
            .catch(() => {
                if (!isMounted) return;
                setError('Failed to fetch jobs');
                setLocalJobs([]);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, [jobs, setJobs]);

    if (loading) return <div data-testid="loading-indicator">Loading...</div>;
    if (error) return <div data-testid="error-message">{error}</div>;
    if (!localJobs || localJobs.length === 0) {
        return <div data-testid="no-jobs-message">No jobs available</div>;
    }

    const handleApply = (e, jobTitle) => {
        e.stopPropagation();
        alert(`Applied succesfully for "${jobTitle}"`);
    };

    return (
        <div
            data-testid="job-listing"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
                gap: '15px'
            }}
        >
            {localJobs.map((job) => (
                <div
                    key={job.id}
                    data-testid={`job-item-${job.id}`}
                    onClick={() => onSelectJob && onSelectJob(job.id)}
                    style={{
                        cursor: 'pointer',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease',
                        backgroundColor: '#fff'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                    <p>{job.type}</p>
                    <p>{job.salaryRange}</p>
                    <button
                        onClick={(e) => handleApply(e, job.title)}
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
            ))}
        </div>
    );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
export default JobListing;