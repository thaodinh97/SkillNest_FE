import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import CourseTable from "../components/CourseTable";
import { useCourseForm } from "../hooks/useCourseForm";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import CourseForm from "../components/CourseForm";

export default function AdminCoursePage() {
    const [openDialog, setOpenDialog] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    const { courses, loading, error, refetch, deleteCourse } = useCourses();
    const {formData, loading: formLoading, error: formError, handleChange, handleSubmit, setFormData} = useCourseForm()

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true)
        setFormData({ title: "", price: 0, description: "", instructorId: "" });
        setEditingCourse(null)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
        setEditingCourse(null)
    }
    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData(course)
        setOpenDialog(true);
    };
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
            const res = await deleteCourse(id);
            if (res.code === 1000) {
                showNotification('Xóa khóa học thành công');
                refetch()
            } else {
                showNotification(res.error, 'error');
            }
        }
    };
    const handleFormSubmit = async (e, id) => {
        const res = await handleSubmit(e, id);
        if (res.success) {
            showNotification(editingCourse ? "Cập nhật thành công" : "Thêm mới thành công");
            handleCloseDialog();
            refetch();
        } else {
            showNotification(res.error, "error");
        }
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold mb-4">Quản lí khóa học</h1>
                <button 
                    onClick={handleOpenDialog}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                    Thêm Khóa Học
                </button>
            </div>

            <div className="mt-6">
                {
                    loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Đang tải danh sách khóa học...</p>
                        </div>
                    ): (
                        <CourseTable 
                            courses={courses}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )
                }

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle>
                            {editingCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
                        </DialogTitle>
                        <DialogDescription>
                            Điền thông tin chi tiết về khóa học vào biểu mẫu bên dưới.
                        </DialogDescription>
                        </DialogHeader>

                        <CourseForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleFormSubmit}
                            course={editingCourse}
                        />

                        <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>

                {notification.show && (
                    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
                    notification.type === 'error' 
                        ? 'bg-red-100 text-red-700 border-l-4 border-red-500' 
                        : 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    }`}>
                    {notification.message}
                </div>
                )}
            </div>
        </div>
    )
}