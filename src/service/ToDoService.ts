import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from "../models/ITodo";

export const todoAPI = createApi({
    reducerPath: 'todoAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        fetchTodoUser: build.query<ITodo[], number>({
            query: (userid) => `todos?userId=${userid}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Todo', id } as const)), 'Todo']
                    : [{type:'Todo',id:'LIST'}],
        }),
        addTodo: build.mutation<ITodo, Partial<ITodo>>({
            query: (todo) => ({
                url: 'todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        editTodo: build.mutation<ITodo, ITodo>({
            query: ({ id, ...todo }) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
        }),
        deleteTodo: build.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),
    }),
});

export const { useFetchTodoUserQuery,
    useAddTodoMutation
    , useEditTodoMutation
    , useDeleteTodoMutation
} = todoAPI;
