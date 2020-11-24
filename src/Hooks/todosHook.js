import { todosService } from '../Store/todosService';
import { anotherService } from "../Store/anotherService";
import { useEffect, useState } from 'react';
import { todosQuery } from '../Store/todosQuery'
import { StatusFilters } from '../Store/todoModel';

function onEmit(source, nextFn) {
    return source.subscribe(nextFn, console.error)
}

export function useTodosFacade() {
    const addTodo = (text) => todosService.addTodo(text)
    const removeTodo = (todo) => todosService.removeTodo(todo)
    const toggleTodo = (todo) => todosService.toggleTodo(todo)
    const editTodo = (todo, text) => todosService.editTodo(todo, text)
    const updateFilter = (status) => todosService.updateFilter(status)
    const [state, setState] = useState({ todos: [], ui: {status: StatusFilters.All }  });

    useEffect(() => {
        const subscriptions = [
            onEmit(todosQuery.selectVisibleTodos, todos => setState(state => ({...state, todos })) ),
            onEmit(todosQuery.selectVisibilityFilter, status => setState(state => ({...state, ui: { status: status} })) )
        ]

        todosService.setTodos();

        return () => { subscriptions.map( it => it.unsubscribe()) }
    }, [])

    return [state, addTodo, removeTodo, toggleTodo, editTodo, updateFilter]
}
