import {useEffect, useState} from "react";
import {useAccountProfile} from "@/features/user/account/hooks/useAccountProfile.js";
import {useUpdateProfile} from "@/features/user/account/hooks/useUpdateProfile.js";

const ProfilePage = () => {
    const { data: profileData, loading, error } = useAccountProfile();
    const [formData, setFormData] = useState({
        avatarUrl: null,
        fullName: '',
        email: '',
        dob: '',
        phoneNumber: '',
    })
    const [userId, setUserId] = useState(null)
    const {
        updateUser,
        isUpdating,
        error: updateError
    } = useUpdateProfile()

    useEffect(() => {
        if (profileData) {
            setUserId(profileData.id)
            setFormData({
                fullName: profileData.fullName || '',
                email: profileData.email || '',
                dob: profileData.dob ? profileData.dob.split('T')[0] : '',
                avatarUrl: profileData.avatarUrl || null,
                phoneNumber: profileData.phoneNumber || '',
            })

        }
    }, [profileData])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await updateUser(userId, formData)
    }
    if (loading) {
        return <div>Đang tải thông tin hồ sơ...</div>;
    }

    if (error) {
        return <div className="text-red-600">Lỗi: {error}</div>;
    }

    return (
        <div className="profile-page">
            {/*Header*/}
            <h2 className="text-2xl font-semibold text-gray-900">
                Thông tin cá nhân
            </h2>
            <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-6">
                Quản lí thông tin cá nhân
            </p>

            {/*Form*/}
            <form onSubmit={handleSubmit} className="mt-6 max-w-lg">
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ảnh đại diện
                    </label>
                    <div className="flex items-center gap-4">
                        {formData.avatarUrl ? (
                            <img
                                src={formData.avatarUrl}
                                alt="Avatar"
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-3xl font-semibold text-gray-400 border-2 border-gray-200">
                                {formData.fullName ? formData.fullName.charAt(0) : '?'}
                            </div>
                        )}
                        <input
                            type="file"
                            id="avatarUpload"
                            accept="image/*"
                            className="hidden"
                        />
                        <label
                            htmlFor="avatarUpload"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                        >
                            Thay đổi
                        </label>
                    </div>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base
                       bg-gray-100 cursor-not-allowed"
                    />
                    <small className="text-xs text-gray-500 mt-1">
                        Email không thể thay đổi.
                    </small>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Chưa cập nhật"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer
                       transition-colors duration-200 hover:bg-blue-700
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
                {updateError && (
                    <div className="mt-4 text-sm text-red-600">
                        Lỗi cập nhật: {updateError}
                    </div>
                )}
            </form>
        </div>
    )
}

export default ProfilePage;