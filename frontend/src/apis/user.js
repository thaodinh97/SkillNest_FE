import axiosClient from "../../services/axiosClient"

export const userApi = {
    getAllInstructors: async () => {
        const res = await axiosClient.get("/user/role/instructor")
        return res
    },

    getUsersByRole: async (role) => {
        const res = await axiosClient.get(`/user/role/${role}`)
        return res
    },

    getAllUsers: async () => {
        const res = await axiosClient.get("/user/")
        return res
    },
    updateUser: async (id, data) => {
        const res = await axiosClient.put(`/user/${id}`, data)
        return res
    },
    deleteUserById: async (id) => {
        const res = await axiosClient.delete(`/user/${id}`)
        return res
    }
}