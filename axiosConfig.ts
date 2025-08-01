import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://fakestoreapi.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
