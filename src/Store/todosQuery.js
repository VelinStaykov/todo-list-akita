import { createEntityQuery } from "@datorama/akita";
import { todosStore } from "./todosStore";
import { combineLatest } from "rxjs";

export const todosQuery = createEntityQuery(todosStore);

export const selectVisibilityFilter = todosQuery.select(
    state => state.filter.status
);

export const selectVisibleTodos = combineLatest(
    selectVisibilityFilter,
    todosQuery.selectAll(),
    
    function getVisibleTodos(filter, todos) {
        switch (filter) {
            case 'completed':
                return todos.filter(t => t.completed);
            case 'active':
                return todos.filter(t => !t.completed);
            default:
                return todos;
        }
    }
)