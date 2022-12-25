import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ITodo } from "../types"

interface TodosState {
    todos: ITodo[]
    loading: boolean
    error: string | null
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
}

export const fetchTodos = createAsyncThunk<ITodo[], void, { rejectValue: string }>(
    'toods/fetchTodos',
    async function (_, { rejectWithValue }) {

        //AXIOS  
        // try {
        //     const response = await axios.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todosd/`)
        //     return response.data
        // } catch (er) {
        //     console.log(er)
        //     return rejectWithValue(`${er}`)
        // }

        //FETCH
        const response = await fetch(`https://jsonplaceholder.typicode.com/todosd/`)
        const data = await response.json()
        if (!response.ok)
            return rejectWithValue(`${response.status}`)
        return data
    }
)

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.loading = false
            })
            .addCase(fetchTodos.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default todosSlice.reducer