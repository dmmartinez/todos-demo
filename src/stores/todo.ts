import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '../models/todo'
import axios from 'axios'
import type { AxiosInstance } from 'axios'

const restURL: string = 'http://localhost:3000/todos'
const httpClient: AxiosInstance = axios.create({
  baseURL: restURL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export const useTodoStore = defineStore('todo', () => {
  const todos: Ref<Todo[]> = ref([])
  // const todosCompleted: Ref<Todo[]> = computed(() => todos.value.filter((t) => !!t.dateCompleted))
  // const todosActive: Ref<Todo[]> = computed(() => todos.value.filter((t) => !t.dateCompleted))
  const todosCompleted = computed(() => todos.value.filter((t) => !!t.dateCompleted))
  const todosActive = computed(() => todos.value.filter((t) => !t.dateCompleted))


  const fetchTodos = async (): Promise<Todo[]> => {
    const { data } = await httpClient.get('')
    todos.value = data
    return todos.value
  }

  const newTodo = async (title: string): Promise<void> => {
    const tmptodo: Todo = {
      id: 0,
      title,
      dateCreated: new Date(),
      dateCompleted: null,
    }
    const { data } = await httpClient.post('', tmptodo)

    todos.value.push(data)
  }
  const changeTitleTodo = async (ntitle: string, tid: number): Promise<void> => {
    const index: number | undefined = todos.value.findIndex((todo) => todo.id === tid)
    if (index >= 0) {
      const updtodo = { ...todos.value[index], title: ntitle }
      const { data } = await httpClient.patch('/' + tid, updtodo)
      todos.value[index] = data
    }
  }
  const completeTodo = async (tid: number): Promise<void> => {
    const index: number | undefined = todos.value.findIndex((todo) => todo.id === tid)
    if (index >= 0) {
      const now = new Date()
      const updtodo = { ...todos.value[index], dateCompleted: now }
      const { data } = await httpClient.patch('/' + tid, updtodo)
      todos.value[index] = data
    }
  }
  const removeTodo = async (tid: number): Promise<void> => {
    const index: number | undefined = todos.value.findIndex((todo) => todo.id === tid)
    if (index >= 0) {
      await httpClient.delete('/' + tid)
      todos.value = todos.value.filter((t) => t.id != tid)
    }
  }
  const completeActiveTodos = async (): Promise<Todo[]> => {
    const now = new Date()
    const promises: Promise<Todo>[] = []
    todosActive.value.forEach((todo: Todo) => {
      promises.push(httpClient.patch('/' + todo.id, { ...todo, dateCompleted: now }))
    })
    todos.value = todos.value.map((todo: Todo) => !todo.dateCompleted ? { ...todo, dateCompleted: now } : todo)
    return Promise.all(promises)
  }
  const clearCompletedTodos = async (): Promise<void> => {
    const promises: Promise<void>[] = []
    todosCompleted.value.forEach((todo: Todo) => {
      promises.push(httpClient.delete('/' + todo.id))
    })
    todos.value = todos.value.filter((todo) => !todo.dateCompleted)
    await Promise.all(promises)
  }

  return { todos, todosCompleted, todosActive, fetchTodos, newTodo, changeTitleTodo,
           completeTodo, removeTodo, completeActiveTodos, clearCompletedTodos }
})
