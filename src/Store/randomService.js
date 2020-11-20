import { database } from "../Config/firebaseConfig";
import { createTodo } from "./todoModel";
import { todosStore } from "./todosStore";
import { todosService , editTodo} from './todosService';

export class RandomService {
    constructor(store = todosStore){
        this.store = store;
    }

    randomMethod(todo) {
        todosService.addTodo(todo.text)
        .then((newTodo) => {
            const newText = newTodo.text + "(copy)";
            todosService.editTodo(newTodo.id, newText)
        })
        todosService.removeTodo(todo.id)
    }
}

export const randomService = new RandomService(todosStore)