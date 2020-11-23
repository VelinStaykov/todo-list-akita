import { Operation } from './operation';
import { database } from '../Config/firebaseConfig'

export class EditTodoOperation extends Operation {

    perform(id, text) {
        database.collection('todos').doc(id).update({text: text});
    }
}

export const editTodoOperation = new EditTodoOperation();