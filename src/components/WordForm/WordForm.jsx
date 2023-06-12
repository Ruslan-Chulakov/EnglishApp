import { useState } from 'react';
// import { nanoid } from 'nanoid';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addWord } from 'Redux/operations/operations';
import { useDispatch } from 'react-redux';

const Input = styled(TextField)`
    margin-bottom: 10px !important;
`;

const WordForm = () => {
    const dispatch = useDispatch();
    const [nativeWord, setNativeWord] = useState('');
    const [foreignWord, setForeignWord] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'nativeWord':
                setNativeWord(value);
                break;
            case 'foreignWord':
                setForeignWord(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const word = {
            nativeWord,
            foreignWord,
            checked: false,
        };
        dispatch(addWord(word));
        setNativeWord('');
        setForeignWord('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '20px auto',
                maxWidth: '360px',
            }}
        >
            <Input
                label="native word"
                variant="outlined"
                type="text"
                value={nativeWord}
                name="nativeWord"
                onChange={handleChange}
            />
            <Input
                label="foreign word"
                variant="outlined"
                type="text"
                value={foreignWord}
                name="foreignWord"
                onChange={handleChange}
            />
            <Button variant="contained" type="submit">
                add word
            </Button>
        </form>
    );
};

export default WordForm;
