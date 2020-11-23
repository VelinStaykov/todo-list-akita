import { Operation } from './operation';
import {todosStore} from '../Store/todosStore'

export class UpdateFilterOperation extends Operation {

    constructor(todosStore) {
        super()
        this.todosStore = todosStore;
    }

    perform(status) {
        this.todosStore.update( { ui: {status} } );
    }
}

export const updateFilterOperation = new UpdateFilterOperation(todosStore)


