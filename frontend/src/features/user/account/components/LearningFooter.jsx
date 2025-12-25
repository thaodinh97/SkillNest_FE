import { Link } from "react-router-dom";

const LearningFooter = ({ lessons, currentLessonId, courseId }) => {
    const currentIndex = lessons.findIndex(x => x.id === currentLessonId);
    const prevLesson = lessons[currentIndex - 1];
    const nextLesson = lessons[currentIndex + 1];

    return (
        <footer className="h-14 flex items-center justify-between px-6 bg-white border-t">
            <div>
                {prevLesson && (
                    <Link
                        className="text-blue-600 hover:underline"
                        to={`/course/${courseId}/learn/${prevLesson.id}`}
                    >
                        ← Bài trước
                    </Link>
                )}
            </div>

            <div>
                {nextLesson && (
                    <Link
                        className="text-blue-600 hover:underline"
                        to={`/course/${courseId}/learn/${nextLesson.id}`}
                    >
                        Bài tiếp theo →
                    </Link>
                )}
            </div>
        </footer>
    );
};

export default LearningFooter;
