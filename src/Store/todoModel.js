import { guid } from "@datorama/akita";

export function createTodo(todoText) {
    return {
        id: guid(),
        text: todoText,
        completed: false
    };
}

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}