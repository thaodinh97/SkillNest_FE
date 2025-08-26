import axiosClient from "../../services/axiosClient"

export const userApi = {
    getAllInstructors: async () => {
        const res = await axiosClient.get("/user/instructors")
        return res
    }
}