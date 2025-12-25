import VideoPlayer from "./VideoPlayer";
import TextLesson from "./TextLesson";
import QuizLesson from "./QuizLesson";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedVideo} from "@cloudinary/react";

const LessonContent = ({ currentLesson }) => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dbpnl0o1h'
        }
    })

    if (!currentLesson) {
        return <div className="p-8">Chọn một bài học từ danh mục bên cạnh.</div>;
    }

    const myVideo = cld.video(currentLesson.videoPublicId)

    myVideo
        .format('auto')
        .quality('auto')
    return (
        <div className="flex flex-col">

            {/* Video Player */}
            <div className="relative bg-black">
                <div className="mx-auto max-w-5xl aspect-video">
                    {currentLesson.videoPublicId ? (
                        <AdvancedVideo
                            cldVid={myVideo}
                            controls
                            className="w-full h-full object-contain"
                        />
                    ): (
                        <div className="flex h-full items-center justify-center text-white">
                            Video đang được cập nhật.
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto w-full">
                <h1 className="text-3xl font-extrabold mb-2">{currentLesson.title}</h1>
                <p className="text-gray-500 mb-6">(Thời lượng: {currentLesson.duration || '00:00'})</p>

                <h2 className="text-xl font-bold mb-4 border-b pb-2">Nội dung bài học</h2>
                <div className="prose max-w-none text-gray-700">
                    <p>{currentLesson.content || 'Không có nội dung mô tả cho bài học này.'}</p>
                </div>

                <div className="mt-8 pt-4 border-t">
                    <h3 className="text-xl font-semibold">Tài liệu đính kèm</h3>
                    {/* Component tài liệu... */}
                </div>
            </div>
        </div>
    );
}

 export default LessonContent;
