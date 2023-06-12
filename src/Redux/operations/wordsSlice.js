import { createSlice } from '@reduxjs/toolkit';
import {
    addWord,
    checkWord,
    deleteWord,
    editWord,
    fetchWords,
} from './operations';

const initialState = {
    words: [],
    checkedWords: [],
    isLoading: false,
    error: null,
};

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchWords.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchWords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.words = action.payload;
                state.checkedWords = action.payload.filter(
                    ({ checked }) => checked
                );
            })
            .addCase(fetchWords.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(addWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.words.push(action.payload);
            })
            .addCase(addWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.words.findIndex(
                    ({ id }) => id === action.payload
                );
                state.words.splice(index, 1);
                // const indexChecked = state.checked.filter()
                state.checkedWords = state.words.filter(
                    ({ id, checked }) => id !== action.payload.id && checked
                );
            })
            .addCase(deleteWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(editWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.words.findIndex(
                    ({ id }) => id === action.payload.id
                );
                state.words.splice(index, 1, action.payload);
            })
            .addCase(editWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(checkWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.words.findIndex(
                    ({ id }) => id === action.payload.id
                );
                state.words.splice(index, 1, action.payload);
                state.checkedWords = state.words.filter(
                    ({ checked }) =>  checked
                );
                          
            })
            .addCase(checkWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const wordsReducer = wordsSlice.reducer;
