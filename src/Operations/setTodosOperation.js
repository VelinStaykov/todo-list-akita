import { Operation } from './operation';
import {todosStore} from '../Store/todosStore'
import { database } from '../Config/firebaseConfig'

export class SetTodosOperation extends Operation {

    constructor(todosStore) {
        super()
        this.todosStore = todosStore
    }

    perform() {
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
}

export const setTodosOperation = new SetTodosOperation(todosStore)