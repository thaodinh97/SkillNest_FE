
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, LayoutList, ListVideo, Settings } from 'lucide-react';
import { useCourseDetail } from '@/hooks/course/useCourseDetail';

// Import các Tab components
import CourseBasicInfo from '../components/CourseBasicInfo';
import CourseCurriculum from '../components/CourseCurriculum';
import CourseSettings from '../components/CourseSettings';

const EditCoursePage = () => {
    const { courseId } = useParams();
    const { course, loading, error, refetch } = useCourseDetail(courseId);
    const [activeTab, setActiveTab] = useState('curriculum');

    if (loading) return <div className="p-8 text-center">Đang tải dữ liệu khóa học...</div>;
    if (error) return <div className="p-8 text-red-500">Lỗi: {error}</div>;
    if (!course) return null;

    // Menu điều hướng các tab
    const tabs = [
        { id: 'basic', label: 'Thông tin cơ bản', icon: LayoutList },
        { id: 'curriculum', label: 'Chương trình học', icon: ListVideo },
        { id: 'settings', label: 'Cài đặt & Giá', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link to="/instructor/courses" className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 line-clamp-1 max-w-md">
                            {course.title}
                        </h1>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {course.isPublished ? 'Đang bán' : 'Bản nháp'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                        Xem trước
                    </button>
                </div>
            </header>

            <div className="flex flex-1 max-w-7xl w-full mx-auto p-6 gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                        ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
                    {activeTab === 'basic' && (
                        <CourseBasicInfo course={course} onUpdate={refetch} />
                    )}
                    {activeTab === 'curriculum' && (
                        <CourseCurriculum course={course} onUpdate={refetch} />
                    )}
                    {activeTab === 'settings' && (
                        <CourseSettings course={course} onUpdate={refetch} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default EditCoursePage;