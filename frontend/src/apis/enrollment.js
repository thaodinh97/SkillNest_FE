import axiosClient from "../../services/axiosClient.js";

const enrollmentApi = {
    enrollCourse: async (data) => {
        const res = await axiosClient.post("/enroll", data)
        return res
    },

    getEnrolledCourses: async () => {
        const res = await  axiosClient.get("/enroll/my-courses")
        return res
    }
}

export default enrollmentApi