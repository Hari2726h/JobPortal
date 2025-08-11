import React, { useState } from 'react';
import JobListing from './components/JobListing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, BrowserRouter, Route, useNavigate, useParams } from 'react-router-dom';
import JobDetail from './components/JobDetail';
import JobSearch from './components/JobSearch';

function JobListingPage({ jobs, setJobs }) {
  const navigate = useNavigate();
  return (
    <div style={{maxWidth: '900px',margin:'0 auto',padding:'20px'}}>
      <section style={{textAlign: 'center',marginBottom:'20px'}}>
        <h1 style={{fontSize:'2rem',marginBottom:'10px'}}>Find your Dream Job</h1>
        <p style={{color:'#555'}}>Browse through the latest openings and apply in a click.</p>
      </section>
      <JobListing jobs={jobs} setJobs={setJobs} onSelectJob={(id)=> navigate(`/jobs/${id}`)}/>
    </div>
  );
};
function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  return <JobDetail jobId={jobId} onBack={()=>navigate('/')}/>;  
}

function App() {
  const [jobs, setJobs] = useState([]);
  return (
    <BrowserRouter>
      <Header setJobs={setJobs} />
      <Routes>
        <Route path='/' element={<JobListingPage jobs={jobs} setJobs={setJobs} />} />
        <Route path='/jobs/:jobId' element={<JobDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;