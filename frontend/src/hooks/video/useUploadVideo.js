import {cloudinaryApi} from "@/apis/cloudinary.js";
import axios from "axios";

export const useUploadVideo = () => {
    const uploadVideo = async (file) => {
        const {timestamp, signature, apiKey} = await cloudinaryApi.getSignature()
        const formData = new FormData()
        formData.append("file", file);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", apiKey);
        formData.append("folder", "course_videos");

        const uploadUrl = import.meta.env.CLOUDINARY_UPLOAD_URL
        const response = await axios.post(uploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        return response.data
    }

    return {uploadVideo}
}