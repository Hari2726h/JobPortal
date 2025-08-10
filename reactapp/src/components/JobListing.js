import React, { useEffect, useRef, useState } from 'react'
import * as api from '../utils/api';

const JobListing = ({setJobs,jobs=[],onSelectJob}) => {
   const[localJobs,setLocalJobs]=useState(jobs);
   const[loading,setLoading]=useState(true);
   const[error,setError]=useState('');
   
   useEffect(()=>{
let isMounted=true;
setLoading(true);
setError('');
setLocalJobs([]);
// Promise.resolve().then(()=>{
api.fetchJobs()
.then((data)=>{
    if(!isMounted) return;
    setJobs && setJobs(data);
    setLocalJobs(data);
    setError('');
})
.catch(()=>{
    if(!isMounted) return;
    setError('Failed to fetch jobs');
    setLocalJobs([]);
})
.finally(()=>{
    if(isMounted) setLoading(false);
});
// });
return () =>{isMounted=false; };
   },[setJobs]);
   if(loading) return <div data-testid="loading-indicator">Loading...</div>
   if(error) return <div data-testid="error-message">{error}</div>
   if(!localJobs || localJobs.length==0){
    return <div data-testid="no-jobs-message">No jobs available</div>;
   }
   return (
   <div data-testid="job-listing">
    {localJobs.map((job)=>(
        <div key={job.id} data-testid={`job-item-${job.id}`} onClick={()=> onSelectJob && onSelectJob(job.id)} style={{cursor: 'pointer',marginBottom: '10px'}}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            {/* <p>{job.postedDate}</p>
            <p>{job.description}</p>
            <p>{job.skills}</p>
            <p>{job.salaryRange}</p>
            <p>{job.applicationDeadline}</p> */}
            </div>
    ))}
   </div>
  );
};

export default JobListing