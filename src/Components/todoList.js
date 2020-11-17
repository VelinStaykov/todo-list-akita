import React, { useEffect } from 'react';
import Todo from './todo';
import { selectVisibleTodos } from '../Store/todosQuery';
import { useObservable } from '@libreact/use-observable';
import { setTodos } from '../Store/todosService';

const TodoList = () => {

  useEffect(() => {
    setTodos()
  }, [])
  
  const [filteredTodos] = useObservable(selectVisibleTodos);

  const renderedListItems = filteredTodos.map(todo => 
      <Todo key={todo.id} todo={todo} />
  )

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
