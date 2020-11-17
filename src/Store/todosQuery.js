import { createEntityQuery } from "@datorama/akita";
import { todosStore } from "./todosStore";
import { combineLatest } from "rxjs";
import { map } from 'rxjs/operators'

export const todosQuery = createEntityQuery(todosStore);

export const selectVisibilityFilter = todosQuery.select(
    state => state.filter.status
);

export const selectVisibleTodos = combineLatest([selectVisibilityFilter, todosQuery.selectAll()])
.pipe(
    map(([status, todos]) => getVisibleTodos(status, todos))
)

function getVisibleTodos(status, todos) {
    switch (status) {
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}