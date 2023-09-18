import React from 'react';
import './App.css';
import TodoList from "./components/Todolist";
import {v1} from "uuid";


function App() {
  const tasks = [
    {
      id: v1(),
      title: '1 task',
      isDone: true
    },
    {
      id: v1(),
      title: '2 task',
      isDone: false
    },
  ]
  return (
    <div className="App">
      <TodoList tasks = {tasks}/>
    </div>
  );
}

export default App;

