import { todosService } from './todosService';

export class RandomService {
    
    randomMethod(todo) {
        todosService.addTodo(todo.text)
        .then((newTodo) => {
            const newText = newTodo.text + "(copy)";
            todosService.editTodo(newTodo, newText)
        })
        todosService.removeTodo(todo)
    }
}

export const randomService = new RandomService()