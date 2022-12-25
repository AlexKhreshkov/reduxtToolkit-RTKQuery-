export interface ITodo {
    userId: number
    id: number
    title: string
    completed: boolean
}
export interface ITodoPatch {
    userId?: number
    id?: number
    title?: string
    completed?: boolean
}

export interface IToggleTodo {
    id?: number
    completed?: boolean
}