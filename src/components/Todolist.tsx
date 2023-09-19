import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";




export interface ITask {
  id: string,
  title: string,
  isDone: boolean
}

interface TodoListProps {
  tasks: ITask[]
  deleteTask: (id: string) => void
  changeFilter: (value: FilterType) => void
  addTask: (title: string) => void
  checkChange: (taskId: string, isDone: boolean) => void
  filter: FilterType
}


const Todolist = (props: TodoListProps) => {

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }


  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Введите значение")
      setNewTaskTitle("")
    }
  }

  const allFilterHandler = () => props.changeFilter("all")

  const activeFilterHandler = () => props.changeFilter("active")

  const completedFilterHandler = () => props.changeFilter("completed")


  return (
    <div>
      <h2> ToDo List </h2>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(el => {
            const deleteTaskHandler = () => props.deleteTask(el.id)
            const checkTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.checkChange(el.id, e.target.checked)
            }
            return (
              <li key={el.id} className={el.isDone ? "done-task": ""}>
                <input
                  type="checkbox"
                  checked={el.isDone}
                  onChange={checkTaskHandler}
                />
                <span>{el.title}</span>
                <button onClick={deleteTaskHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-button" : ""}
          onClick={allFilterHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-button" : ""}
          onClick={activeFilterHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-button" : ""}
          onClick={completedFilterHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;