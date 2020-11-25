import { Operation } from './operation';
import { database } from '../Config/firebaseConfig'

export class ToggleTodoOperation extends Operation {

    async perform(todo) {
        await database.collection('todos').doc(todo.id).update({completed: !todo.completed});
        
        return todo;
    }
}

export const toggleTodoOperation = new ToggleTodoOperation();