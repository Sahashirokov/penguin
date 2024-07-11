import { configureStore } from '@reduxjs/toolkit';
import { RootState, AppDispatch} from "../store/store";
import {penguinSlice} from "../store/reducers/penguinSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer:{
        penguin:penguinSlice.reducer
    }
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;