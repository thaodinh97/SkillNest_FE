import {useState} from "react";
import enrollmentApi from "@/apis/enrollment.js";
import {toast} from "react-toastify";

export function useEnrollCourse() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const enrollCourse = async (courseId) => {
        try {
            setLoading(true)
            setError(null)
            const response = await enrollmentApi.enrollCourse({courseId})
            if (response.code === 1000)
            {
                toast.success("Đã đăng kí khóa học!")
            }
            else {
                toast.error(response.message)
            }
            return response
        }
        catch (err) {
            setError(err.message || "Không thể đăng kí khóa học này!");
            toast.error(err.message || "Không thể đăng kí khóa học này!")
        }
        finally {
            setLoading(false)
        }
    }
    return {enrollCourse, loading, error}
}