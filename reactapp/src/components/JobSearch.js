import React, { useEffect, useRef, useState } from 'react'
import * as api from '../utils/api';

const JobSearch = ({setJobs}) => {
   const[query,setQuery]=useState('');
   const[loading,setLoading]=useState(false);
   const[error,setError]=useState('');
   const[empty,setEmpty]=useState(false);
    
   const handleSearch=()=>{
    if(!query.trim()) return;
    setLoading(true);
    setError('');
    setEmpty(false);

    api.searchJobs(query.trim().toLowerCase())
    .then(results=>{
        setJobs(results);
        if(results.length===0) setEmpty(true);
    })
    .catch(()=>{
        setError('Search failed. Please try again.');
        setJobs([]);
    })
    .finally(()=>setLoading(false));
   };
   return(
    <div>
        <input data-testid="search-input" type="text" value={query} onChange={e=>setQuery(e.target.value)}
        placeholder="Search jobs"/>
        <button data-testid="search-button" onClick={handleSearch} disabled={loading}>
            {loading? 'Searching...':'Search'}
        </button>
        {error && <div data-testid="search-error" style={{color:'red'}}>{error}</div>}
        {empty && <div data-testid="search-empty-message">No results found.</div>
         }
    </div>
   );
};

export default JobSearch;