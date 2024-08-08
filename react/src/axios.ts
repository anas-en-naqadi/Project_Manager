import axios from "axios";
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});
axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  ({response}) => {
    // Check if the error is due to token expiration
    if (response.status === 401){
      sessionStorage.removeItem('token');
      window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
    }

    else if(response.status === 422)
  {const errors = Object.values(response.data.errors).flat();
response.customErrors = errors;}
    
    return Promise.reject(response);
  }
);

export default axiosClient;
