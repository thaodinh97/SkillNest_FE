import { useCourses } from "../../../../hooks/course/useCourses.js";
import {Link} from "react-router-dom";

export default function CoursePage() {
    const {courses} = useCourses();
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-6 text-3xl font-bold">Khóa học</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map(course => (
                <div key={course.id} className="rounded-2xl bg-white p-4 shadow hover:shadow-lg">
                    <img
                        src={course.thumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                        alt={course.title}
                        className="h-40 rounded-xl bg-gray-200"
                    />
                    <h2 className="mt-4 text-lg font-semibold">{course.title}</h2>
                    <p className="text-indigo-600 font-bold">{course.price.toLocaleString()} đ</p>
                    <Link
                        to={`/courses/${course.id}`}
                        className="mt-3 block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
                    >
                        Xem chi tiết
                    </Link>
                </div>
                ))}
            </div>
        </div>
    )
}