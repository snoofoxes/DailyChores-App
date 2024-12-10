import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.240:8000', // Change this to your FastAPI server URL
});

export default api;
