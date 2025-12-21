import axiosClient from "../../services/axiosClient.js";

export const cloudinaryApi = {
    getSignature: async () => {
        const response = await axiosClient.get("/videos/signature")
        return response
    }
}