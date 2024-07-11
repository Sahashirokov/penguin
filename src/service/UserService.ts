import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IPenguin} from "../models/IPenguin";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk<IPenguin[], number>(
    'penguin/fetchUsers',
    async (limit) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        return await response.json();
    }
);
