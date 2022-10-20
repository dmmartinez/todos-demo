<template>
    <div class="todo" @dblclick="editMode = true">
        <span class="completeCheckbox">
            <input type="checkbox" :disabled="completed"
                   :checked="completed"
                   @change="completeThisTodo()"
            />
        </span>
        <span v-if="props.todo && props.todo.title && !editMode" class="titulo">{{ props.todo.title }}</span>
        <input v-if="props.todo && props.todo.title && editMode" type="text" v-model="newTitle" @keyup="changeTitleThisTodo" />
        <span class="btnWrapper"><span class="deleteBtn"><a @click="removeThisTodo()">X</a></span></span>
    </div>
</template>

<script setup lang="ts">
 import type { Todo } from '../models/todo'
 import type { Ref } from 'vue'
 import { computed, ref } from 'vue'
 import { useTodoStore } from '@/stores/todo'
 interface Props {
     todo: Todo
 }
 const props: Props = defineProps<Props>()
 const editMode: Ref<boolean> = ref(false)
 const newTitle: Ref<string> = ref(props.todo.title)
 const completed = computed(() => !!props.todo.dateCompleted)

 const { changeTitleTodo, completeTodo, removeTodo } = useTodoStore()
 const completeThisTodo = async () => { await completeTodo(props.todo.id) }
 const removeThisTodo = async () => { await removeTodo(props.todo.id) }
 const changeTitleThisTodo = async (ev: KeyboardEvent) => {
     if (editMode.value && newTitle.value && ev.keyCode === 13) {
         await changeTitleTodo(newTitle.value, props.todo.id)
         editMode.value = false
     }
 }

</script>
<style scoped>
 .todo {
     width: 100%;
     display: grid;
     grid-template-columns: 1fr 7fr 1fr;
     background-color: white;
     margin: 0.3rem 0;
 }
 .todo span {
     padding: 0.5rem;
 }
 .completeCheckbox {
     margin: 0 auto;
 }
 .titulo {
     margin: 0 2rem;
     text-align: left;
 }
 .todo .btnWrapper {
     margin: 0 auto;
 }
 .todo .deleteBtn {
     display: none;
 }
 .todo:hover .deleteBtn {
     display: inline;
     width: 5rem;
     margin-left: auto;
     color: red;
 }
 .todo a:hover {
     cursor: pointer;
     background-color: none;
 }
</style>
