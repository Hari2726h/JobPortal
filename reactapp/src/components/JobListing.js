import React, { useEffect, useRef, useState } from 'react'
import JobDetail from './JobDetail';

const JobListing = () => {
const[count,setCount]=useState(0);
const foc=useRef();
const add= ()=>{
    setCount(count+1);
}
const sub= ()=>{
    setCount(count-1);
}
const clear= ()=>{
    setCount(0);
}
useEffect(()=>{
    console.log("No dependency");
})
useEffect(()=>{
    console.log("Empty dependency");
    foc.current.focus();
},[])
useEffect(()=>{
    console.log("Specific dependency");
},[count])
  return (
    <>
    <h1>{count}</h1>
    <button onClick={add}>Increment</button>
    <button onClick={sub}>Decrement</button>
    <button onClick={clear}>clear</button>
    <div>JobListing</div>
    <input type="text" ref={foc}/>
    {/* <JobDetail name="Leo" count={count}></JobDetail> */}

    </>
    // <header></header>
  )
}

export default JobListing