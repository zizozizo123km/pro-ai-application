import axios from 'axios';

// Define the base URL. In a real application, this would come from environment variables.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mockapi.facebookclone.com/v1';

// Create a configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// --- Interceptors ---

// Request interceptor: Attach authentication token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('facebook_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error('Unauthorized access. Redirecting to login.');
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- API Service Definitions ---

const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  // Note: Logout often involves clearing local storage and potentially calling a backend endpoint
  logout: () => {
    localStorage.removeItem('facebook_auth_token');
    return Promise.resolve({ message: 'Logged out successfully' });
  },
};

const users = {
  getCurrentUser: () => api.get('/users/me'),
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  getFriends: (userId) => api.get(`/users/${userId}/friends`),
};

const posts = {
  getFeed: (page = 1, limit = 10) => api.get('/feed', { params: { page, limit } }),
  createPost: (postData) => api.post('/posts', postData),
  getPostDetails: (postId) => api.get(`/posts/${postId}`),
  likePost: (postId) => api.post(`/posts/${postId}/like`),
  commentOnPost: (postId, commentContent) => api.post(`/posts/${postId}/comments`, { content: commentContent }),
};

const notifications = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.patch(`/notifications/${notificationId}/read`),
};

// Consolidate and export the services
const FacebookApiService = {
  auth,
  users,
  posts,
  notifications,
  // Export the raw instance for flexibility
  instance: api,
};

export default FacebookApiService;