// import axios from "axios";

// const api = axios.create({
//     baseURL : 'http://localhost:5000/api'

// })

// export default api

import axios from 'axios';
const local = 'http://localhost:5000';
// const local = 'http://54.166.173.167';
// const REACT_APP_API_URL = 'http://54.166.173.167';
// const production = '';
const api = axios.create({
  baseURL: `${local}/api`,
});

export default api;
