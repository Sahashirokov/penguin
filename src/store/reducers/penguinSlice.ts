import { IPenguin } from '../../models/IPenguin';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';

interface PenguinState {
    penguins: IPenguin[];
    isLoading: boolean;
    error: string;
    count: number;
}

const initialState: PenguinState = {
    penguins: [],
    isLoading: false,
    error: '',
    count: 0
};

export const penguinSlice = createSlice({
    name: 'penguin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IPenguin[]>) => {
                state.isLoading = false;
                state.error = '';
                state.penguins = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    }
});

export default penguinSlice.reducer;