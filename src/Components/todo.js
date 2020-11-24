import TodoEditModal from './Modal/todoEditModal';

const Todo = (props) => {
    const completedStyle = {
        color: "grey",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }

    const { id, text, completed } = props.todo

    const handleToggle = () => {
        props.toggleTodo(props.todo)
    }

    const handleRemove = () => {
        props.removeTodo(props.todo)
    }
    
    const randomFunction = () => {
        props.randomMethod(props.todo)
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
                <TodoEditModal todo={props.todo} editTodo={props.editTodo} />
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