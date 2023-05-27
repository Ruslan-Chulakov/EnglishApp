import { useState } from 'react';
import { QuizComponent } from 'components/QuizComponent/QuizComponent';

export const Quiz = ({ words }) => {
    const [start, setStart] = useState(false);

    const handleStartQuiz = () => {
        setStart(prevState => !prevState);
    };

    return (
        <div>
            <button onClick={handleStartQuiz}>button</button>
            {start && <QuizComponent words={words} />}
        </div>
    );
};
