import LearningFooter from "../components/LearningFooter";
import LearningHeader from "../components/LearningHeader";
import LearningSidebar from "../components/LearningSideBar";
import LessonContent from "../components/LessonContent";
import {useCourseDetail} from "@/hooks/course/useCourseDetail.js";
import {useParams} from "react-router-dom";


const LearningPage = () => {
    const { courseId, lessonId } = useParams();
    const {course, loading, error} = useCourseDetail(courseId)
    const findCurrentLesson = (course, lessonId) => {
        if (!course || !course.sections || !lessonId) return null;

        for (const section of course.sections) {
            const lesson = section.lessons.find(l => l.id === lessonId);
            if (lesson) {
                return lesson;
            }
        }
        return null;
    };

    const currentLesson = findCurrentLesson(course, lessonId);
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Đang tải dữ liệu học tập...
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="flex h-screen items-center justify-center text-red-500">
                Lỗi: {error || 'Không tìm thấy khóa học hoặc khóa học đã bị xóa!'}
            </div>
        );
    }

    if (!currentLesson) {
        return <div className="flex h-screen items-center justify-center text-red-500">Không tìm thấy bài học hiện tại.</div>;
    }
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex flex-1 flex-col">
                <LearningHeader currentLesson={currentLesson}/>
                <div className="flex flex-1 overflow-hidden">
                    
                    <LearningSidebar course={course} currentLessonId={lessonId}/>
                    <main className="flex-1 overflow-auto min-h-0">
                        <LessonContent currentLesson={currentLesson}/>
                    </main>
                </div>
                <LearningFooter
                    lessons={course.sections.flatMap(s => s.lessons)}
                    currentLessonId={lessonId}
                    courseId={courseId}
                />
            </div>
        </div>
    )
}
export default LearningPage;