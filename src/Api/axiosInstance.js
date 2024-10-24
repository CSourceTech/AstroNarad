import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://astrotalk-pink.vercel.app/api-docs",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;