import React from 'react'
import JobListing from './components/JobListing';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Header/>
    <div className='d-flex justify-content-center align-items-center' style={{minHeight: '80hv'}}>
    <JobListing></JobListing>
    </div>
    <Footer/>
    </>
    )
}
export default App;