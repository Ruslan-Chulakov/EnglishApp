import { useState } from 'react';
import { QuizComponent } from 'components/QuizComponent/QuizComponent';

export const Quiz = ({ words }) => {
    const [start, setStart] = useState(false);

    const handleStartQuiz = () => {
        setStart(prevState => !prevState);
    };

    return (
        <div>
            {!start ? (
                <button onClick={handleStartQuiz}>Start quiz</button>
            ) : (
                <button onClick={handleStartQuiz}>Stop quiz</button>
            )}
            {start && <QuizComponent words={words} />}
        </div>
    );
};
