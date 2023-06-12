import { useLocalStorage } from 'hooks/useLocalStaoreage';
import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { SharedLayout } from './sharedLayout/SharedLayout';
import { Home } from 'pages/Home';
import { Quiz } from 'pages/Quiz';
import { useDispatch } from 'react-redux';
import { fetchWords } from 'Redux/operations/operations';


export const App = () => {
    const [words, setWords] = useLocalStorage('words', []);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWords())
    }, [dispatch])

    const addWords = word => {
        setWords(prevState => [word, ...prevState]);
    };

    const deleteWord = id => {
        setWords(prevState => prevState.filter(word => word.id !== id));
    };
    const editWord = editWord => {
        setWords(prevState =>
            prevState.map(word => {
                if (word.id === editWord.id) {
                    return editWord;
                }
                return word;
            })
        );
    };

    const checkWord = (id) => {
        setWords(prevState =>
            prevState.map(word => {
                if (word.id === id) {
                    return {...word, checked: !word.checked}
                }
                return word;
            })
        );
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<SharedLayout />}>
                    <Route index element={<Home
                        addWords={addWords}
                        checkWord={checkWord}
                        words={words}
                        deleteWord={deleteWord}
                        editWord={editWord}
                        />
                    }
                    />
                    <Route path='/quiz' element={<Quiz words={ words } />} />
                </Route>
            </Routes> 
        </>
    );
};
