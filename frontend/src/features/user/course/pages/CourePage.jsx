import { useCourses } from "../../../../hooks/course/useCourses.js";
import {Link} from "react-router-dom";

export default function CoursePage() {
    const {courses} = useCourses();
    const freeCourses = courses.filter(course => course.price === 0)
    const paidCourses = courses.filter(course => course.price > 0)
    const CourseCard = ({ course, isFree }) => (
        <div className="rounded-2xl bg-white p-4 shadow hover:shadow-lg transition flex flex-col h-full">
            <img
                src={course.thumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                alt={course.title}
                className="h-40 w-full object-cover rounded-xl bg-gray-200"
            />
            <div className="flex flex-col flex-grow mt-4">
                <h2 className="text-lg font-semibold line-clamp-2">{course.title}</h2>
                <div className="mt-auto pt-4">
                    <p className={`font-bold text-lg ${isFree ? 'text-green-600' : 'text-indigo-600'}`}>
                        {isFree ? "Miễn phí" : `${course.price.toLocaleString()} đ`}
                    </p>
                    <Link
                        to={`/courses/${course.id}`}
                        className={`mt-3 block w-full rounded-lg px-4 py-2 text-center text-white font-medium transition ${
                            isFree
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isFree ? "Đăng ký ngay" : "Xem chi tiết"}
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">Danh sách Khóa học</h1>

            {/* --- Phần 1: Khóa học Có phí --- */}
            {paidCourses.length > 0 && (
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-700 border-l-4 border-indigo-600 pl-3">
                        Khóa học chuyên sâu (Pro)
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paidCourses.map(course => (
                            <CourseCard key={course.id} course={course} isFree={false} />
                        ))}
                    </div>
                </div>
            )}

            {/* --- Phần 2: Khóa học Miễn phí --- */}
            {freeCourses.length > 0 && (
                <div>
                    <h2 className="mb-6 text-2xl font-bold text-gray-700 border-l-4 border-green-600 pl-3">
                        Khóa học miễn phí
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {freeCourses.map(course => (
                            <CourseCard key={course.id} course={course} isFree={true} />
                        ))}
                    </div>
                </div>
            )}

            {/* Hiển thị khi không có khóa học nào */}
            {courses.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                    Chưa có khóa học nào được hiển thị.
                </div>
            )}
        </div>
    )
}