import React from 'react';
import { Link } from 'react-router-dom';
import {useCourses} from "@/hooks/course/useCourses.js";

export default function FeaturesCourse() {
    const { courses, loading, error } = useCourses();

    const featuredCourses = courses.slice(0, 3);

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 text-center">
                    Các khóa học nổi bật
                </h2>

                {loading && <p className="text-center mt-4">Đang tải khóa học...</p>}
                {error && <p className="text-center mt-4 text-red-500">Lỗi: {error}</p>}

                <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {!loading && !error && featuredCourses.map((course) => (
                        <div key={course.id} className="group relative rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
                            <div className="w-full h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={course.thumbnailUrl || 'https://www.skillfinder.com.au/media/wysiwyg/udemylogo.png'}
                                    alt={course.title}
                                    className="w-full h-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    <Link to={`/courses/${course.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {course.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-xl font-bold text-indigo-600">
                                    {course.price.toLocaleString()} đ
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/courses"
                        className="px-6 py-3 bg-gray-100 border border-gray-300 rounded-md
                       text-base font-medium text-gray-800 hover:bg-gray-200"
                    >
                        Xem tất cả khóa học
                    </Link>
                </div>
            </div>
        </div>
    );
}