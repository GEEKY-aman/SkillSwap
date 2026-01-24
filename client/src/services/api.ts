import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    register: (userData: any) => api.post('/auth/register', userData),
    login: (userData: any) => api.post('/auth/login', userData),
    getMe: () => api.get('/auth/me'),
};

export const jobService = {
    getJobs: () => api.get('/jobs'),
    createJob: (jobData: any) => api.post('/jobs', jobData),
};

export const hackathonService = {
    getHackathons: () => api.get('/hackathons'),
    createHackathon: (hackathonData: any) => api.post('/hackathons', hackathonData),
};

export const courseService = {
    getCourses: () => api.get('/courses'),
    createCourse: (courseData: any) => api.post('/courses', courseData),
};

export const quizService = {
    getQuizzes: () => api.get('/quizzes'),
    createQuiz: (quizData: any) => api.post('/quizzes', quizData),
};

export const projectService = {
    getProjects: () => api.get('/projects'),
    getProject: (id: string) => api.get(`/projects/${id}`),
    createProject: (projectData: any) => api.post('/projects', projectData),
    updateProject: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),
};

export default api;
