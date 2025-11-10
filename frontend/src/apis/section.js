import axiosClient from "../../services/axiosClient.js";

export const sectionApi = {
    getSectionsByCourseId: async (courseId) => {
        const res = await axiosClient.get(`/section`, {
            params: {courseId: courseId}
        })
        return res
    }
}