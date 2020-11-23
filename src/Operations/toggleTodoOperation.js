import { Operation } from './operation';
import { database } from '../Config/firebaseConfig'

export class ToggleTodoOperation extends Operation {

    perform(id, completed) {
        database.collection('todos').doc(id).update({completed: !completed});
    }
}

export const toggleTodoOperation = new ToggleTodoOperation();