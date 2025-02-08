import axios from 'axios';

// Define the base URL for your API
const apiClient = axios.create({
  baseURL: 'http://13.233.79.234:8080/api/', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add the token to the header of each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Method to login and get a token
  login(credentials) {
    return apiClient.post('Authentication/login', credentials)
      .then(response => {
        console.log('Full response:', response);  // Log the full response object
        const token = response.data.token;  // Access token from the response data
        if (token) {
          localStorage.setItem('authToken', token);  // Store token in localStorage
          return token;
        }
        throw new Error('Authentication failed: Token not found');
      })
      .catch(error => {
        console.error('Login failed:', error);  // Log the error to the console
        throw error;
      });
  },

  // Method to log out the user by removing the token
  logout() {
    localStorage.removeItem('authToken');
  },

  // Save token to localStorage
  saveToken(token) {
    localStorage.setItem('authToken', token);
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  // Method to check if the user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('User is authenticated.');
      return true;  // Return true if token exists
    } else {
      console.log('User is not authenticated.');
      return false;  // Return false if token is not found
    }
  },
};
