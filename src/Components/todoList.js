import React from 'react';
import Todo from './todo';

const TodoList = (props) => {

  const filteredTodos = props.todos
  
  const renderedListItems = filteredTodos.map(todo => 
      <Todo key={todo.id} todo={todo} removeTodo={props.removeTodo} toggleTodo={props.toggleTodo} editTodo={props.editTodo} />
  )

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
