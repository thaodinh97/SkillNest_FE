import { useState } from "react"
import { userApi } from "../../../../apis/user"

export const useUser = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await userApi.getAllUsers()
            setUsers(res.result)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }

    const fetchUsersByRole = async (role) => {
        try {
            setLoading(true)
            const res = await userApi.getUsersByRole(role)
            setUsers(res.result)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }

    const editUser = async (id, data) => {
        try {
            const res = await userApi.updateUser(id, data)
            setError(null)
            return res
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi update danh sách khóa học')
        }   
        finally {
            setLoading(false)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await userApi.deleteUserById(id)
            setError(null)
            return res
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi xóa danh sách khóa học')
        }
        finally {
            setLoading(false)
        }
    }
    
    const addUser = async (data) => {
        try {
            const res = await userApi.addUser(data)
            setError(null)
            return res
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi thêm người dùng')
        }
        finally {
            setLoading(false)
        }
    }

    return {
        users,
        loading,
        error,
        fetchUsers,
        fetchUsersByRole,
        editUser,
        deleteUser,
        addUser
    }
} 