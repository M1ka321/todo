import React, {useState} from 'react';
import './App.css';
import TodoList, {ITask} from "./components/Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

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
  const [filter, setFilter] = useState<FilterType>("all")

  const changeFilter = (value: FilterType) => {
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

  const addTask = (title: string) => {
    let newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const checkChange = (taskId: string, isDone: boolean) => {
    let task = tasks.find(item => item.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
    console.log(tasks)
  };


  return (
    <div className="App">
      <TodoList
        tasks={filteredTasksForList}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
        checkChange={checkChange}
        filter={filter}
      />
    </div>
  );
}


export default App;