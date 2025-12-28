import axiosClient from "../../services/axiosClient.js";

export const cloudinaryApi = {
    getSignature: async (course, section, lesson) => {
        const response = await axiosClient.get("/cloudinary/signature", {
            params: {
                course,
                section,
                lesson
            }
        })
        return response
    },

    uploadThumbnailCourse: async (courseId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosClient.post(`/cloudinary/upload-image/${courseId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
}