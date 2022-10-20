<template>
  <div class="todos">
    <TodoComponent v-for="todo in showingTodos" :key="todo.id" :todo="todo"></TodoComponent>
  </div>
</template>
<script setup lang="ts">
 import type { Todo } from '@/models/todo'
 import { useTodoStore } from '@/stores/todo'
 import { storeToRefs } from 'pinia'
 import TodoComponent from '@/components/TodoComponent.vue'
 import { computed } from 'vue'

 interface Props {
   filter: string
 }
 const props: Props = withDefaults(defineProps<Props>(), {
   filter: 'all'
 })
 const { todos, todosActive, todosCompleted } = storeToRefs(useTodoStore())

 const showingTodos = computed<Todo[]>(() => {
   switch(props.filter) {
     case 'all':
       return todos.value
     case 'active':
       return todosActive.value
     case 'completed':
       return todosCompleted.value
     default:
       return todos.value
   }
 })
</script>

<style>
 .todos {
   margin: 2rem 0;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 @media (min-width: 1024px) {
   .todos {
     margin: 0.5rem 0;
     display: flex;
     flex-direction: column;
     align-items: left;
   }
 }
</style>
