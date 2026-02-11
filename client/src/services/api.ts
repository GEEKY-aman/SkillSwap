import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
});

// Attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const authService = {
    login: (data: { email: string; password: string }) => api.post('/auth/login', data),
    register: (data: { name: string; email: string; password: string; role?: string }) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),
};

// Jobs
export const jobService = {
    getJobs: () => api.get('/jobs'),
    getJob: (id: string) => api.get(`/jobs/${id}`),
    createJob: (data: any) => api.post('/jobs', data),
    applyToJob: (id: string) => api.post(`/jobs/${id}/apply`),
};

// Hackathons
export const hackathonService = {
    getHackathons: () => api.get('/hackathons'),
    getHackathon: (id: string) => api.get(`/hackathons/${id}`),
    createHackathon: (data: any) => api.post('/hackathons', data),
    joinHackathon: (id: string) => api.post(`/hackathons/${id}/register`),
};

// Courses
export const courseService = {
    getCourses: () => api.get('/courses'),
    getCourse: (id: string) => api.get(`/courses/${id}`),
    createCourse: (data: any) => api.post('/courses', data),
    enrollInCourse: (id: string) => api.post(`/courses/${id}/enroll`),
};

// Quizzes
export const quizService = {
    getQuizzes: () => api.get('/quizzes'),
    getQuiz: (id: string) => api.get(`/quizzes/${id}`),
    createQuiz: (data: any) => api.post('/quizzes', data),
    submitQuiz: (id: string, data: any) => api.post(`/quizzes/${id}/attempt`, data),
};

// Profile
export const profileService = {
    getProfile: () => api.get('/profile'),
    updateProfile: (data: any) => api.put('/profile', data),
};

// Projects
export const projectService = {
    getProjects: () => api.get('/projects'),
    getProject: (id: string) => api.get(`/projects/${id}`),
    createProject: (data: any) => api.post('/projects', data),
};

// Posts (Community)
export const postService = {
    getPosts: () => api.get('/posts'),
    createPost: (data: { content: string; image?: string }) => api.post('/posts', data),
    toggleLike: (id: string) => api.put(`/posts/${id}/like`),
    addComment: (id: string, data: { text: string }) => api.post(`/posts/${id}/comment`, data),
    deletePost: (id: string) => api.delete(`/posts/${id}`),
};

// Messages
export const messageService = {
    getConversations: () => api.get('/messages/conversations'),
    getMessages: (userId: string) => api.get(`/messages/${userId}`),
    sendMessage: (userId: string, data: { text: string }) => api.post(`/messages/${userId}`, data),
};

// Rooms (Live Rooms)
export const roomService = {
    getRooms: () => api.get('/rooms'),
    createRoom: (data: { title: string; topic: string; type?: string; tags?: string[] }) => api.post('/rooms', data),
    joinRoom: (id: string) => api.put(`/rooms/${id}/join`),
    leaveRoom: (id: string) => api.put(`/rooms/${id}/leave`),
};

// Dashboard
export const dashboardService = {
    getDashboard: () => api.get('/dashboard'),
    getAdminDashboard: () => api.get('/dashboard/admin'),
};

// Users (Admin + Match + Skills)
export const userService = {
    getUsers: () => api.get('/users'),
    getMentors: () => api.get('/users/mentors'),
    getMatches: () => api.get('/users/matches'),
    updateUserRole: (id: string, role: string) => api.put(`/users/${id}/role`, { role }),
    updateUserStatus: (id: string, status: string) => api.put(`/users/${id}/status`, { status }),
    purchaseItem: (data: { price: number; item: string }) => api.post('/users/purchase', data),
};

export default api;
