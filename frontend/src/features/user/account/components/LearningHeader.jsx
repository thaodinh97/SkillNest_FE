const LearningHeader = ({currentLesson}) => {
    return (
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b shadow-sm">
            <div className="flex items-center gap-4">
                <a href="/account/my-courses" className="text-blue-600 font-medium hover:underline">
                    ← Quay lại khóa học
                </a>
            </div>

        </header>
    )
}
export default LearningHeader;