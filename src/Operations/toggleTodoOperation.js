import { Operation } from './operation';
import { database } from '../Config/firebaseConfig'

export class ToggleTodoOperation extends Operation {

    perform(todo) {
        database.collection('todos').doc(todo.id).update({completed: !todo.completed});
    }
}

export const toggleTodoOperation = new ToggleTodoOperation();