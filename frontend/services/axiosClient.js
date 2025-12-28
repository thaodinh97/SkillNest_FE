import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (!config.url.includes("/auth/login")
        && !config.url.includes("/auth/register")
        && !config.url.includes("/auth/refresh"))
    {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config
        const refreshToken = localStorage.getItem("token")

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        return axiosClient(originalRequest)
                    })
                    .catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    { token: refreshToken }
                )
                const newToken = res.data.result.token
                localStorage.setItem("token", newToken)
                processQueue(null, newToken)
                return axiosClient(originalRequest)
            } catch (err) {
                processQueue(err, null)
                localStorage.removeItem("token")
                localStorage.removeItem("refreshToken")
                window.location.href = "/login"
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default axiosClient;