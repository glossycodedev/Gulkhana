// import axios from "axios";

// const api = axios.create({
//     baseURL : 'http://localhost:5000/api'
  
// })

// export default api

import axios from 'axios';
const local = 'http://localhost:5000';
const REACT_APP_API_URL='https://44.209.193.10'
const production = '';
const api = axios.create({
  baseURL: `${REACT_APP_API_URL}/api`,
});

export default api;