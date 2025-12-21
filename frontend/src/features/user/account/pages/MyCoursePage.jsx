import { useEffect, useState } from "react"
import enrollmentApi from "@/apis/enrollment.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.js";

const MyCoursePage = () => {
    const [courses, setCourses] = useState([])
    const [filter, setFilter] = useState("all")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEnrolledCouses = async () => {
            const res = await enrollmentApi.getEnrolledCourses()
            const courses = res.result;
            setCourses(courses)
        }
        fetchEnrolledCouses().catch(toast.error)
    }, [])

    const filteredCourses = courses.filter(c => {
        if (filter === "all") return true
        if (filter === "learning") return c.progressPercentage > 0 && c.progressPercentage < 100
        if (filter === "completed") return c.progressPercentage === 100
        if (filter === "purchased") return c.progressPercentage === 0
        return true
    })

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>

            {/* Filter */}
            <div className="flex gap-3 mb-6">
                {[
                    { key: "all", label: "Tất cả" },
                    { key: "purchased", label: "Đã mua" },
                    { key: "learning", label: "Đang học" },
                    { key: "completed", label: "Hoàn thành" }
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={
                            `px-4 py-2 rounded-lg border transition
                            ${filter === f.key
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-300 hover:bg-gray-100"}`
                        }
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Course list */}
            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <img
                        src="https://i.imgur.com/1HjYJ14.png"
                        alt="Empty"
                        className="w-48 mx-auto mb-6 opacity-80"
                    />
                    <p>Bạn chưa có khóa học nào trong mục này.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div
                            key={course.course.id}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={course.course.thumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                                alt={course.course.title}
                                className="h-40 w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{course.course.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{course.course.instructorName}</p>

                                {course.progressPercentage !== 0 && (
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ width: `${course.progressPercentage}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Tiến độ: {course.progressPercentage}%
                                        </p>
                                    </div>
                                )}

                                {/* Button */}
                                <Button
                                    onClick={() => navigate(
                                        `/learning/${course.course.id}/lesson/${course.course.sections[0].lessons[0].id}`
                                    )}
                                    className="w-full mt-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    {course.progressPercentage === 100
                                        ? "Xem lại khóa học"
                                        : course.progressPercentage > 0 && course.progressPercentage < 100
                                            ? "Tiếp tục học"
                                            : "Bắt đầu học ngay"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyCoursePage
