import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Pointing to our newly built Express + Prisma backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (Optional: To inject token)
apiClient.interceptors.request.use(
  (config) => {
    // For now, our backend allows mock tokens. You can set it directly here.
    const token = localStorage.getItem('pgx_token') || 'MOCK_SUPERADMIN_TOKEN';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (Optional: To catch global errors)
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return the data payload directly
  },
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
