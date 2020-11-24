import { Operation } from './operation';
import { database } from '../Config/firebaseConfig'

export class EditTodoOperation extends Operation {

    perform(todo, text) {
        database.collection('todos').doc(todo.id).update({text: text});
    }
}

export const editTodoOperation = new EditTodoOperation();