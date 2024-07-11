import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchTodos, addTodo, editTodo, deleteTodo, toggleTodoCompleted} from './ActionCreators';
import {ITodo} from "../../models/ITodo";

interface TodoState {
    todos: ITodo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,

};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos';
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                console.log(`addcase ${action.payload.id}`);
                state.todos.push(action.payload);
            })
            .addCase(editTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(toggleTodoCompleted.fulfilled, (state, action: PayloadAction<ITodo>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                    if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
    },
});

export default todoSlice.reducer;