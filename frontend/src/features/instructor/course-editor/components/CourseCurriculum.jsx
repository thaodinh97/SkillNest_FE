import React, { useState } from 'react';
import { Plus, GripVertical, Pencil, Trash2, Video, FileText } from 'lucide-react';
import AddLessonModal from './AddLessonModal';
import { lessonApi } from '@/apis/lesson';
import { sectionApi } from '../../../../apis/section';

const CourseCurriculum = ({ course, onUpdate }) => {
    const [isLessonModalOpen, setLessonModalOpen] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const handleOpenAddLesson = (sectionId) => {
        setSelectedSectionId(sectionId);
        setLessonModalOpen(true);
    };
    const handleAddSection = async () => {
        const title = prompt("Nhập tên chương mới:");
        if (title) {
            try {
                await sectionApi.createSection(course.id, title)
                if (onUpdate && typeof onUpdate === 'function') {
                    onUpdate();
                }
                alert("Thêm chương thành công!");
            } catch (error) {
                console.error("Lỗi tạo chương:", error);
                alert("Lỗi khi tạo chương. Vui lòng thử lại.");
            }
        }
    };

    const handleSaveLesson = async (payload) => {
        try {
            console.log("Saving lesson:", payload);
            if (onUpdate && typeof onUpdate === 'function') {
                onUpdate();
            }
            alert("Thêm bài học thành công!");
        } catch (error) {
            console.error("Lỗi lưu bài học:", error);
            alert("Lỗi khi lưu bài học");
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Nội dung khóa học</h2>
                <button
                    onClick={handleAddSection}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition"
                >
                    <Plus size={20} /> Thêm chương
                </button>
            </div>

            {/* Danh sách Sections */}
            <div className="space-y-4">
                {course.sections && course.sections.length > 0 ? (
                    course.sections.map((section, index) => (
                        <SectionItem
                            key={section.id}
                            section={section}
                            index={index}
                            onUpdate={onUpdate}
                            onAddLesson={() => handleOpenAddLesson(section.id)}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">Chưa có nội dung nào. Hãy thêm chương đầu tiên.</p>
                    </div>
                )}
                <AddLessonModal 
                    isOpen={isLessonModalOpen}
                    onClose={() => setLessonModalOpen(false)}
                    onSave={handleSaveLesson}
                    courseId={course.id}
                    sectionId={selectedSectionId}
                />
            </div>
        </div>
    );
};

// Component con hiển thị 1 Section
const SectionItem = ({ section, index, onUpdate, onAddLesson }) => {

    const handleAddLesson = () => {
        onAddLesson();
    };

    const handleEditSection = async () => {
        const newTitle = prompt("Chỉnh sửa tên chương:", section.title);
        if (newTitle && newTitle !== section.title) {
            try {
                await sectionApi.updateSection(section.id, newTitle);
                if (onUpdate && typeof onUpdate === 'function') {
                    onUpdate();
                }
                alert("Chỉnh sửa chương thành công!");
            } catch (error) {
                console.error("Lỗi chỉnh sửa chương:", error);
                alert("Lỗi khi chỉnh sửa chương");
            }
        }
    };

    const handleDeleteSection = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa chương này? Tất cả bài học sẽ bị xóa.")) {
            try {
                await sectionApi.deleteSection(section.id);
                if (onUpdate && typeof onUpdate === 'function') {
                    onUpdate();
                }
                alert("Xóa chương thành công!");
            } catch (error) {
                console.error("Lỗi xóa chương:", error);
                alert("Lỗi khi xóa chương");
            }
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
            try {
                await lessonApi.deleteLesson(lessonId);
                if (onUpdate && typeof onUpdate === 'function') {
                    onUpdate();
                }
                alert("Xóa bài học thành công!");
            } catch (error) {
                console.error("Lỗi xóa bài học:", error);
                alert("Lỗi khi xóa bài học");
            }
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
            {/* Header của Section */}
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
                <div className="flex items-center gap-3 flex-1">
                    <span className="font-bold text-gray-500">S{index + 1}:</span>
                    <span className="font-semibold text-gray-800">{section.title}</span>
                    <button onClick={handleEditSection} className="text-gray-400 hover:text-blue-600">
                        <Pencil size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleAddLesson}
                        className="text-xs flex items-center gap-1 bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50"
                    >
                        <Plus size={14} /> Bài học
                    </button>
                    <button onClick={handleDeleteSection} className="text-gray-400 hover:text-red-600 p-1">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Danh sách Lessons trong Section */}
            <div className="p-2 space-y-2 bg-white">
                {section.lessons && section.lessons.length > 0 ? (
                    section.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 group transition">
                            <div className="flex items-center gap-3">
                                <GripVertical size={16} className="text-gray-300 cursor-move" />
                                {lesson.type === 'VIDEO' ? <Video size={16} className="text-blue-500"/> : <FileText size={16} className="text-orange-500"/>}
                                <span className="text-sm text-gray-700">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                <span className="text-xs text-gray-400 mr-2">{lesson.duration || '00:00'}</span>
                                <button className="p-1 text-gray-500 hover:text-blue-600"><Pencil size={14}/></button>
                                <button onClick={() => handleDeleteLesson(lesson.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-gray-400 italic">
                        Chưa có bài học nào trong chương này.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCurriculum;