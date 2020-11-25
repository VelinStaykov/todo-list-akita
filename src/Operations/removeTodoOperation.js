import { Operation } from "./operation";
import { database } from '../Config/firebaseConfig'

export class RemoveTodoOperation extends Operation {

    async perform(todo) {
        await database.collection('todos').doc(todo.id).delete();
    }
}

export const removeTodoOperation = new RemoveTodoOperation();