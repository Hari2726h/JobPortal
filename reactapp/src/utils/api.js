import axios from 'axios';

const API_BASE_URL='https://8080-cdebacccbffbdbcabdecffaffdabdbbe.premiumproject.examly.io/api/jobs';

const api= axios.create({
    baseURL: API_BASE_URL,
    headers: {'Content-Type':'application/json'},
});

export const fetchJobs=async()=>{
    try{
    const response=await api.get('');
    return response.data;
    }
    catch(error){
        console.log('API Error',error);
        throw error;
    }
};
export const fetchJobById = async(id)=>{
    try{
      const response=await api.get(`/${id}`);
      return response.data;
    }catch(error){
    console.error('API Error in fetchJobById: ',error);
    throw error;
    }
};

export const searchJobs=async(keyword)=>{
    try{
        const response=await api.get('/search',{params: {keyword}});
        return response.data;
    }catch(error){
        console.error('API Error in searchJobs: ',error);
        throw error;
    }
};