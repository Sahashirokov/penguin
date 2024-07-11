import axios from "axios";
import {IPenguin} from "../../models/IPenguin";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITodo} from "../../models/ITodo";


export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async(_,thunkAPI)=>
    {
        try {
            const response =await axios.get<IPenguin[]>("https://jsonplaceholder.typicode.com/users");
            return response.data;
        }
        catch(e)
        {
            return thunkAPI.rejectWithValue("Error fetching users");
        }

    }
)
export const fetchTodos = createAsyncThunk<ITodo[], number>(
    'todos/fetchTodos',
    async (userId,thunkAPI) => {
        try {
            const response = await axios.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
            return response.data;
        }
        catch (e)
        {
            return thunkAPI.rejectWithValue("Error fetching users");
        }

    }
);

export const addTodo = createAsyncThunk<ITodo, Partial<ITodo>>(
    'todos/addTodo',
    async (todo) => {
        let cachesid = todo.id;
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',todo);
       let data:ITodo =response.data as ITodo;
        if (cachesid != null) {
            data.id = cachesid;
        }
        return data;
    }
);

export const editTodo = createAsyncThunk<ITodo, ITodo>(
    'todos/editTodo',
    async (updatedTodo) => {
        const { id, ...todo } = updatedTodo;

        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,todo);
            if (!response) {
                throw new Error('Failed to update todo');
            }

            return await response.data;
        } catch (error) {
            throw new Error('Error updating todo: ' );
        }
    }
);
export const toggleTodoCompleted = createAsyncThunk<ITodo, ITodo>(
    'todos/toggleTodoCompleted',
    async (todo)=>
    {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,{
            ...todo,
            completed:!todo.completed,

            })
        return response.data;
    });

export const deleteTodo = createAsyncThunk<number, number>(
    'todos/deleteTodo',
    async (id) => {
        await axios.delete<ITodo[]>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });
        return id;
    }
);
