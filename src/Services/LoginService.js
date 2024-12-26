import axios from 'axios';

// Define the base URL for your API
const apiClient = axios.create({
  baseURL: 'http://localhost:5120/api/', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  // Method to login and get a token
  login(credentials) {
    return apiClient.post('Auth/login', credentials)
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
        console.error('Login failed:', error);
        throw error;
      });
  },

  // Method to log out the user by removing the token
  logout() {
    localStorage.removeItem('authToken');
  },

  // Method to check if the user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
};
