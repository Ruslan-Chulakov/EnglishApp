import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { deleteWord, editWord, checkWord } from '../../Redux/operations/operations';

const WordsListItem = ({
    id,
    nativeWord,
    foreignWord,
    itemNumber,
    checked,
}) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [editNativeWord, setEditNativeWord] = useState(nativeWord);
    const [editforeignWord, setEditforeignWord] = useState(foreignWord);

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'nativeWord':
                setEditNativeWord(value);
                break;
            case 'foreignWord':
                setEditforeignWord(value);
                break;
            default:
                break;
        }
    };

    const handleDelete = () => {
        dispatch(deleteWord(id));
    };

    const handleEdit = () => {
        setIsEdit(prevState => !prevState);
        if (isEdit) {
            const word = {
                id,
                nativeWord: editNativeWord,
                foreignWord: editforeignWord,
            };
            dispatch(editWord(word));
        }
    };

    const handleCheckWord = () => {
        dispatch(checkWord({
            id,
            checked: !checked,
        }))
    }

    return (
        <li>
            <p>number: {itemNumber}</p>
            <label>
                на вивчення
                <input
                    type="checkbox"
                    onChange={handleCheckWord}
                    checked={checked}
                />
            </label>
            {isEdit ? (
                <>
                    <TextField
                        label="nativeWord"
                        variant="outlined"
                        type="text"
                        value={editNativeWord}
                        name="nativeWord"
                        onChange={handleChange}
                    />
                    <TextField
                        label="english"
                        variant="outlined"
                        type="text"
                        value={editforeignWord}
                        name="foreignWord"
                        onChange={handleChange}
                    />
                </>
            ) : (
                <>
                    <p>native: {nativeWord}</p>
                    <p>foreign: {foreignWord}</p>{' '}
                </>
            )}
            {!isEdit && (
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
            )}
            <button type="button" onClick={handleEdit}>
                Edit
            </button>
        </li>
    );
};
export default WordsListItem;
