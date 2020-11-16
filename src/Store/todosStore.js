import { createEntityStore } from "@datorama/akita";
import { StatusFilters } from './todoModel'
const initialState = {
    filter: { status: StatusFilters.All }
};

export const todosStore = createEntityStore(
    initialState, {
        name: 'todos'
    }
)