import React from 'react'
import './App.css';
import AddTodo from './Components/addTodo';
import TodoFilters from './Components/todoFilters';
import TodoList from './Components/todoList';
import {useTodosFacade} from './Hooks/todosHook'
import { todosStore } from './Store/todosStore';

function App() {
  todosStore.setLoading(true)
  
  const [{todos, ui}, addTodo, removeTodo, toggleTodo, editTodo, updateFilter] = useTodosFacade();
    
  return (
    <div className="todo-list-app">
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} editTodo={editTodo} />
      <TodoFilters status={ui.status} updateFilter={updateFilter} />
    </div>
  )
};

export default App;
