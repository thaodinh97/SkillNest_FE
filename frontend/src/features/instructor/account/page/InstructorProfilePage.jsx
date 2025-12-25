import InstructorBioForm from "@/features/instructor/account/components/InstructorBioForm.jsx";
import {useEffect, useState} from 'react';
import {useUserInfo} from "@/hooks/user/useUserInfo.js";
const InstructorProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const {user, loading: userLoading, error} = useUserInfo()

    useEffect(() => {
        // Giả lập lấy dữ liệu từ API
        // API response: { fullName, email, dob, phoneNumber, avatarUrl }
        setTimeout(() => {
            console.log(user)
            setProfileData(user);
        }, 800);
    }, [user]);

    const handleSaveProfile = async (formData, avatarFile) => {
        setIsSaving(true);
        try {
            let newAvatarUrl = formData.avatarUrl;

            // --- Logic Upload Ảnh (Giả lập) ---
            if (avatarFile) {
                console.log("Đang upload ảnh lên Cloudinary...");
                // const uploadRes = await uploadToCloudinary(avatarFile);
                // newAvatarUrl = uploadRes.secure_url;

                // Demo:
                newAvatarUrl = URL.createObjectURL(avatarFile);
            }

            const payload = {
                fullName: formData.fullName,
                dob: formData.dob,
                phoneNumber: formData.phoneNumber,
                avatarUrl: newAvatarUrl,
            };

            console.log("Saving payload:", payload);

            // await api.put('/instructor/profile', payload);

            // Update UI
            setProfileData({ ...profileData, ...payload });
            alert("Cập nhật hồ sơ thành công!");

        } catch (error) {
            console.error("Lỗi:", error);
            alert("Lỗi cập nhật profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (userLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-500">Đang tải thông tin...</span>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h1>
                    <p className="text-gray-500">Quản lý thông tin hồ sơ giảng viên của bạn.</p>
                </div>

                <InstructorBioForm
                    initData={user}
                    onSave={handleSaveProfile}
                    isLoading={isSaving}
                />
            </div>
        </div>
    );
}

export default InstructorProfilePage;