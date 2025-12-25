import React, { useState } from 'react';
import { Upload, X, CheckCircle, Video, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { cloudinaryApi } from '../../../../apis/cloudinary';

const VideoUploadWidget = ({ onUploadSuccess, courseId, sectionId, lessonId }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('video/')) {
                alert('Vui lòng chọn file video!');
                return;
            }
            // Giới hạn 100MB (tuỳ chỉnh)
            if (selectedFile.size > 100 * 1024 * 1024) {
                alert('File quá lớn (Max 100MB)');
                return;
            }
            setFile(selectedFile);
            setProgress(0);
            setUploadError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        if (!courseId || !sectionId || !lessonId) {
            setUploadError("Thiếu thông tin khóa học, phần hoặc bài học");
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const signatureRes = await cloudinaryApi.getSignature(courseId, sectionId, lessonId)

            const { signature, timestamp, apiKey, cloudName } = signatureRes.result;
            console.log(signatureRes.result);
            
            const folder = `course/course_${courseId}/section/section_${sectionId}/lesson/lesson_${lessonId}`;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp);
            formData.append('signature', signature);
            formData.append('folder', folder);

            // BƯỚC 3: Gọi trực tiếp Cloudinary API
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

            const uploadRes = await axios.post(cloudinaryUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            });

            // Upload thành công
            const { public_id, secure_url, duration } = uploadRes.data;

            // Trả kết quả về cho Form cha để lưu vào DB
            onUploadSuccess({
                publicId: public_id,
                url: secure_url,
                duration: duration
            });

        } catch (error) {
            console.error("Upload error:", error);
            setUploadError("Lỗi upload. Vui lòng kiểm tra lại mạng hoặc thử lại.");
            setProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setProgress(0);
        onUploadSuccess(null);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Video bài học</label>

            {!file ? (
                /* Giao diện chọn file (Giữ nguyên) */
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">Click để tải video (MP4, WebM)</p>
                    </div>
                    <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                </label>
            ) : (
                /* Giao diện đang upload / đã chọn */
                <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Video size={20} className="text-blue-600" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        </div>
                        {!isUploading && progress < 100 && (
                            <button onClick={handleRemove} className="text-gray-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Thanh Progress */}
                    {(isUploading || progress > 0) && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ${progress === 100 ? 'bg-green-500' : ''}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-xs">
                        {progress === 0 && !isUploading && (
                            <button
                                type="button"
                                onClick={handleUpload}
                                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
                            >
                                Upload Video
                            </button>
                        )}
                        {isUploading && <span className="text-blue-600 animate-pulse">Đang tải lên {progress}%...</span>}
                        {progress === 100 && (
                            <span className="flex items-center gap-1 text-green-600 font-bold">
                                <CheckCircle size={14} /> Hoàn tất
                            </span>
                        )}
                        {uploadError && (
                            <span className="flex items-center gap-1 text-red-500">
                                <AlertCircle size={14} /> {uploadError}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoUploadWidget;