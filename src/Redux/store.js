import { configureStore } from "@reduxjs/toolkit";
import { wordsReducer } from "./operations/wordsSlice";

const store = configureStore({
    reducer: {
        wordsList: wordsReducer,
    },
});

export default store;