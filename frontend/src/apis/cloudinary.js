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
    }
}