import { AddTodoOperation } from "../Operations/addTodoOperation";
import { EditTodoOperation } from "../Operations/editTodoOperation";
import LogOperation from "../Operations/logOperation";
import { RemoveTodoOperation } from "../Operations/removeTodoOperation";
import { SetTodosOperation } from "../Operations/setTodosOperation";
import { ToggleTodoOperation } from "../Operations/toggleTodoOperation";
import { UpdateFilterOperation } from "../Operations/updateFilterOperation";
import { OperationBuilder } from "./operationBuilder";
import {todosStore} from '../Store/todosStore';

export class ServiceFactory {
   
    createTodoService() {
        
        let service = {};

        service.setTodos = this._generateOperation([
            new SetTodosOperation(todosStore),
            new LogOperation("setTodos")
        ]);

        /* service.addTodo = this._generateOperation([
            new AddTodoOperation(),
            new LogOperation("addTodo")
        ]); */

        service.addTodo = new OperationBuilder(new AddTodoOperation())
        .then([
            new ToggleTodoOperation(),
            new LogOperation("ToggleTodo")
        ])
        .build();

        service.removeTodo = this._generateOperation([
            new RemoveTodoOperation(),
            new LogOperation("removeTodo")
        ]);

        /* service.toggleTodo = this._generateOperation([
            new ToggleTodoOperation(),
            new LogOperation("toggleTodo")
        ]); */

        service.toggleTodo = new OperationBuilder(new ToggleTodoOperation())
        .then([
            new RemoveTodoOperation(),
            new LogOperation("RemoveTodo")
        ])
        .build();

        service.editTodo = this._generateOperation([
            new EditTodoOperation(),
            new LogOperation("editTodo")
        ]);

        service.updateFilter = this._generateOperation([
            new UpdateFilterOperation(todosStore),
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