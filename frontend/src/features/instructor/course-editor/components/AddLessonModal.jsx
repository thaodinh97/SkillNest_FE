import React, { useState } from 'react';
import VideoUploadWidget from './VideoUploadWidget';
import { lessonApi } from '@/apis/lesson';
import { courseApi } from '@/apis/course';

const AddLessonModal = ({ isOpen, onClose, onSave, courseId, sectionId }) => {
    // Step 1: Form dữ liệu bài học (không có video)
    const [lessonFormData, setLessonFormData] = useState({
        title: '',
        content: '',
        order: 1
    });

    // Step 2: Dữ liệu video sau khi tạo lesson
    const [lessonData, setLessonData] = useState({
        id: null,
        videoUrl: null,
        videoPublicId: null,
        duration: 0
    });

    const [step, setStep] = useState(1); // 1: Create Lesson, 2: Upload Video
    const [isSaving, setIsSaving] = useState(false);

    // Reset form khi đóng modal
    const handleClose = () => {
        setLessonFormData({ title: '', content: '', order: 1 });
        setLessonData({ id: null, videoUrl: null, videoPublicId: null, duration: 0 });
        setStep(1);
        onClose();
    };

    // Step 1: Tạo lesson với dữ liệu cơ bản
    const handleCreateLesson = async (e) => {
        e.preventDefault();

        if (!lessonFormData.title.trim()) {
            alert("Vui lòng nhập tiêu đề bài học");
            return;
        }

        setIsSaving(true);
        try {
            const response = await lessonApi.createLesson(
                sectionId,
                lessonFormData.title,
                'VIDEO',
                lessonFormData.content || "",
                lessonFormData.order
            );
            
            setLessonData(prev => ({
                ...prev,
                id: response.result.id
            }));
            
            console.log("Created lesson with ID:", response.result.id);
            alert("Tạo bài học thành công! Bây giờ hãy upload video.");
            setStep(2); // Chuyển sang bước upload video
        } catch (error) {
            console.error("Lỗi tạo bài học:", error);
            alert("Lỗi khi tạo bài học. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    // Step 2: Callback nhận dữ liệu từ Widget khi upload xong
    const handleVideoUploadSuccess = (data) => {
        if (data) {
            setLessonData(prev => ({
                ...prev,
                videoUrl: data.url,
                videoPublicId: data.publicId,
                duration: data.duration
            }));
        } else {
            // Trường hợp user xóa video
            setLessonData(prev => ({ ...prev, videoUrl: null, videoPublicId: null, duration: 0 }));
        }
    };

    const handleSubmitVideo = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        try {
            // Update lesson với video information
            await lessonApi.updateLesson(lessonData.id, {
                videoUrl: lessonData.videoUrl,
                videoPublicId: lessonData.videoPublicId
            });

            // Gọi onSave callback để component cha biết
            const finalPayload = {
                id: lessonData.id,
                sectionId: sectionId,
                title: lessonFormData.title,
                content: lessonFormData.content,
                videoUrl: lessonData.videoUrl,
                videoPublicId: lessonData.videoPublicId,
                duration: lessonData.duration
            };
            await onSave(finalPayload);

            alert("Bài học đã được tạo thành công!");
            handleClose();
        } catch (error) {
            console.error("Lỗi cập nhật video:", error);
            alert("Lỗi khi cập nhật video. Vui lòng thử lại.");
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
                        {step === 1 ? 'Thêm bài học mới' : 'Upload video bài học'}
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
                        <span>Tạo bài học</span>
                        <span>Upload video</span>
                    </div>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-6 overflow-y-auto">
                    {/* ===== STEP 1: Tạo bài học ===== */}
                    {step === 1 && (
                        <form id="create-lesson-form" onSubmit={handleCreateLesson} className="space-y-6">
                            {/* 1. Tiêu đề bài học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề bài học <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Ví dụ: Giới thiệu về React Hooks"
                                    value={lessonFormData.title}
                                    onChange={(e) => setLessonFormData({...lessonFormData, title: e.target.value})}
                                    disabled={isSaving}
                                />
                            </div>

                            {/* 2. Thứ tự bài học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự bài học</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="1"
                                    value={lessonFormData.order}
                                    onChange={(e) => setLessonFormData({...lessonFormData, order: parseInt(e.target.value) || 1})}
                                    disabled={isSaving}
                                    min="1"
                                />
                            </div>

                            {/* 3. Mô tả bài học */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả bài học</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Tóm tắt nội dung bài học..."
                                    value={lessonFormData.content}
                                    onChange={(e) => setLessonFormData({...lessonFormData, content: e.target.value})}
                                    disabled={isSaving}
                                ></textarea>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-700">💡 <strong>Thông tin:</strong> Trước tiên hãy tạo bài học với thông tin cơ bản. Sau đó bạn sẽ upload video cho bài học này.</p>
                            </div>
                        </form>
                    )}

                    {/* ===== STEP 2: Upload Video ===== */}
                    {step === 2 && (
                        <form id="upload-video-form" onSubmit={handleSubmitVideo} className="space-y-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-700">✅ Bài học <strong>"{lessonFormData.title}"</strong> đã được tạo thành công.</p>
                            </div>

                            {/* Video Upload Widget */}
                            <VideoUploadWidget 
                                onUploadSuccess={handleVideoUploadSuccess}
                                courseId={courseId}
                                sectionId={sectionId}
                                lessonId={lessonData.id}
                            />

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-700">📝 <strong>Lưu ý:</strong> Video là tùy chọn. Bạn có thể bỏ qua nếu chưa sẵn sàng upload. Có thể thêm video sau từ trang chỉnh sửa bài học.</p>
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
                            form="create-lesson-form"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Đang tạo...' : 'Tiếp tục → Upload Video'}
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
                                form="upload-video-form"
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

export default AddLessonModal;