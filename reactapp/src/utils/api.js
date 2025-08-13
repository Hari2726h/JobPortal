import axios from 'axios';

const JOBS_API_BASE_URL = 'https://8080-cdebacccbffbdbcabdecffaffdabdbbe.premiumproject.examly.io/api/jobs';
const USERS_API_BASE_URL = 'https://8080-cdebacccbffbdbcabdecffaffdabdbbe.premiumproject.examly.io/api/users';
const COMPANIES_API_BASE_URL = 'https://8080-cdebacccbffbdbcabdecffaffdabdbbe.premiumproject.examly.io/api/companies';
const APPLICATIONS_API_BASE_URL = 'https://8080-cdebacccbffbdbcabdecffaffdabdbbe.premiumproject.examly.io/api/applications';

const jobsApi = axios.create({ baseURL: JOBS_API_BASE_URL, headers: { 'Content-Type': 'application/json' } });
const usersApi = axios.create({ baseURL: USERS_API_BASE_URL, headers: { 'Content-Type': 'application/json' } });
const companiesApi = axios.create({ baseURL: COMPANIES_API_BASE_URL, headers: { 'Content-Type': 'application/json' } });
const applicationsApi = axios.create({ baseURL: APPLICATIONS_API_BASE_URL, headers: { 'Content-Type': 'application/json' } });

export const fetchJobs = async () => {
        try {
                const response = await jobsApi.get();
                return response.data;
        } catch (error) {
                console.error('API Error in fetchJobs:', error);
                throw error;
        }
};
export const createJob = async (jobData) => {
        try {
                const response = await jobsApi.post('', jobData);
                return response.data;
        } catch (error) {
                console.error('API Error in createJob:', error);
                throw error;
        }
};

export const fetchJobById = async (id) => {
        try {
                const response = await jobsApi.get(`/${id}`);
                return response.data;
        } catch (error) {
                console.error('API Error in fetchJobById:', error);
                throw error;
        }
};

export const searchJobs = async (keyword) => {
        try {
                const response = await jobsApi.get('/search', { params: { keyword } });
                return response.data;
        } catch (error) {
                console.error('API Error in searchJobs:', error);
                throw error;
        }
};

export const getJobsByCompany = async (companyId) => {
        try {
                const response = await jobsApi.get(`/company/${companyId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in getJobsByCompany:', error);
                throw error;
        }
};

export const getAllUsers = async () => {
        try {
                const response = await usersApi.get();
                return response.data;
        } catch (error) {
                console.error('API Error in getAllUsers:', error);
                throw error;
        }
};

export const registerUser = async (userData) => {
        try {
                const response = await usersApi.post('/register', userData);
                return response.data;
        } catch (error) {
                console.error('API Error in registerUser:', error);
                throw error;
        }
};

export const loginUser = async (userData) => {
        try {
                const response = await usersApi.post('/login', userData);
                return response.data;
        } catch (error) {
                console.error('API Error in loginUser:', error);
                throw error;
        }
};

export const deleteUserById = async (id, adminId) => {
        try {
                const response = await usersApi.delete(`/${id}/${adminId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in deleteUserById:', error);
                throw error;
        }
};

export const getUserById = async (id) => {
        try {
                const response = await usersApi.get(`/${id}`);
                return response.data;
        } catch (error) {
                console.error('API Error in getUserById:', error);
                throw error;
        }
};

export const updateUser = async (id, adminId, userData) => {
        try {
                const response = await usersApi.put(`/${id}/${adminId}`, userData);
                return response.data;
        } catch (error) {
                console.error('API Error in updateUser:', error);
                throw error;
        }
};

export const loginCompany = async ({ email, password }) => {
        try {
                const response = await companiesApi.post('/login', { email, password });
                return response.data;
        } catch (error) {
                console.error('API Error in loginCompany:', error);
                throw error;
        }
};

export const createCompany = async (userId, companyData) => {
        const response = await companiesApi.post(`/create/${userId}`, companyData);
        return response.data;
};


export const getAllCompanies = async () => {
        try {
                const response = await companiesApi.get();
                return response.data;
        } catch (error) {
                console.error('API Error in getAllCompanies:', error);
                throw error;
        }
};

export const getCompanyById = async (companyId) => {
        try {
                const response = await companiesApi.get(`/${companyId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in getCompanyById:', error);
                throw error;
        }
};
export const deleteCompanyById = async (id, userId) => {
        try {
                const response = await companiesApi.delete(`/${id}/${userId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in deleteCompanyById:', error);
                throw error;
        }
};
export const deleteJob = async (jobId) => {
        try {
                const response = await jobsApi.delete(`/delete/${jobId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in deleteJob:', error);
                throw error;
        }
};


export const createApplication = async (userId, applicationData) => {
        try {
                const response = await applicationsApi.post(`/${userId}`, applicationData);
                return response.data;
        } catch (error) {
                console.error('API Error in createApplication:', error);
                throw error;
        }
};

export const getAllApplications = async () => {
        try {
                const response = await applicationsApi.get();
                return response.data;
        } catch (error) {
                console.error('API Error in getAllApplications:', error);
                throw error;
        }
};

export const getApplicationById = async (id) => {
        try {
                const response = await applicationsApi.get(`/${id}`);
                return response.data;
        } catch (error) {
                console.error('API Error in getApplicationById:', error);
                throw error;
        }
};

export const getApplicationsByCompany = async (companyId) => {
        try {
                const response = await applicationsApi.get(`/company/${companyId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in getApplicationsByCompany:', error);
                throw error;
        }
};

export const fetchAppliedJobs = async (userId) => {
        try {
                const response = await applicationsApi.get(`/user/${userId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in fetchAppliedJobs:', error);
                throw error;
        }
};
export const updateCompany = async (companyId, companyData) => {
        try {
                const response = await companiesApi.put(`/${companyId}`, companyData);
                return response.data;
        } catch (error) {
                console.error('API Error in updateCompany:', error);
                throw error;
        }
};


export const deleteApplicationById = async (id, userId) => {
        try {
                const response = await applicationsApi.delete(`/${id}/${userId}`);
                return response.data;
        } catch (error) {
                console.error('API Error in deleteApplicationById:', error);
                throw error;
        }
};
export const createJobForCompany = async (companyId, jobData) => {
        try {
                const response = await jobsApi.post(`/company/${companyId}`, jobData);
                return response.data;
        } catch (error) {
                console.error('API Error in createJobForCompany:', error);
                throw error;
        }
};

export const updateJob = async (id, jobData) => {
        try {
                const response = await jobsApi.put(`/${id}`, jobData);
                return response.data;
        } catch (error) {
                console.error('API Error in updateJob:', error);
                throw error;
        }
};

export const updateApplication = async (id, userId, applicationData) => {
        try {
                const response = await applicationsApi.put(`/${id}/${userId}`, applicationData);
                return response.data;
        } catch (error) {
                console.error('API Error in updateApplication:', error);
                throw error;
        }
};