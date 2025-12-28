import React, { useState } from 'react';
import { X } from 'lucide-react';
import { courseApi } from '@/apis/course';
import { cloudinaryApi } from '@/apis/cloudinary';
import { useUserInfo } from '@/hooks/user/useUserInfo';

const CreateCourseModal = ({ isOpen, onClose, onCreate }) => {
    const { user } = useUserInfo();
    
    // Step 1: Form dữ liệu khóa học cơ bản
    const [courseFormData, setCourseFormData] = useState({
        title: '',
        description: '',
        price: 0
    });

    // Step 2: Dữ liệu course sau khi tạo
    const [courseData, setCourseData] = useState({
        id: null,
        thumbnailUrl: null,
        thumbnailPublicId: null
    });

    const [step, setStep] = useState(1); // 1: Create Course, 2: Upload Thumbnail
    const [isSaving, setIsSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Reset form khi đóng modal
    const handleClose = () => {
        setCourseFormData({ title: '', description: '', price: 0 });
        setCourseData({ id: null, thumbnailUrl: null, thumbnailPublicId: null });
        setStep(1);
        setSelectedFile(null);
        onClose();
    };

    // Step 1: Tạo course với dữ liệu cơ bản
    const handleCreateCourse = async (e) => {
        e.preventDefault();

        if (!courseFormData.title.trim()) {
            alert("Vui lòng nhập tiêu đề khóa học");
            return;
        }

        setIsSaving(true);
        try {
            const courseDataToCreate = {
                ...courseFormData,
                instructorId: user?.id
            };
            
            const response = await courseApi.createCourse(courseDataToCreate);
            
            setCourseData(prev => ({
                ...prev,
                id: response.result.id
            }));
            
            console.log("Created course with ID:", response.result.id);
            alert("Tạo khóa học thành công! Bây giờ hãy upload ảnh thumbnail.");
            setStep(2); // Chuyển sang bước upload thumbnail
        } catch (error) {
            console.error("Lỗi tạo khóa học:", error);
            alert("Lỗi khi tạo khóa học. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    // Step 2: Xử lý chọn file thumbnail
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Kiểm tra định dạng ảnh
            if (!file.type.startsWith('image/')) {
                alert("Vui lòng chọn một file ảnh");
                return;
            }
            // Kiểm tra kích thước (tối đa 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("Kích thước ảnh không được vượt quá 5MB");
                return;
            }
            setSelectedFile(file);
        }
    };

    // Step 2: Upload thumbnail và hoàn thành
    const handleSubmitThumbnail = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        try {
            // Nếu có file được chọn, upload thumbnail
            if (selectedFile) {
                const uploadResponse = await cloudinaryApi.uploadThumbnailCourse(courseData.id, selectedFile);
                
                const thumbnailUrl = uploadResponse.result?.imageUrl;

                if (thumbnailUrl ) {
                    // Update course với thumbnail information
                    await courseApi.updateCourse(courseData.id, {
                        thumbnailUrl: thumbnailUrl
                    });

                    setCourseData(prev => ({
                        ...prev,
                        thumbnailUrl: thumbnailUrl
                    }));
                }
            }

            // Gọi callback onCreate với ID course
            await onCreate(courseData.id);

            alert("Khóa học đã được tạo thành công!");
            handleClose();
        } catch (error) {
            console.error("Lỗi upload thumbnail:", error);
            alert("Lỗi khi upload thumbnail. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">
                        {step === 1 ? 'Tạo khóa học mới' : 'Upload ảnh thumbnail'}
                    </h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                {/* Step Indicator */}
                <div className="px-6 pt-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            1
                        </div>
                        <div className={`h-1 flex-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            2
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                        <span>Thông tin cơ bản</span>
                        <span>Ảnh thumbnail</span>
                    </div>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-6 overflow-y-auto">
                    {/* ===== STEP 1: Tạo khóa học ===== */}
                    {step === 1 && (
                        <form id="create-course-form" onSubmit={handleCreateCourse} className="space-y-6">
                            {/* 1. Tiêu đề khóa học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiêu đề khóa học <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Ví dụ: React JS từ cơ bản đến nâng cao"
                                    value={courseFormData.title}
                                    onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})}
                                    disabled={isSaving}
                                    autoFocus
                                />
                            </div>

                            {/* 2. Mô tả khóa học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả khóa học
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Mô tả chi tiết về nội dung khóa học..."
                                    value={courseFormData.description}
                                    onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}
                                    disabled={isSaving}
                                ></textarea>
                            </div>

                            {/* 3. Giá khóa học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giá khóa học (VND)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="0"
                                    value={courseFormData.price}
                                    onChange={(e) => setCourseFormData({...courseFormData, price: parseFloat(e.target.value) || 0})}
                                    disabled={isSaving}
                                    min="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Nhập 0 nếu khóa học miễn phí</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-700">💡 <strong>Thông tin:</strong> Trước tiên hãy tạo khóa học với thông tin cơ bản. Sau đó bạn sẽ upload ảnh thumbnail cho khóa học này.</p>
                            </div>
                        </form>
                    )}

                    {/* ===== STEP 2: Upload Thumbnail ===== */}
                    {step === 2 && (
                        <form id="upload-thumbnail-form" onSubmit={handleSubmitThumbnail} className="space-y-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-700">✅ Khóa học <strong>"{courseFormData.title}"</strong> đã được tạo thành công.</p>
                            </div>

                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Ảnh thumbnail (Tùy chọn)
                                </label>
                                
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
                                    onClick={() => document.getElementById('thumbnail-input').click()}>
                                    {selectedFile ? (
                                        <div className="space-y-3">
                                            <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden border border-gray-200">
                                                <img 
                                                    src={URL.createObjectURL(selectedFile)} 
                                                    alt="preview" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                <p className="font-medium">{selectedFile.name}</p>
                                                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedFile(null);
                                                }}
                                                className="text-xs text-red-600 hover:text-red-700 font-medium">
                                                Xóa ảnh
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="text-4xl">🖼️</div>
                                            <p className="text-sm font-medium text-gray-700">Chọn ảnh thumbnail</p>
                                            <p className="text-xs text-gray-500">Kéo thả hoặc click để chọn ảnh</p>
                                            <p className="text-xs text-gray-400 mt-2">Hỗ trợ: JPG, PNG, WebP (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                                <input 
                                    id="thumbnail-input"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={isSaving}
                                />
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-700">📝 <strong>Lưu ý:</strong> Ảnh thumbnail là tùy chọn. Bạn có thể bỏ qua hoặc thêm sau từ trang chỉnh sửa khóa học.</p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
                    <button 
                        type="button" 
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        disabled={isSaving}
                    >
                        Hủy bỏ
                    </button>

                    {step === 1 && (
                        <button 
                            type="submit" 
                            form="create-course-form"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Đang tạo...' : 'Tiếp tục → Upload Thumbnail'}
                        </button>
                    )}

                    {step === 2 && (
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                disabled={isSaving}
                            >
                                ← Quay lại
                            </button>
                            <button 
                                type="submit" 
                                form="upload-thumbnail-form"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Đang lưu...' : 'Hoàn thành'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCourseModal;