import { addTodoOperation } from "../Operations/addTodoOperation";
import { editTodoOperation } from "../Operations/editTodoOperation";
import LogOperation from "../Operations/logOperation";
import { removeTodoOperation } from "../Operations/removeTodoOperation";
import { setTodosOperation } from "../Operations/setTodosOperation";
import { toggleTodoOperation } from "../Operations/toggleTodoOperation";
import { updateFilterOperation } from "../Operations/updateFilterOperation";

export class ServiceFactory {
   
    createTodoService() {
        
        let service = {};

        service.setTodos = this._generateOperation([
            setTodosOperation,
            new LogOperation("setTodos")
        ]);

        service.addTodo = this._generateOperation([
            addTodoOperation,
            new LogOperation("addTodo")
        ]);

        service.removeTodo = this._generateOperation([
            removeTodoOperation,
            new LogOperation("removeTodo")
        ]);

        service.toggleTodo = this._generateOperation([
            toggleTodoOperation,
            new LogOperation("toggleTodo")
        ]);

        service.editTodo = this._generateOperation([
            editTodoOperation,
            new LogOperation("editTodo"),
            toggleTodoOperation
        ]);

        service.updateFilter = this._generateOperation([
            updateFilterOperation,
            new LogOperation("updateFilter")
        ]);

        return service;
    }

    _generateOperation(suboperations) {
        return (...params) => {
            suboperations.forEach((operation) => {
                operation.perform(...params);
            })
        }
    }
}

export const todosService = new ServiceFactory().createTodoService();