import axiosClient from "../../services/axiosClient"

const authApi = {
    login: async (payload) => {
        const res = await axiosClient.post("/auth/login", payload)
        return res
    },
    register: (data) => axiosClient.post("/auth/register", data),
    refresh: async (payload) => {
        const res = await axiosClient.post("/auth/refresh", payload)
        return res
    },
    logout: async (token = null) => {
        
        const res = await axiosClient.post("/auth/logout", {
            token: token
        })
        console.log(res);
        
        return res
    }
}

export default authApi