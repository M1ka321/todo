import React, {useState} from 'react';
import './App.css';
import TodoList, {ITask} from "./components/Todolist";
import {v1} from "uuid";

export type IFilter = "all" | "active" | "completed"


function App() {

  const [tasks, setTasks] = useState<ITask[]>([
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
  ])
  const [filter, setFilter] = useState<IFilter>("active")

  const changeFilter = (value: IFilter) => {
    setFilter(value)
  }

  let filteredTasksForList = tasks;
  if (filter === "completed") {
    filteredTasksForList = tasks.filter(el => el.isDone)
  }
  if (filter === "active") {
    filteredTasksForList = tasks.filter(el => !el.isDone)
  }


  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
  }

  const addTask = () => {
    let newTask = {id:v1(), title: "New task", isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }


  return (
    <div className="App">
      <TodoList
        tasks={filteredTasksForList}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}


export default App;