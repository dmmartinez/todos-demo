export interface Todo {
    id: number
    title: string
    dateCreated: Date
    dateCompleted: Date | null
}

export interface TodoId {
    id: number
}
