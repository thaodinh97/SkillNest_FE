import axiosClient from "../../services/axiosClient.js";

export const sectionApi = {
    getSectionsByCourseId: async (courseId) => {
        const res = await axiosClient.get(`/section`, {
            params: {courseId: courseId}
        })
        return res
    },
    createSection: async (courseId, title) => {
        const res = await axiosClient.post(`/section`, {
            courseId,
            title
        })
        return res
    },
    updateSection: async (sectionId, title) => {
        const res = await axiosClient.put(`/section/${sectionId}`, {
            title
        })
        return res
    },
    deleteSection: async (sectionId) => {
        console.log(sectionId);
        
        const res = await axiosClient.delete(`/section/${sectionId}`)
        return res
    }
}