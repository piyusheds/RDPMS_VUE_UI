import axios from 'axios';

// Base URL for your API gateway
const apiClient = axios.create({
  baseURL: 'http://localhost:5103/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor to add the Authorization header with the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the header
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle error
  }
);

export default {
  // GET Request
  get(resource, params = {}) {
    return apiClient.get(resource, { params });
  },

  // POST Request
  post(resource, data, config = {}) {
    return apiClient.post(resource, data, config);
},


  // PUT Request
  put(resource, data) {
    return apiClient.put(resource, data);
  },

  // DELETE Request
  delete(resource) {
    return apiClient.delete(resource);
  },
};
