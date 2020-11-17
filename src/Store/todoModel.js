export function createTodo(todoText) {
    return {
        text: todoText,
        completed: false
    };
}

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}