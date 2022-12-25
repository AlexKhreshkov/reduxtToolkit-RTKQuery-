import { createSlice } from "@reduxjs/toolkit"
import { ITodo } from "../types"

interface TodosState {
    todos: ITodo[]
    loading: boolean
    error: string
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: "",
}

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
})

export default todosSlice.reducer