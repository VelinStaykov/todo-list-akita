import { removeTodo, toggleTodo, editTodo } from '../Store/todosService';
import TodoEditModal from './Modal/todoEditModal';

const Todo = (props) => {
    const completedStyle = {
        color: "grey",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }

    const { id, text, completed } = props.todo

    const handleToggle = () => {
        toggleTodo(id, completed);
    }

    const handleRemove = () => {
        removeTodo(id);
    }
    
    const changeText = (text) => {
        const newText = text

        editTodo(id, newText);
    }

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={completed}
                onChange={handleToggle}
            />
            <p className="todo-item-text" style={completed ? completedStyle : null}>
                {text}
            </p>
            <div className="todo-item-buttons" >
                <TodoEditModal text={text} changeText={changeText} />
                <button
                    className="button remove-button"
                    onClick={handleRemove}>
                    Remove
                </button>
            </div>
        </li>
    )
}

export default Todo;