import React from 'react';
import {IFilter} from "../App";


export interface ITask {
  id: string,
  title: string,
  isDone: boolean
}

interface TodoListProps {
  tasks: ITask[]
  deleteTask: (id: string) => void
  changeFilter: (value: IFilter) => void
  addTask: ()=>void
}


const Todolist = (props: TodoListProps) => {

  return (
    <div>
      <h2> ToDo List </h2>
      <div>
        <input type="text"/>
        <button onClick={()=>props.addTask()}>
          +
        </button>
      </div>
      <ul>
        {
          props.tasks.map(el =>
            <li key={el.id}>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
              <button onClick={()=>props.deleteTask(el.id)}>x</button>
            </li>
          )
        }
      </ul>
      <div>
        <button onClick={()=>props.changeFilter("all")}>All</button>
        <button onClick={()=>props.changeFilter("active")}>Active</button>
        <button onClick={()=>props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;