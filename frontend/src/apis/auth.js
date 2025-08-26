import axiosClient from "../../services/axiosClient"

const authApi = {
    login: async (payload) => {
        const res = await axiosClient.post("/auth/login", payload)
        return res
    },
    register: (data) => axiosClient.post("/auth/register", data)
}
export default authApi