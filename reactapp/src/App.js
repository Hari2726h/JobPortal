import React, { useState } from 'react'
import JobListing from './components/JobListing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes,BrowserRouter,Route, useNavigate, useParams } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LRPage from './components/LRPage';
import JobSearch from './components/JobSearch';
import JobDetail from './components/JobDetail';
function JobListingPage(){
const[jobs,setJobs]=useState([]);
const navigate=useNavigate();
const handleSearchJob=(jobId)=>{
  navigate(`/jobs/${jobId}`);
};
return(
  <div>
    <JobSearch setJobs={setJobs}/>
    <JobListing jobs={jobs} setJobs={setJobs} onSelectJob={handleSearchJob}/>
  </div>
  );
}
function JobDetailPage(){
  const{jobId}=useParams();
  const navigate=useNavigate();
  const handleBack=()=>{
    navigate('/');
  };
  return <JobDetail jobId={jobId} onBack={handleBack}/>;
}
  function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<JobListingPage/>}/>
      <Route path='/jobs/:jobId' element={<JobDetailPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    );
}
export default App;