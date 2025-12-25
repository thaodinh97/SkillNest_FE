import React from 'react';
import { Eye, Users } from 'lucide-react';

const TopCourses = ({ courses }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Khóa học nổi bật</h3>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{course.title}</h4>
                            <p className="text-xs text-gray-500">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.revenue)}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Users size={12} /> {course.students}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCourses;