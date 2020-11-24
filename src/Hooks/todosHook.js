import { todosService } from '../Store/todosService';
import { useEffect, useState } from 'react';
import { todosQuery } from '../Store/todosQuery'
import { StatusFilters } from '../Store/todoModel';
import { randomService } from '../Store/randomService';

function onEmit(source, nextFn) {
    return source.subscribe(nextFn, console.error)
}

export function useTodosFacade() {
    const addTodo = (todo) => todosService.addTodo(todo)
    const removeTodo = (todo) => todosService.removeTodo(todo)
    const toggleTodo = (todo) => todosService.toggleTodo(todo)
    const editTodo = (todo, text) => todosService.editTodo(todo, text)
    const updateFilter = (status) => todosService.updateFilter(status)
    const randomMethod = (todo) => randomService.randomMethod(todo);
    const [state, setState] = useState({ todos: [], ui: {status: StatusFilters.All }  });

    useEffect(() => {
        const subscriptions = [
            onEmit(todosQuery.selectVisibleTodos, todos => setState(state => ({...state, todos })) ),
            onEmit(todosQuery.selectVisibilityFilter, status => setState(state => ({...state, ui: { status: status} })) )
        ]

        todosService.setTodos();

        return () => { subscriptions.map( it => it.unsubscribe()) }
    }, [])

    return [state, addTodo, removeTodo, toggleTodo, editTodo, updateFilter, randomMethod]
}