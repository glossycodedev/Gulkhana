// import axios from "axios";

// const api = axios.create({
//     baseURL : 'http://localhost:5000/api'

// })

// export default api

import axios from 'axios';
const local = 'http://localhost:5000';
const REACT_APP_API_URL = 'https://54.198.12.163';
const production = '';
const api = axios.create({
  baseURL: `${local}/api`,
});

export default api;
