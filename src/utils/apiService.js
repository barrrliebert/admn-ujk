import axios from 'axios';

const ApiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add a request interceptor
ApiService.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Credentials'] = true;
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
ApiService.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    // Periksa apakah response valid
    if (response.data?.error) {
      return Promise.reject(new Error(response.data.error));
    }
    return response.data;
  },
  async (error) => {
    console.error('Response interceptor error:', error);
    
    // Log detail error untuk debugging
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    }

    const originalRequest = error.config;

    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/refresh-token`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Access-Control-Allow-Credentials': true
              },
              withCredentials: true
            }
          );

          if (response?.data?.result_code === 0) {
            localStorage.setItem('token', response.data.result.access_token);
            localStorage.setItem('refreshToken', response.data.result.refresh_token);
            ApiService.defaults.headers.common['Authorization'] = 
              `Bearer ${response.data.result.access_token}`;
            return ApiService(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    if (error.response?.data) {
      return Promise.reject({
        ...error,
        message: error.response.data.message || 'An error occurred'
      });
    }

    return Promise.reject(error);
  }
);

export default ApiService; 