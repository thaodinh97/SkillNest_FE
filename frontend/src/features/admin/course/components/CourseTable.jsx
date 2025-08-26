import { Button } from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
export default function CourseTable({courses, onEdit, onDelete}) {
    return (
        <Card className="p-4">
            <CardContent>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Tên khóa học</th>
                            <th className="p-2 border">Giá</th>
                            <th className="p-2 border">Trạng thái</th>
                            <th className="p-2 border">Học viên</th>
                            <th className="p-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c, idx) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{idx + 1}</td>
                                <td className="p-2 border">{c.title}</td>
                                <td className="p-2 border">{c.description}</td>
                                <td className="p-2 border">{c.price.toLocaleString()} đ</td>
                                <td className="p-2 border">{c.instructorName}</td>
                                <td className="p-2 border flex justify-center gap-2">
                                    <Button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                                        onClick={() => onEdit(c)}>
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        onClick={() => onDelete(c.id)}
                                        className="px-4 py-2 rounded-lg">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}