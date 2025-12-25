import React, { useState } from 'react';

const CourseSettings = ({ course, onUpdate }) => {
    const [price, setPrice] = useState(course.price || 0);
    const [isPublished, setIsPublished] = useState(course.isPublished || false);

    const handleSave = () => {
        // API update logic
        console.log("Saving settings:", { price, isPublished });
        onUpdate();
    };

    return (
        <div className="p-8 max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Cài đặt khóa học</h2>

            <div className="space-y-8">
                {/* Giá bán */}
                <div className="bg-white border p-6 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Học phí</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-2.5 text-gray-500">₫</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="0"
                            />
                        </div>
                        <span className="text-sm text-gray-500">VND</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Nhập 0 để thiết lập khóa học Miễn phí.</p>
                </div>

                {/* Trạng thái Publish */}
                <div className="bg-white border p-6 rounded-lg flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-gray-900">Trạng thái phát hành</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {isPublished
                                ? 'Khóa học đang hiển thị công khai cho học viên.'
                                : 'Khóa học đang ở chế độ nháp (Draft).'}
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
                >
                    Lưu cài đặt
                </button>
            </div>
        </div>
    );
};

export default CourseSettings;