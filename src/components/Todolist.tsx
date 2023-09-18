import React from 'react';


interface ITask {
  id: string,
  title: string,
  isDone: boolean
}

interface TodoListProps {
  tasks: ITask[]
}

const Todolist = (props: TodoListProps) => {
  return (
    <div>
      <h2> ToDo List </h2>
      <div>
        <input type="text"/>
        <button>
          +
        </button>
      </div>
      <ul>
        {
          props.tasks.map((el) => (
            <li>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Todolist;