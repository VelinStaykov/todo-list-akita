import { todosStore } from './todosStore'
import { createTodo } from './todoModel'
import { database } from '../Config/firebaseConfig'

export class TodosService {
    constructor(todosStore) {
        this.todosStore = todosStore;
    }
    
    setTodos() {
        database.collection('todos').onSnapshot((querySnapshot) => {
            
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

            this.todosStore.set(todos);
            this.todosStore.setLoading(false);
        });
    }

    async addTodo(text) {
        const todo = createTodo(text)

        await database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })

        return todo;
    }

    removeTodo(todo){
        database.collection('todos').doc(todo.id).delete();
    }

    toggleTodo(todo){
        database.collection('todos').doc(todo.id).update({completed: !todo.completed});
    }

    editTodo(todo, text){
        database.collection('todos').doc(todo.id).update({text: text});
    }

    updateFilter(status){
        this.todosStore.update({ui: {status} });
    }
}

export const todosService = new TodosService(todosStore)