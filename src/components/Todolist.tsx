import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";
import Button from '@mui/material/Button';
import {Checkbox, Container, Grid, IconButton, Paper, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


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
      setError("Type task")
      setNewTaskTitle("")
    }
  }

  const allFilterHandler = () => props.changeFilter("all")

  const activeFilterHandler = () => props.changeFilter("active")

  const completedFilterHandler = () => props.changeFilter("completed")

  return (
    <Grid justifyContent="center" alignItems="center" direction="column" >
      <h2> ToDo List </h2>
      <Paper sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 700,
        flexGrow: 1,
      }}>
        <Container sx={{display:'flex',alignItems:'center', justifyContent:"center"}}>
          <TextField
            label="Type value"
            id="outlined-basic"
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyUp={onKeyUpHandler}
            className={error ? "error" : ""}
            error={!!error}
            helperText={error}

          />
          <IconButton onClick={addTaskHandler}><AddIcon/></IconButton>
        </Container>
        <Container>
          {
            props.tasks.map(el => {
              const deleteTaskHandler = () => props.deleteTask(el.id)
              const checkTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.checkChange(el.id, e.target.checked)
              }
              return (
                <Paper key={el.id} elevation={3} sx={{maxWidth: 600, margin:1, p:1, position:'relative'}}>
                  <Checkbox sx={{position: 'absolute', left:0}}
                    defaultChecked
                    checked={el.isDone}
                    onChange={checkTaskHandler}
                  />
                  <span>{el.title}</span>
                  <IconButton aria-label="delete" onClick={deleteTaskHandler}><DeleteIcon/> </IconButton>
                </Paper>

              )
            })
          }
        </Container>
        <Container>
          <Button
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={allFilterHandler}
          >
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={activeFilterHandler}
          >
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={completedFilterHandler}
          >
            Completed
          </Button>
        </Container>
      </Paper>
    </Grid>
  );
};

export default Todolist;