import { useEffect, useState } from "react"
import { courseApi } from "../../../../apis/course"
import { userApi } from "../../../../apis/user"

export const useCourseForm = (initData = null) => {
    const [formData, setFormData] = useState(initData || {
        title: '',
        description: '',
        instructorId: '',
        price: 0
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [instructors, setInstructors] = useState([])

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = id
                ? await courseApi.updateCourse(id, formData)
                : await courseApi.createCourse(formData)

            setLoading(false)
            return {success: true}
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Lỗi khi lưu khóa học';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }
        finally {
            setLoading(false)
        }

    }

    const fetchInstructors = async () => {
        
        setLoading(true)
        try {
            const res = await userApi.getAllInstructors()
            setInstructors(res.result)
            console.log(instructors);
            
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Lỗi khi lưu khóa học';
            setError(errorMsg);
            return {message: errorMsg}
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log("Instructors state updated:", instructors);
    }, [instructors]);

    useEffect(() => {
        fetchInstructors();
    }, []);

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
        setFormData,
        instructors
    }
}