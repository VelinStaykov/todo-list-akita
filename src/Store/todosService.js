import { todosStore } from './todosStore'
import { createTodo } from './todoModel'
import { database } from '../Config/firebaseConfig'
import eventTypes from "../Events/eventTypes";
import eventManager from "../Events/eventManager";

export class TodosService {

    _eventManager;

    constructor(eventManager, todosStore) {
        this._eventManager = eventManager;
        this.todosStore = todosStore;
    }

    setTodos() {
        database.collection('todos').onSnapshot((querySnapshot) => {

            let todos = [];

            querySnapshot.forEach((document) => {

                const { text, completed } = document.data()

                const todo = {
                    id: document.id,
                    text: text,
                    completed: completed
                }

                todos.push(todo)
            })

            this.todosStore.set(todos);
            this.todosStore.setLoading(false);
        });
    }

    addTodo(text) {
        const todo = createTodo(text)

        database.collection('todos').doc(`${todo.id}`).set({
            text: todo.text,
            completed: todo.completed
        })

        this._eventManager.dispatch(eventTypes.TODO_ADDED, { id : todo.id });
    }

    removeTodo(id){
        database.collection('todos').doc(id).delete();

        this._eventManager.dispatch(eventTypes.TODO_REMOVED, { id });
    }

    toggleTodo(id, completed){
        database.collection('todos').doc(id).update({completed: !completed});

        this._eventManager.dispatch(eventTypes.TODO_TOGGLED, { id, completed });
    }

    editTodo(id, text){
        database.collection('todos').doc(id).update({text: text});

        this._eventManager.dispatch(eventTypes.TODO_EDITED, { id, text });
    }

    updateFilter(status){
        this.todosStore.update({ui: {status} });
    }
}

export const todosService = new TodosService(eventManager, todosStore)
