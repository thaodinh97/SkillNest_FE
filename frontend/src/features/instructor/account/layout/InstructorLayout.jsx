import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react'; // Cài lucide-react nếu cần

const InstructorLayout = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path) ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50";
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-gray-200">
                    <h1 className="text-xl font-bold text-blue-600">Instructor Portal</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/instructor/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/instructor/dashboard')}`}>
                        <LayoutDashboard size={20} />
                        Tổng quan
                    </Link>
                    <Link to="/instructor/courses" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/instructor/courses')}`}>
                        <BookOpen size={20} />
                        Quản lý khóa học
                    </Link>
                    <Link to="/instructor/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/instructor/profile')}`}>
                        <User size={20} />
                        Hồ sơ cá nhân
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    {/* Nút logout hoặc quay về trang chủ User */}
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 transition">
                        <LogOut size={20} />
                        Về trang chủ
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
                {/* Header nhỏ nếu cần */}
                <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-700">Khu vực giảng viên</h2>
                    <div className="flex items-center gap-4">
                        {/* Avatar nhỏ góc phải */}
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">I</div>
                    </div>
                </header>

                {/* Nội dung thay đổi theo Route con */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default InstructorLayout;