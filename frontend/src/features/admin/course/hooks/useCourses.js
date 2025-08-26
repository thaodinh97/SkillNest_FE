import { useEffect, useState } from "react"
import { courseApi } from "../../../../apis/course"

export const useCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const res = await courseApi.getAll()
            setCourses(res.result)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }

    const deleteCourse = async (id) => {
        try {
            const res = await courseApi.deleteCourseById(id)
            setError(null)
            return res
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi xóa danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }

    const updateCourse = async (id, data) => {
        try {
            const res = await courseApi.updateCourse(id, data)
            setError(null)
            return res
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi update danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return {
        courses,
        loading,
        error,
        refetch: fetchCourses,
        deleteCourse,
        updateCourse
    }
}