
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Tháng 1", revenue: 4000 },
  { name: "Tháng 2", revenue: 3000 },
  { name: "Tháng 3", revenue: 5000 },
  { name: "Tháng 4", revenue: 7000 },
]

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-indigo-600 text-white p-6 space-y-6">
                <h1 className="text-2xl font-bold">Admin</h1>
                <nav className="space-y-4">
                    <a href="/dashboard" className="block hover:text-yellow-300">📊 Dashboard</a>
                    <a href="/courses" className="block hover:text-yellow-300">📚 Quản lý khóa học</a>
                    <a href="/users" className="block hover:text-yellow-300">👨‍🎓 Người dùng</a>
                    <a href="/orders" className="block hover:text-yellow-300">🛒 Đơn hàng</a>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
                        Sign out
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-gray-500">Khóa học</h3>
                        <p className="text-2xl font-bold">120</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-gray-500">Học viên</h3>
                        <p className="text-2xl font-bold">3500</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-gray-500">Doanh thu</h3>
                        <p className="text-2xl font-bold">500M VNĐ</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h3 className="text-gray-500">Đơn hàng</h3>
                        <p className="text-2xl font-bold">875</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded shadow mb-6">
                    <h3 className="text-lg font-semibold mb-4">Doanh thu theo từng tháng</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="revenue" fill="#4F46E5"/>
                        </BarChart>
                    </ResponsiveContainer>
                    
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">📚 Danh sách khóa học</h3>
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left">Tên khóa học</th>
                            <th className="p-3">Giảng viên</th>
                            <th className="p-3">Học viên</th>
                            <th className="p-3">Giá</th>
                            <th className="p-3">Trạng thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-t">
                            <td className="p-3">ReactJS từ A-Z</td>
                            <td className="p-3">Nguyễn Văn A</td>
                            <td className="p-3 text-center">250</td>
                            <td className="p-3">1,200,000đ</td>
                            <td className="p-3 text-green-600 font-semibold">Đang bán</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-3">Spring Boot nâng cao</td>
                            <td className="p-3">Trần Thị B</td>
                            <td className="p-3 text-center">180</td>
                            <td className="p-3">1,500,000đ</td>
                            <td className="p-3 text-green-600 font-semibold">Đang bán</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-3">Python cho Data Science</td>
                            <td className="p-3">Lê Văn C</td>
                            <td className="p-3 text-center">320</td>
                            <td className="p-3">999,000đ</td>
                            <td className="p-3 text-yellow-600 font-semibold">Sắp mở</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}