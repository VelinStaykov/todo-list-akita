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

    handleTodoAddedEvent({ id }) {
        console.log(`Added new todo with id ${id}`);
    }

    handleTodoRemovedEvent({ id }) {
        console.log(`Removed todo with id ${id}`);
    }

    handleTodoToggledEvent({ id, completed }) {
        console.log(`Toggled todo with id ${id}, new status is ${completed}`);
    }

    handleTodoEditedEvent({ id, text }) {
        console.log(`Edited todo with ${id}, new text is ${text}`);
    }
}

export const anotherService = new AnotherService(eventManager);
