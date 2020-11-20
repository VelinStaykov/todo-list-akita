import TodoEditModal from './Modal/todoEditModal';
import { randomService } from '../Store/randomService';

const Todo = (props) => {
    const completedStyle = {
        color: "grey",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }

    const { id, text, completed } = props.todo

    const handleToggle = () => {
        props.toggleTodo(id, completed)
    }

    const handleRemove = () => {
        props.removeTodo(id)
    }
    
    const changeText = (text) => {
        props.editTodo(id, text)
    }

    const randomFunction = () => {
        randomService.randomMethod(props.todo)
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
                <button
                    onClick={randomFunction}
                >
                    Copy
                </button>
            </div>
        </li>
    )
}

export default Todo;