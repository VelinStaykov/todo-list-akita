import { todosStore } from './todosStore'
import { createTodo } from './todoModel'
import { database } from '../Config/firebaseConfig'

const todosCollection = database.collection('todos')

export function setTodos() {
    todosCollection.onSnapshot((querySnapshot) => {
        
        let todos = [];
        
        querySnapshot.forEach((document) => {
            
            const { text, completed } = document.data()

            const todo = {
                id: document.id,
                text: text,
                completed: completed
            }

            todos.push(todo)
        })

        todosStore.set(todos);
    });
}

export function addTodo(text) {
    todosCollection.add(
        createTodo(text)
    );
}

export function removeTodo(id){
    todosCollection.doc(id).delete();
}

export function toggleTodo(id, completed){
    todosCollection.doc(id).update({completed: !completed});
}

export function editTodo(id, text){
    todosCollection.doc(id).update({text: text});
}

export function updateFilter(status){
    todosStore.update({filter: {status} });
}