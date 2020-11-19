import { todosService } from '../Store/todosService';
import { useEffect, useState } from 'react';
import { todosQuery } from '../Store/todosQuery'
import { StatusFilters } from '../Store/todoModel';

function onEmit(source, nextFn) {
    return source.subscribe(nextFn, console.error)
}

export function useTodosFacade() {
    const addTodo = (text) => todosService.addTodo(text)
    const removeTodo = (id) => todosService.removeTodo(id)
    const toggleTodo = (id, completed) => todosService.toggleTodo(id, completed)
    const editTodo = (id, text) => todosService.editTodo(id, text)
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