import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://6485bac2a795d24810b73e78.mockapi.io';

export const fetchWords = createAsyncThunk('words/fetchWords', async (_, thunkApi) => {
    try {
        const { data } = await axios.get('/words');
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const addWord = createAsyncThunk('words/addWord', async (newWord, thunkApi) => {
    try {
        const { data } = await axios.post('/words', newWord);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const deleteWord = createAsyncThunk('words/deleteWord', async (id, thunkApi) => {
    try {
        const { data } = await axios.delete(`/words/${id}`);
        return data.id;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
});

export const editWord = createAsyncThunk('words/editWord', async (editedWord, thunkApi) => {
   try {
       const { data } = await axios.put(`/words/${editedWord.id}`, editedWord);
       return data;
   } catch (error) {
        return thunkApi.rejectWithValue(error.message)
   } 
});

export const checkWord = createAsyncThunk('words/checkWord', async (checkedWord, thunkApi) => {
    try {
        const { data } = await axios.put(`words/${checkedWord.id}`, checkedWord);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
});