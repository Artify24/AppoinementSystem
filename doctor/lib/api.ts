import axios from 'axios';

const api = axios.create({
    baseURL: "https://appoinmentmanagement.runasp.net//api",
     headers: {
    "Content-Type": "application/json",
  }
});

export default api;