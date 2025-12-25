import { Link } from "react-router-dom";
import {BookOpenIcon, CheckCheckIcon, PlayIcon} from "lucide-react";

const LearningSidebar = ({ course, currentLessonId }) => {
    // Giả định `course` chứa `sections` và `sections` chứa `lessons`
    // Bạn có thể dùng một hook để lấy trạng thái hoàn thành bài học
    // const { completedLessons } = useCompletionStatus(course.id);

    return (
        // w-96: Chiều rộng cố định ~ 384px. bg-white: Nền trắng.
        // overflow-y-auto: Cho phép cuộn nếu danh mục dài.
        <div className="w-96 bg-white border-l flex flex-col overflow-y-auto shadow-md">

            {/* Tiêu đề/Thông tin khóa học */}
            <div className="p-4 border-b">
                <h3 className="font-bold text-lg text-red-600 truncate">
                    {course.title}
                </h3>
            </div>

            {/* Danh sách các Chương (Sections) */}
            <div className="flex-1 p-2 space-y-2">
                {course.sections.map((section) => (
                    <div key={section.id} className="border-b">

                        {/* Header Chương */}
                        <div className="flex justify-between items-center py-2 px-2 cursor-pointer hover:bg-gray-100">
                            <h4 className="font-semibold text-gray-800">
                                {section.title}
                            </h4>
                            <span className="text-sm text-gray-500">{section.lessons.length}</span>
                        </div>

                        {/* Danh sách Bài học (Lessons) */}
                        <ul className="pl-2 pb-2">
                            {section.lessons.map((lesson) => {
                                const isCurrent = lesson.id === currentLessonId;
                                // Kiểm tra trạng thái hoàn thành (cần logic thực tế)
                                const isCompleted = false

                                return (
                                    <li key={lesson.id}>
                                        <Link
                                            to={`/learning/${course.id}/lesson/${lesson.id}`}
                                            className={`flex items-center gap-3 p-2 text-sm rounded-md transition 
                                                        ${isCurrent ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                                        >
                                            {/* Icon bài học */}
                                            {isCurrent ? <PlayIcon className="w-4 h-4" /> : <BookOpenIcon className="w-4 h-4" />}

                                            {/* Tên bài học */}
                                            <span className={`flex-1 truncate ${isCurrent ? 'font-semibold' : ''}`}>
                                                {lesson.title}
                                            </span>

                                            {/* Trạng thái hoàn thành/Thời lượng */}
                                            <div className="flex items-center text-xs text-right">
                                                {isCompleted ? (
                                                    <CheckCheckIcon className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <span className="text-gray-400">04:34</span> // Giả định thời lượng
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningSidebar;
