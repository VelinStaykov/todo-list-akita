import { Operation } from "./operation";
import { createTodo } from "../Store/todoModel";
import { database } from '../Config/firebaseConfig'

export class AddTodoOperation extends Operation {

    async perform(text) {
        const todo = createTodo(text)

        await database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })

        return todo;
    }
}

export const addTodoOperation = new AddTodoOperation();
