import axiosClient from "../../services/axiosClient"

export const courseApi = {
    getCourses: async (instructorId = null) => {
        const config = {
            params: {}
        };

        if (instructorId) {
            config.params.instructorId = instructorId;
        }
        const res = await axiosClient.get("/course", config)

        return res
    },

    getCourseById: async (courseId) => {
        const res = await axiosClient.get(`/course/${courseId}`)
        return res
    },

    createCourse: async (data) => {
        const res = await axiosClient.post("/course/", data)
        return res
    },

    deleteCourseById: async (id, data) => {
        const res = await axiosClient.delete(`/course/${id}`, data)
        return res
    },

    updateCourse: async (id, data) => {
        const res = await axiosClient.put(`/course/${id}`, data)
        return res
    }
}