import axiosClient from "../../services/axiosClient.js";

export const lessonApi = {
    createLesson: async (sectionId, title, type, content = "", order = 1) => {
        const res = await axiosClient.post(`/lesson`, {
            sectionId,
            title,
            type,
            content,
            order
        })
        return res
    },
    updateLesson: async (lessonId, payload) => {
        const res = await axiosClient.put(`/lesson/${lessonId}`, payload)
        return res
    },
    deleteLesson: async (lessonId) => {
        const res = await axiosClient.delete(`/lesson/${lessonId}`)
        return res
    },
    getLessonById: async (lessonId) => {
        const res = await axiosClient.get(`/lesson/${lessonId}`)
        return res
    }
}
