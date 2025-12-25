import {useCallback, useEffect, useState} from "react"
import { courseApi } from "../../apis/course.js"

export const useCourses = (instructorId = null) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetchCourses = useCallback(async (overrideId) => {
        try {
            setLoading(true);
            const res = await courseApi.getCourses(overrideId);
            console.log(res);
            
            setCourses(res.result);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteCourse = async (id) => {
        try {
            setLoading(true);
            await courseApi.deleteCourseById(id);

            setCourses(prev => prev.filter(course => course.id !== id));

            setError(null);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi xóa khóa học');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCourse = async (id, data) => {
        try {
            setLoading(true);
            const res = await courseApi.updateCourse(id, data);
            setCourses(prev => prev.map(c => c.id === id ? res.result : c));

            setError(null);
            return res;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi cập nhật khóa học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(instructorId);
    }, [instructorId, fetchCourses]);

    return {
        courses,
        loading,
        error,
        refetch: fetchCourses,
        deleteCourse,
        updateCourse
    };
}