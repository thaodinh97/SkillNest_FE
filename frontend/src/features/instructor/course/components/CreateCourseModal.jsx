import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateCourseModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        await onCreate(title); // Gọi hàm tạo từ component cha
        setLoading(false);
        setTitle('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Tạo khóa học mới</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên khóa học
                        </label>
                        <input
                            type="text"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ví dụ: React JS từ cơ bản đến nâng cao"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Đừng lo, bạn có thể đổi tên này sau.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim() || loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
                        >
                            {loading ? 'Đang tạo...' : 'Tiếp tục'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourseModal;