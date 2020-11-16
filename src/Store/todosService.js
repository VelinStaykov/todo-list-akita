import { todosStore } from './todosStore'
import { createTodo } from './todoModel'

export function addTodo(text) {
    const todo = createTodo(text)
    todosStore.add(todo);
}

export function removeTodo(id){
    todosStore.remove(id);
}

export function toggleTodo(id, completed){
    todosStore.update(id, {completed: !completed})
}

export function editTodo(id, text){
    console.log(text);
    todosStore.update(id, {text: text})
}

export function updateFilter(status){
    todosStore.update({
        filter: {
            status
        }
    })
}