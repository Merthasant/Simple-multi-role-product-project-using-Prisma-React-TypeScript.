import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10 * 1000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["X-new-access-token"];
    if (newAccessToken) {
      const token = `Bearer ${newAccessToken}`;
      localStorage.setItem("token", token);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
    }
    if (status === 404) alert("not found");
    if (status === 400) alert("not match");
    return Promise.reject(error);
  },
);

export default axiosInstance;
