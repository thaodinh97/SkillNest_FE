import {useEffect, useState} from "react";
import StatsCard from "@/features/instructor/account/components/StatsCard.jsx";
import RevenueChart from "@/features/instructor/account/components/RevenueChart.jsx";
import TopCourses from "@/features/instructor/account/components/TopCourses.jsx";
import { DollarSign, Users, BookOpen, Star } from 'lucide-react';
const InstructorDashboardPage = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setStats({
                totalRevenue: 150000000,
                revenueTrend: 12.5,
                totalStudents: 1250,
                studentTrend: 8.2,
                totalCourses: 5,
                courseTrend: 0,
                averageRating: 4.8,
                ratingTrend: 0.1,
                monthlyData: [
                    { name: 'T1', revenue: 10000000 },
                    { name: 'T2', revenue: 15000000 },
                    { name: 'T3', revenue: 12000000 },
                    { name: 'T4', revenue: 25000000 },
                    { name: 'T5', revenue: 30000000 },
                    { name: 'T6', revenue: 45000000 },
                    { name: 'T7', revenue: 40000000 },
                ],
                topCourses: [
                    { id: 1, title: 'Spring Boot & React Fullstack', revenue: 50000000, students: 400, thumbnail: 'https://placehold.co/100x60' },
                    { id: 2, title: 'Lập trình Java căn bản', revenue: 30000000, students: 600, thumbnail: 'https://placehold.co/100x60' },
                    { id: 3, title: 'Frontend Master 2024', revenue: 12000000, students: 150, thumbnail: 'https://placehold.co/100x60' },
                ]
            });
            setLoading(false);
        }, 800)
    }, []);

    if(loading) return <div className="p-8">Đang tải dữ liệu...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>7 ngày qua</option>
                    <option>Tháng này</option>
                    <option>Năm nay</option>
                </select>
            </div>

            {/* 1. Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng doanh thu"
                    value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
                    icon={DollarSign}
                    trend={stats.revenueTrend}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Học viên"
                    value={stats.totalStudents}
                    icon={Users}
                    trend={stats.studentTrend}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Khóa học"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    trend={stats.courseTrend}
                    color="bg-orange-500"
                />
                <StatsCard
                    title="Đánh giá TB"
                    value={stats.averageRating}
                    icon={Star}
                    trend={stats.ratingTrend}
                    color="bg-yellow-500"
                />
            </div>

            {/* 2. Charts & Top Courses Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart chiếm 2 phần */}
                <div className="lg:col-span-2">
                    <RevenueChart data={stats.monthlyData} />
                </div>

                {/* List chiếm 1 phần */}
                <div className="lg:col-span-1">
                    <TopCourses courses={stats.topCourses} />
                </div>
            </div>
        </div>
    )
}

export default InstructorDashboardPage