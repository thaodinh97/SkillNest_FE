const TextLesson = ({ content }) => {
    return (
        <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default TextLesson;
