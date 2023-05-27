import { useState } from 'react';
import TextField from '@mui/material/TextField';

const WordsListItem = ({
    id,
    ukrWord,
    engWord,
    itemNumber,
    deleteWord,
    editWord,
    checked,
    checkWord,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editUkrWord, setEditUkrWord] = useState(ukrWord);
    const [editEngWord, setEditEngWord] = useState(engWord);

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'ukrWord':
                setEditUkrWord(value);
                break;
            case 'engWord':
                setEditEngWord(value);
                break;
            default:
                break;
        }
    };

    const edit = () => {
        setIsEdit(prevState => !prevState);
        if (isEdit) {
            const word = {
                id,
                ukrWord: editUkrWord,
                engWord: editEngWord,
            };
            editWord(word);
        }
    };

    return (
        <>
            <li>
                <p>number: {itemNumber}</p>
                <label>
                    на вивчення
                    <input type="checkbox" onChange={() => checkWord(id)} checked={checked} />
                </label>
                {isEdit ? (
                    <>
                        <TextField
                            label="ukrainian"
                            variant="outlined"
                            type="text"
                            value={editUkrWord}
                            name="ukrWord"
                            onChange={handleChange}
                        />
                        <TextField
                            label="english"
                            variant="outlined"
                            type="text"
                            value={editEngWord}
                            name="engWord"
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <>
                        <p>українська: {ukrWord}</p>
                        <p>англійська: {engWord}</p>{' '}
                    </>
                )}
                <button type="button" onClick={() => deleteWord(id)}>
                    Delete
                </button>
                <button type="button" onClick={() => edit()}>
                    Edit
                </button>
            </li>
        </>
    );
};
export default WordsListItem;
