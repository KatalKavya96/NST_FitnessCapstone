// src/apis/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // no / at the end
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if using cookies / sessions
});

export default axiosInstance;
