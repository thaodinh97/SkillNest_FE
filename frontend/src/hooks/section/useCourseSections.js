import {useEffect, useState} from "react";
import {sectionApi} from "@/apis/section.js";

export const useCourseSections = (courseId) => {
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseId) {
            setLoading(false)
            return;
        }

        const fetchSections = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await sectionApi.getSectionsByCourseId(courseId)
                if (response.result && response.code === 1000)
                {
                    setSections(response.result || [])
                } else {
                    throw new Error(response.message || 'Không thể tải nội dung khóa học');
                }
            }
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSections().catch(console.error)
    }, [courseId]);

    return { sections, loading, error };
}