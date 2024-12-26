import axios from 'axios';

// Base URL for your API gateway
const apiClient = axios.create({
  baseURL: 'http://localhost:5120/api/', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }, 
});

export default {
  // GET Request
  get(resource, params = {}) {
    return apiClient.get(resource, { params });
  },

  // POST Request
  post(resource, data) {
    return apiClient.post(resource, data);
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
