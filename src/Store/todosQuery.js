import { QueryEntity } from "@datorama/akita";
import { todosStore } from "./todosStore";
import { combineLatest } from "rxjs";
import { map } from 'rxjs/operators'

export class TodosQuery extends QueryEntity {
    constructor(store = todosStore) {
        super(store)
    }
    
    selectVisibilityFilter = this.select(
        state => state.ui.status
    );

    selectVisibleTodos = combineLatest([this.selectVisibilityFilter, this.selectAll()])
    .pipe(
        map(([status, todos]) => this.getVisibleTodos(status, todos))
    )

    getVisibleTodos(status, todos) {
        switch (status) {
            case 'completed':
                return todos.filter(t => t.completed);
            case 'active':
                return todos.filter(t => !t.completed);
            default:
                return todos;
        }
    }

}
export const todosQuery = new TodosQuery(todosStore)