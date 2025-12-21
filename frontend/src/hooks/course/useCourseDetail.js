import {useEffect, useState} from "react";
import {courseApi} from "@/apis/course.js";

export const useCourseDetail = (courseId) => {
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!courseId)
        {
            setLoading(false)
            setError('Không tìm thấy khóa học hoặc đã bị xóa!')
            return;
        }

        const fetchCourse = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await courseApi.getCourseById(courseId)
                console.log("call fetch courses")
                if (response.result && response.code === 1000)
                {

                    setCourse(response.result)
                    console.log(response.result)
                }
                else {
                    throw new Error(response.message || 'Không thể tải dữ liệu khóa học');
                }
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(false);
            }
        }
        fetchCourse().catch(console.error)
    }, [courseId]);

    return {course, loading, error}
}