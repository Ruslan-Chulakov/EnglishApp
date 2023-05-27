import { useState } from 'react';
import { nanoid } from 'nanoid';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Input = styled(TextField)`
    margin-bottom: 10px !important;
`;

const WordForm = ({ addWords }) => {
    const [ukrWord, setUkrWord] = useState('');
    const [engWord, setEngWord] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'ukrWord':
                setUkrWord(value);
                break;
            case 'engWord':
                setEngWord(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const word = {
            id: nanoid(),
            ukrWord,
            engWord,
            checked: false,
        };
        addWords(word);
        setUkrWord('');
        setEngWord('');
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", margin: "20px auto", maxWidth: '360px'}}>
            <Input
                label="ukrainian"
                variant="outlined"
                type="text"
                value={ukrWord}
                name="ukrWord"
                onChange={handleChange}
            />
            <Input
                label="english"
                variant="outlined"
                type="text"
                value={engWord}
                name="engWord"
                onChange={handleChange}
            />
            <Button variant="contained" type="submit">add word</Button>
        </form>
    );
};

export default WordForm;
