import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { ITodo, IToggleTodo } from "../types"

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
        //FETCH
        // const response = await fetch(`https://jsonplaceholder.typicode.com/todosd/`)
        // const data = await response.json()
        // if (!response.ok)
        //     return rejectWithValue(`${response.status}`)
        // return data
        try {
            const response = await axios.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos/`)
            return response.data
        } catch (er) {
            return rejectWithValue(`${er}`)
        }
    }
)

export const toggleTodo = createAsyncThunk<ITodo, { data: IToggleTodo }, { rejectValue: string, state: { todos: TodosState } }>(
    'todos/toggleTodo',
    async ({ data }, { rejectWithValue }) => {
        const id = data.id
        try {
            const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}/`,
                data,
            )
            return response.data
        } catch (err) {
            return rejectWithValue(`${err}`)
        }
    }
)

export const deleteTodo = createAsyncThunk<number, number, { rejectValue: string }>(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}/`)
            return id
        } catch (err) {
            return rejectWithValue(`${err}`)
        }
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
            .addCase(toggleTodo.pending, (state) => {
                state.loading = true
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const todo = state.todos.find(todo => todo.id === action.payload.id)
                if (todo) {
                    todo.completed = !todo.completed
                }
                state.loading = false
            })
            .addCase(toggleTodo.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
                state.loading = false
            })
            .addCase(deleteTodo.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default todosSlice.reducer