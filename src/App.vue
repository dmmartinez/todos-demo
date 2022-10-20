<template>
  <header>
    <h1>ToDo's</h1>
    <div class="inputWrapper">
      <input type="text" ref="titleInput" v-model="newTitle" @keyup="newTitleTodo($event)"/>
    </div>
    <div class="markAllComplete">
      <div><input type="checkbox" :disabled="allTodosCompleted" :checked="allTodosCompleted" @change="completeActiveTodos()"/></div>
      <span>Mark all as completed</span>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <footer v-show="todos && todos.length">
    <nav>
      <span v-if="todosActive && todosActive.length">{{ todosActive.length }} {{ itemsLabel }} left</span>
      <RouterLink to="/">All</RouterLink>
      <RouterLink to="/active">Active</RouterLink>
      <RouterLink to="/completed">Completed</RouterLink>
      <a @click="clearCompletedTodos">Clear completed</a>
    </nav>
  </footer>

</template>

<script setup lang="ts">
 import type { Ref } from 'vue'
 import { ref, onMounted } from 'vue'
 import { RouterLink, RouterView } from 'vue-router'
 import { useTodoStore } from '@/stores/todo'
 import { storeToRefs } from 'pinia'
 import { computed } from 'vue'

 const { todos, todosActive, todosCompleted } = storeToRefs(useTodoStore())
 const { fetchTodos, newTodo, completeActiveTodos, clearCompletedTodos } = useTodoStore()
 const titleInput: Ref<HTMLInputElement | null> = ref(null)
 const newTitle: Ref<string> = ref('')
 const allTodosCompleted = computed(() => (todosActive.value.length == 0) && (todosCompleted.value.length == todos.value.length))
 const itemsLabel = computed(() => todosActive.value.length > 1 ? 'items' : 'item')
 const newTitleTodo = async (ev: KeyboardEvent) => {
   if (ev.keyCode === 13 && !!newTitle.value) { // Enter
     await newTodo(newTitle.value)
     newTitle.value = ''
   }
 }

 onMounted(async () => {
   await fetchTodos()
   if (!!titleInput.value && !!titleInput.value) {
     titleInput.value.focus()
   }
 })
</script>

<style scoped>
 header {
   width: 100%;
 }
 header h1 {
   padding: 1rem 0.3rem;
   text-align: center;
 }
 header .inputWrapper {
   width: 20rem;
   margin: 0 auto;
 }
 .inputWrapper input {
   line-height: 1.2rem;
   border: 2px solid rgba(0,0,0,0.6);
   background-color: rgba(250,250,250,1);
   color: rgba(0,0,0,1);
   width: 20rem;
   box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.5);
 }
 .markAllComplete {
   /* display: grid; */
   display: flex;
   flex-direction: row;
   /* grid-template-columns: 1fr 3fr; */
   /* width: 20rem; */
   margin: 0.7rem auto;
 }
 .markAllComplete div {
   margin-left: auto;
   padding: 0 0.5rem;
 }
 .markAllComplete span {
   text-align: left;
   margin-right: auto;
   /* padding: 3rem; */
 }
 footer {
   margin-top: 2rem;
 }
 nav {
   width: 100%;
   font-size: 12px;
   text-align: center;
   margin-top: 2rem;
 }

 nav a.router-link-exact-active {
   color: var(--color-text);
 }

 nav a.router-link-exact-active:hover {
   background-color: transparent;
 }

 nav a {
   display: inline-block;
   padding: 0 1rem;
   border-left: 1px solid var(--color-border);
 }

 nav a:first-of-type {
   border: 0;
 }
</style>
