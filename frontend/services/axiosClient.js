import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (!config.url.includes("/auth/login") && !config.url.includes("/auth/register")) {
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config
})

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(error.response?.data || error.message);
        throw error
    }
)

export default axiosClient;