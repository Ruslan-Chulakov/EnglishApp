import { useState } from 'react';
import { QuizComponent } from 'components/QuizComponent/QuizComponent';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
import { selectCheckedWords, selectWords } from 'Redux/selectors';
import { useEffect } from 'react';

export const Quiz = () => {
    const words = useSelector(selectWords);
    const checkedWords = useSelector(selectCheckedWords);
    const [start, setStart] = useState(false);
    const [attempts, setAttempts] = useState('');

    useEffect(() => {
        setAttempts(checkedWords.length);
    }, [checkedWords]);


    const handleChange = event => {
        setAttempts(event.target.value);
    };

    const handleStartQuiz = () => {
        setStart(prevState => !prevState);
    };

    return (
        <div>
            {!start ? (
                <Box sx={{ maxWidth: 120 }}>
                    <FormControl fullWidth>
                        {attempts > 0 ? (
                            <>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={attempts}
                                    label="Attempts"
                                    onChange={handleChange}
                                    title="depends of checked words quantity"
                                >
                                    {checkedWords.map((word, index) => {
                                        return (
                                            <MenuItem
                                                key={word.id}
                                                value={index + 1}
                                            >
                                                {index + 1}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <button onClick={handleStartQuiz}>
                                    Start quiz
                                </button>
                            </>
                        ) : (
                                <p>please select some words </p>
                        )}
                    </FormControl>
                </Box>
            ) : (
                <button onClick={handleStartQuiz}>Stop quiz</button>
            )}
            {start && (
                <QuizComponent
                    words={words}
                    filteredWords={checkedWords}
                    attemptsQuantity={attempts}
                />
            )}
        </div>
    );
};
