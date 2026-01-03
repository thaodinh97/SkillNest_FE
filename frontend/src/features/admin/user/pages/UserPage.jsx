import { useEffect, useState } from "react"
import UserTable from "../components/UserTable"
import { useUser } from "../hooks/useUser"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function AdminUserPage() {
    const {users, loading, fetchUsersByRole, editUser, deleteUser, addUser} = useUser()
    const [selectedRole, setSelectedRole] = useState("user")
    const allRoles = ["instructor", "user", "admin"]

    const [openForm, setOpenForm] = useState(false)
    const [edittingUser, setEdittingUser] = useState(null)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dob: '',
        roles: [
            'user'
        ]
    })

    const formatDateToDDMMYYYY = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        fetchUsersByRole(selectedRole)
        console.log(loading);
        
    }, [selectedRole])

    const handleAdd = () => {
        setEdittingUser(null)
        setFormData({
            fullName: '',
            email: '',
            password: '',
            roles: ['user']
        })
        setOpenForm(true)
    }

    const handleEdit = (user) => {
        setEdittingUser(user)
        setFormData({
            fullName: user.fullName,
            email: user.email,
            dob: user.dob ? user.dob.split('T')[0] : '',
            roles: Array.isArray(user.roles) 
                    ? [typeof user.roles[0] === "string" ? user.roles[0] : user.roles[0].name]
                    : [typeof user.roles === "string" ? user.roles : user.roles.name]
        })
        console.log(user.roles[0]);
        
        setOpenForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            await deleteUser(id)
            fetchUsersByRole(selectedRole)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataSend = {
            ...formData,
            dob: formData.dob ? formatDateToDDMMYYYY(formData.dob) : null
        }
        if (edittingUser) {
            await editUser(edittingUser.id, dataSend)
            console.log(edittingUser.id, dataSend);
            
        } else {
            await addUser(dataSend)
        }
        setOpenForm(false)
        fetchUsersByRole(selectedRole)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold mb-4">Quản lí người dùng</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={handleAdd}
                >
                    Thêm người dùng
                </button>
            </div>
            <div className="mb-4">
                <Select 
                    value={selectedRole}
                    onValueChange={(value) => setSelectedRole(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                        {allRoles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                {loading ? (
                    <div>
                        <p>Đang tải danh sách người dùng...</p>
                    </div>
                ): (
                    <UserTable
                        users={users}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
            {openForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form 
                        className="bg-white rounded-lg p-6 w-[400px] shadow-xl flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-xl font-bold mb-2">
                            {edittingUser ? "Cập nhật người dùng" : "Thêm người dùng mới"}
                        </h2>
                        <input 
                            className="border rounded px-3 py-2"
                            type="text" 
                            placeholder="Họ và tên" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            required
                        />
                        <input 
                            className="border rounded px-3 py-2"
                            type="email" 
                            placeholder="Email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                        <input
                            className="border rounded px-3 py-2"
                            placeholder="Ngày sinh"
                            type="date"
                            value={formData.dob}
                            onChange={e => setFormData({...formData, dob: e.target.value})}
                        />
                        <select
                            className="border rounded px-3 py-2"
                            value={formData.roles[0]}
                            onChange={e => setFormData({...formData, roles: [e.target.value]})}
                        >
                            {allRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {edittingUser ? "Cập nhật" : "Thêm"}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setOpenForm(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}