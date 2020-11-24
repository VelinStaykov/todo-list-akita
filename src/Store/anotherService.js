/** Example of how the event manager might work. */
import eventTypes from "../Events/eventTypes";
import eventManager from "../Events/eventManager";

class AnotherService {

    constructor(eventManager) {

        eventManager.addListener(eventTypes.TODO_ADDED, this.handleTodoAddedEvent);
        eventManager.addListener(eventTypes.TODO_REMOVED, this.handleTodoRemovedEvent);
        eventManager.addListener(eventTypes.TODO_EDITED, this.handleTodoEditedEvent);
        eventManager.addListener(eventTypes.TODO_TOGGLED, this.handleTodoToggledEvent);
    }

    handleTodoAddedEvent(todo) {
        
        console.log(`Added new todo with id ${todo.id}`);
    }

    handleTodoRemovedEvent(todo) {
        console.log(`Removed todo with id ${todo.id}`);
    }

    handleTodoToggledEvent(todo) {
        console.log(`Toggled todo with id ${todo.id}, new status is ${todo.completed}`);
    }

    handleTodoEditedEvent({ todo, text }) {
        console.log(`Edited todo with ${todo.id}, new text is ${text}`);
    }
}

export const anotherService = new AnotherService(eventManager);
