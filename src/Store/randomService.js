import { todosService } from './todosService';

export class RandomService {
    
    randomMethod(todo) {
        todosService.addTodo(todo.text)
        .then((newTodo) => {
            const newText = newTodo.text + "(copy)";
            todosService.editTodo(newTodo.id, newText)
        })
        todosService.removeTodo(todo.id)
    }
}

export const randomService = new RandomService()