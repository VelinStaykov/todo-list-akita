import { Operation } from "./operation";
import { database } from '../Config/firebaseConfig'

export class RemoveTodoOperation extends Operation {

    perform(id) {
        database.collection('todos').doc(id).delete();
    }
}

export const removeTodoOperation = new RemoveTodoOperation();