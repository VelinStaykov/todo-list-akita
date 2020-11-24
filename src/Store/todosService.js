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

        this._eventManager.dispatch(eventTypes.TODO_ADDED, todo );
    }

    removeTodo(todo){
        database.collection('todos').doc(todo.id).delete();

        this._eventManager.dispatch(eventTypes.TODO_REMOVED, todo );
    }

    toggleTodo(todo){
        database.collection('todos').doc(todo.id).update({completed: !todo.completed});

        this._eventManager.dispatch(eventTypes.TODO_TOGGLED, todo);
    }

    editTodo(todo, text){
        database.collection('todos').doc(todo.id).update({text: text});

        this._eventManager.dispatch(eventTypes.TODO_EDITED, {todo, text});
    }

    updateFilter(status){
        this.todosStore.update({ui: {status} });
    }
}

export const todosService = new TodosService(eventManager, todosStore)
