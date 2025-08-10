import React, { useEffect, useRef, useState } from 'react'
import * as api from '../utils/api';

const JobDetail = ({jobId,onBack}) => {
   const[job,setJob]=useState(null);
   const[loading,setLoading]=useState(true);
   const[error,setError]=useState('');
   
useEffect(()=>{
let isMounted=true;
setLoading(true);
setError('');
setJob(null);

// Promise.resolve().then(()=>{
api.fetchJobById(jobId)
.then((data)=>{
    if(!isMounted) return;
    setJob(data);
    setError('');
    // setJob(null);
})
.catch((error)=>{
    if(!isMounted) return;
    const msg=error?.response?.data?.message || 'Failed to load job details';
    setError(msg);
})
.finally(()=>{
    if(isMounted) setLoading(false);
});
// });
return () =>{isMounted=false; };
   },[jobId]);
   if(loading) return <div data-testid="detail-loading">Loading job details...</div>;
   if(error) return <div data-testid="detail-error">{error}</div>;
   if(!job){
    return null; }
   return (
   <div data-testid="job-detail">
    <button data-testid="back-button" onClick={onBack}>Back to Listings</button>
          <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Posted Date:</strong> {job.postedDate}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Skills:</strong>{' '}
            {/* {Array.isArray(job.skills) && job.skills.length > 0 ? */}
           {  job.skills.map((skill,idx)=>(
            <span key={idx}>{skill}{idx < job.skills.length -1}</span>
            // /   job.skills.join(', ')  : 'React'
            ))}
            </p>
            <p><strong>Salary Range:</strong> {job.salaryRange}</p>
            <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
          
            </div>
   
  );
};

export default JobDetail;