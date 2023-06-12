import { useEffect, useState } from 'react';
import shuffle from 'lodash.shuffle';
import { useDispatch } from 'react-redux';

const getRandomIntegetFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const QuizComponent = ({ words, filteredWords, attemptsQuantity }) => {
    const dispatch = useDispatch()
    const [checkedWords, setCheckedWords] = useState(filteredWords);
    const [randomWord, setRandomWord] = useState(
        checkedWords[getRandomIntegetFromInterval(0, checkedWords.length - 1)]
    );
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [attempts, setAttempts] = useState(attemptsQuantity);

    const variants = getVariants();
     

    useEffect(() => {
        setRandomWord(
            checkedWords[
            getRandomIntegetFromInterval(0, checkedWords.length - 1)
            ]
        );
    }, [dispatch, checkedWords]);

    useEffect(() => {
        if (attempts === 0) {
            console.log('asddfasdf');
            setCheckedWords(filterdWords(words));
        }
    },[attempts, words])


  

    function filterdWords(words) {
        return words.filter(word => word.checked);
    }

    function getVariants() {
        const variants = new Array(4).fill(null).reduce((acc, _, index) => {
            if (!index) {
                return [randomWord];
            }
            const random =
                words[getRandomIntegetFromInterval(0, words.length - 1)];
            if (acc.every(item => item?.id !== random?.id)) {
                return [...acc, random];
            } else {
                let word = null;
                for (let item of words) {
                    if (acc.every(word => word?.id !== item?.id)) {
                        word = item;
                        break;
                    }
                }
                return [...acc, word];
            }
        }, []);

        return shuffle(variants);
    }

    const handleVariant = e => {
        const ansverId = e.target.value;
        const trueAnsverId = randomWord.id;

        if (ansverId === trueAnsverId) {
            setCheckedWords(checkedWords.filter(({ id }) => id !== ansverId));
            setCorrect(correct + 1);
        } else {
            setWrong(wrong + 1);
        }
        setAttempts(attempts - 1);
    };
    
    const handleRefresh = () => {
        setAttempts(attemptsQuantity);
        setCorrect(0);
        setWrong(0)
    }

    return (
        <div>
            {attempts !== 0 && (
                <>
                    <h2>{randomWord.nativeWord}</h2>
                    <p>{`спроб: ${attempts}`}</p>
                </>
            )}

            <p>{`вірних відповідей: ${correct} / помилок: ${wrong}`}</p>

            {attempts !== 0 &&
                variants.map(({ foreignWord, id }) => (
                    <button
                        key={id}
                        value={id}
                        onClick={handleVariant}
                        type="button"
                    >
                        {foreignWord}
                    </button>
                ))}
            {attempts === 0 && (
                <button onClick={handleRefresh} type="button">
                    Ще раз
                </button>
            )}
        </div>
    );
};
