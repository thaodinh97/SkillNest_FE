import {useParams} from "react-router-dom";
import {useCourseDetail} from "@/hooks/course/useCourseDetail.js";
import {useCourseSections} from "@/hooks/section/useCourseSections.js";
import {useUser} from "@/features/admin/user/hooks/useUser.js";
import {useAccountProfile} from "@/features/user/account/hooks/useAccountProfile.js";
import {useAddToCart} from "@/hooks/cart/useAddToCart.js";
import {toast} from "react-toastify";

const DocumentIcon = () => (
    <svg className="w-5 h-5 text-gray-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25mC7.7 2.25 7.2 2.7 7.2 3.25v1.5c0 .55.5 1 1.05 1h.75v1.5H7.75A1.125 1.125 0 0 1 6.625 9v1.5H6a3.375 3.375 0 0 0-3.375 3.375v2.625a3.375 3.375 0 0 0 3.375 3.375h1.5A1.125 1.125 0 0 1 7.75 21v1.5a3.375 3.375 0 0 0 3.375 3.375h3.75a3.375 3.375 0 0 0 3.375-3.375v-1.5A1.125 1.125 0 0 1 19.5 18v-1.5h.75a3.375 3.375 0 0 0 3.375-3.375V9A3.375 3.375 0 0 0 20.625 5.625H18v1.5c0 .55-.5 1-1.05 1h-1.5Z" />
    </svg>
);
export default function CourseDetailPage() {
    const {courseId} = useParams()
    const {course, loading: courseLoading, error: courseError} = useCourseDetail(courseId)
    const {sections, loading: sectionsLoading, error: sectionsError} = useCourseSections(courseId)
    const {data, loading: accountLoading, error: accountError} = useAccountProfile()
    const {addToCart, loading: addingToCart} = useAddToCart()

    const handleAddToCart = async () => {
        try {
            await addToCart(courseId, data.id)
            toast.success("Đã thêm vào giỏ hàng!")
        }
        catch (err) {
            toast.error("Không thể thêm vào giỏ hàng")
        }
    }
    if (courseLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Đang tải chi tiết khóa học...
            </div>
        );
    }

    if (courseError || !course) {
        return (
            <div className="flex h-screen items-center justify-center text-red-500">
                Lỗi: {courseError || 'Không tìm thấy khóa học hoặc khóa học đã bị xóa!'}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/*Header*/}
            <div className="bg-gray-800 p-8 text-white md:p-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold md:text-4xl">{course.title}</h1>
                    <p className="mt-2 text-sm">Tạo bởi {course.instructorName || 'Giảng viên'}</p>
                </div>
            </div>

            {/*Content*/}
            <div className="max-w-4xl mx-auto p-4 md:flex md:gap-8">
                {/* Nội dung chính */}
                <div className="md:w-2/3">
                    {/* Ảnh bìa */}
                    <img
                        src={course.thumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                        alt={course.title}
                        className="w-full rounded-lg shadow-lg aspect-video object-cover"
                    />

                    {/* Mô tả chi tiết */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Mô tả khóa học</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {course.description || 'Nội dung chi tiết của khóa học...'}
                        </p>
                    </div>

                    {/* Nội dung khóa học (Syllabus) */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Nội dung khóa học</h2>
                        {sectionsLoading ? (
                            <p>Đang tải nội dung...</p>
                        ) : sectionsError ? (
                            <p className="text-red-500">Lỗi: {sectionsError}</p>
                        ) : sections.length > 0 ? (
                            <div className="space-y-4">
                                {sections.map((section) => (
                                    <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        {/* Tên chương */}
                                        <div className="bg-gray-50 px-4 py-3">
                                            <h3 className="font-semibold text-gray-800">Chương {section.order}: {section.title}</h3>
                                        </div>
                                        {section.lessons && section.lessons.length > 0 ? (
                                            <ul className="divide-y divide-gray-200">
                                                {section.lessons.map((lesson) => (
                                                    <li key={lesson.id} className="flex items-center gap-3 p-4">
                                                        <DocumentIcon />
                                                        <span className="text-gray-700">Bài {lesson.order}: {lesson.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="p-4 text-sm text-gray-500">Chương này chưa có bài học.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Khóa học này chưa có nội dung.</p>
                        )}
                    </div>
                </div>

                {/* Thẻ Mua hàng (Sticky) */}
                <div className="md:w-1/3 mt-8 md:mt-0">
                    <div className="sticky top-24 bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-3xl font-bold text-indigo-600 mb-4">
                            {course.price.toLocaleString()} đ
                        </p>
                        <button className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white hover:bg-indigo-700">
                            Mua ngay
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                            className={`mt-3 w-full rounded-lg border border-gray-700 px-4 py-3 text-lg font-semibold text-gray-800 ${
                                addingToCart
                                    ? "bg-gray-100 cursor-not-allowed opacity-70"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {addingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}