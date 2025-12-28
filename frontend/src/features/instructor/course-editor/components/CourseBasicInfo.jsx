import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'react-toastify';
// import instructorApi from '@/services/instructorApi';

const CourseBasicInfo = ({ course, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailUrl: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                thumbnailUrl: course.thumbnailUrl || ''
            });
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {

            await new Promise(r => setTimeout(r, 800));
            onUpdate(); // Refresh lại data ở component cha
            toast.success('Đã lưu thông tin!');
        } catch (error) {
            toast.error(`Lỗi ${error}`)
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-3xl">
            <h2 className="text-xl font-bold mb-6">Thông tin khóa học</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề khóa học</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                    <textarea
                        rows={5}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Bạn sẽ học được gì trong khóa học này..."
                    />
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa khóa học</label>
                    <div className="flex items-center gap-6">
                        <div className="w-64 h-36 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {formData.thumbnailUrl ? (
                                <img src={formData.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-sm">Chưa có ảnh</span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Upload file ảnh (jpg, png). Kích thước chuẩn 16:9.</p>
                            <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 inline-flex items-center gap-2">
                                <Upload size={16} />
                                <span>Tải ảnh lên</span>
                                <input type="file" className="hidden" />
                                {/* Xử lý onChange upload file tại đây */}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseBasicInfo;