import { todosStore } from './todosStore'
import { createTodo } from './todoModel'
import { database } from '../Config/firebaseConfig'
import { serviceFactory } from './serviceFactory'

/* export class TodosService {
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

    addTodo(text) {
        const todo = createTodo(text)

        database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })
    }

    removeTodo(id){
        database.collection('todos').doc(id).delete();
    }

    toggleTodo(id, completed){
        database.collection('todos').doc(id).update({completed: !completed});
    }

    editTodo(id, text){
        database.collection('todos').doc(id).update({text: text});
    }

    updateFilter(status){
        this.todosStore.update({ui: {status} });
    }
} */

export const todosService = serviceFactory.createTodoService();

// export const todosService = new TodosService(todosStore)