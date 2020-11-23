import { Operation } from "./operation";
import { createTodo } from "../Store/todoModel";
import { database } from '../Config/firebaseConfig'

export class AddTodoOperation extends Operation {

    perform(text) {
        const todo = createTodo(text)

        database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })
    }
}

export const addTodoOperation = new AddTodoOperation();
