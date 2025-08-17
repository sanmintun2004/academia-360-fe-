import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  loginUser: (credentials) => api.post('/api/auth/user/login', credentials),
  loginAdmin: (credentials) => api.post('/api/auth/admin/login', credentials),
  logout: () => api.post('/api/auth/logout'),
};

// Users API
export const usersAPI = {
  getUsers: (pageNumber = 0) => api.get(`/api/users/page/${pageNumber}`),
  getUser: (userId) => api.get(`/api/users/${userId}`),
  createUser: (userData) => api.post('/api/users', userData),
  updateUser: (userId, userData) => api.put(`/api/users/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/api/users/${userId}`),
};

// Courses API
export const coursesAPI = {
  getCourses: (pageNumber = 0) => api.get(`/api/course/page/${pageNumber}`),
  createCourse: (courseData) => api.post('/api/course/', courseData),
  updateCourse: (courseId, courseData) => api.put(`/api/course/${courseId}`, courseData),
  deleteCourse: (courseId) => api.delete(`/api/course/${courseId}`),
};

// Course Details API
export const courseDetailsAPI = {
  getCourseDetails: () => api.get('/api/coursedetail'),
  getCourseDetail: (coursedetailId) => api.get(`/api/coursedetail/${coursedetailId}`),
  createCourseDetail: (courseDetailData) => api.post('/api/coursedetail/', courseDetailData),
  updateCourseDetail: (coursedetailId, courseDetailData) => api.put(`/api/coursedetail/${coursedetailId}`, courseDetailData),
  deleteCourseDetail: (coursedetailId) => api.delete(`/api/coursedetail/${coursedetailId}`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/api/category'),
  getCategory: (categoryId) => api.get(`/api/category/${categoryId}`),
  createCategory: (categoryData) => api.post('/api/category/', categoryData),
  updateCategory: (categoryId, categoryData) => api.put(`/api/category/${categoryId}`, categoryData),
  deleteCategory: (categoryId) => api.delete(`/api/category/${categoryId}`),
};

// Pathways API
export const pathwaysAPI = {
  getPathways: (pageNumber = 0) => api.get(`/api/pathway/page/${pageNumber}`),
  createPathway: (pathwayData) => api.post('/api/pathway/', pathwayData),
  updatePathway: (pathwayId, pathwayData) => api.put(`/api/pathway/${pathwayId}`, pathwayData),
  deletePathway: (pathwayId) => api.delete(`/api/pathway/${pathwayId}`),
};

// Announcements API
export const announcementsAPI = {
  getAnnouncements: () => api.get('/api/annoucement'), // Note: keeping original typo
  createAnnouncement: (announcementData) => api.post('/api/announcement/', announcementData),
};

// Admins API
export const adminsAPI = {
  getAdmins: () => api.get('/api/admins'),
  getAdmin: (id) => api.get(`/api/admins/${id}`),
  createAdmin: (adminData) => api.post('/api/admins', adminData),
  updateAdmin: (id, adminData) => api.put(`/api/admins/${id}`, adminData),
  deleteAdmin: (id) => api.delete(`/api/admins/${id}`),
};

// Admin Roles API
export const adminRolesAPI = {
  getAdminRoles: (pageNumber = 0) => api.get(`/api/adminRole/page/${pageNumber}`),
  createAdminRole: (roleData) => api.post('/api/adminRole/', roleData),
  updateAdminRole: (adminRoleId, roleData) => api.put(`/api/adminRole/${adminRoleId}`, roleData),
  deleteAdminRole: (adminRoleId) => api.delete(`/api/adminRole/${adminRoleId}`),
};

export default api;
