import { Button } from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
export default function UserTable({users, onEdit, onDelete}) {
    return (
        <Card className="p-4">
            <CardContent>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Họ và tên</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Ngày sinh</th>
                            <th className="p-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{idx + 1}</td>
                                <td className="p-2 border">{user.fullName}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.dob}</td>
                                <td className="p-2 border flex justify-center gap-2">
                                    <Button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                                        onClick={() => onEdit(user)}>
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        onClick={() => onDelete(user.id)}
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