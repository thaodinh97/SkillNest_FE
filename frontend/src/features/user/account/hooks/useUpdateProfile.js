import {useState} from "react";
import {userApi} from "@/apis/user.js";
import {toast} from "react-toastify";

export const useUpdateProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState(null)
    const [updatedData, setUpdatedData] = useState(null)

    const updateUser = async (userId, dataToUpdate) => {
        setIsUpdating(true)
        setError(null)
        setUpdatedData(null)
        try {
            const payload = {
                fullName: dataToUpdate.fullName,
                dob: dataToUpdate.dob,
                phoneNumber: dataToUpdate.phoneNumber
            }

            const res = await userApi.updateUser(userId, payload)
            if(res.result && res.code === 1000) {
                toast.success("Cập nhật thành công!")
                setUpdatedData(res.result)
                return true
            }
            else {
                throw new Error(res.message || "Cập nhật thất bại!")
            }
        }
        catch (err)
        {
            toast.error(`Lỗi: ${err.message}`);
            setError(err.message)
            return false
        }
        finally {
            setIsUpdating(false)
        }
    }

    return { updateUser, isUpdating, error, updatedData };
}