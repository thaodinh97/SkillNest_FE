import {useEffect, useState} from "react";
import { Camera, User, Mail, Phone, Calendar } from 'lucide-react';


const InstructorBioForm = ({initData, onSave, isLoading}) => {
    const [formData, setFormData] = useState({
        avatarUrl: null,
        fullName: '',
        email: '',
        dob: '',
        phoneNumber: '',
    })

    const [previewAvatar, setPreviewAvatar] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    useEffect(() => {
        if(initData) {
            setFormData({
                avatarUrl: initData.avatarUrl,
                fullName: initData.fullName,
                email: initData.email,
                dob: initData.dob,
                phoneNumber: initData.phoneNumber
            })
        }
    }, [initData]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAvatarFile(file)
            setPreviewAvatar(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData, avatarFile)
    }
    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">

            <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100 shadow-sm">
                        <img
                            src={previewAvatar ||
                                formData.avatarUrl ||
                                "https://cdn-icons-png.freepik.com/512/15162/15162674.png"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition shadow-lg border-2 border-white">
                        <Camera size={16} />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>
                <p className="mt-3 text-sm text-gray-500">Nhấn vào icon máy ảnh để thay đổi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <User size={16} className="text-gray-400"/> Họ và tên
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Ví dụ: Nguyễn Văn A"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <Mail size={16} className="text-gray-400"/> Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        disabled
                        className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                        title="Không thể thay đổi email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <Phone size={16} className="text-gray-400"/> Số điện thoại
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="0912 xxx xxx"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400"/> Ngày sinh
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob} // Format value phải là YYYY-MM-DD
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-8 mt-4 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
            </div>
        </form>
    );
}

export default InstructorBioForm