import React, { useEffect, useState } from 'react';
import { Plus, Search, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CreateCourseModal from '../components/CreateCourseModal';
import {useCourses} from "@/hooks/course/useCourses.js";
import {useUserInfo} from "@/hooks/user/useUserInfo.js";

const InstructorCoursePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const {user} = useUserInfo()
    const {
        courses,
        loading
    } = useCourses(user?.id);


    const handleCreateCourse = async (courseId) => {
        try {
            // Course đã được tạo và thumbnail đã được upload
            // Chuyển hướng ngay sang trang Edit
            navigate(`/instructor/courses/${courseId}/manage`);
        } catch (error) {
            alert("Không thể tạo khóa học mới");
        }
    };

    // 3. Hàm format tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) return <div className="p-8 text-center">Đang tải danh sách...</div>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
                    <p className="text-gray-500 mt-1">Quản lý và biên tập nội dung các khóa học.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    <span>Tạo khóa học mới</span>
                </button>
            </div>

            <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    className="w-full sm:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Khóa học</th>
                            <th className="px-6 py-4">Giá bán</th>
                            <th className="px-6 py-4">Trạng thái</th>
                            <th className="px-6 py-4 text-center">Học viên</th>
                            <th className="px-6 py-4 text-right">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                {course.thumbnail ? (
                                                    <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No IMG</div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 line-clamp-1 max-w-xs" title={course.title}>
                                                    {course.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                        {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                ${course.isPublished === true
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'}`}>
                                                {course.isPublished === true ? 'Đang bán' : 'Bản nháp'}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                                        {course.studentCount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                to={`/instructor/courses/${course.id}/manage`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg tooltip"
                                                title="Chỉnh sửa nội dung"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            {/* Nút xóa có thể thêm logic confirm sau */}
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    Bạn chưa có khóa học nào. Hãy tạo khóa học đầu tiên!
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <CreateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateCourse}
            />
        </div>
    );
};

export default InstructorCoursePage;