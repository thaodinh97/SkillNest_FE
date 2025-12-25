const QuizLesson = ({ quiz }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>

            {quiz.questions.map((q, idx) => (
                <div key={idx} className="mb-6">
                    <p className="font-medium">{idx + 1}. {q.question}</p>
                    <ul className="mt-2 space-y-1">
                        {q.options.map((opt, i) => (
                            <li key={i} className="p-2 border rounded hover:bg-gray-100">
                                {opt}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default QuizLesson;
