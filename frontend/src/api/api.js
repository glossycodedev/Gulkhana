import axios from 'axios';
const local = 'http://localhost:5000';
const REACT_APP_API_URL = 'https://54.198.12.163';
const production = '';
const api = axios.create({
  baseURL: `${REACT_APP_API_URL}/api`,
});

export default api;
