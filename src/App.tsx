import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { text } from 'stream/consumers';
import { Todolist } from './Todolist/Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {

  
  
  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), name: title, status: false}
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj})
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id != id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj})
  }

function changeStatus (taskId: string, status: boolean, todolistId: string) {
  let tasks = tasksObj[todolistId];
  let task = tasks.find (t => t.id === taskId);
  if (task) {
    task.status = status;
    setTasks({ ...tasksObj});
  }
}

let todolistId1 = v1();
let todolistId2 = v1();

let [todolists, setTodolists]  = useState<Array<TodolistType>>([
  {id: todolistId1, title: "Дела на утро", filter: "all"},
  {id: todolistId2, title: "Дела на вечер", filter: "all"}
]);

let removeTodolist = (todolistId: string) => {
  let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
  setTodolists(filteredTodolist);

  delete tasksObj[todolistId];
  setTasks({...tasksObj})

}

let [tasksObj, setTasks] = useState ({
  [todolistId1]: [
    {id: v1(), name: 'проснуться', status: true},
    {id: v1(), name: 'умыться', status: true},
    {id: v1(), name: 'сделать зарядку', status: false},
    {id: v1(), name: 'позавтракать', status: false},
  ],
  [todolistId2]: [
    {id: v1(), name: 'поужинать', status: true},
    {id: v1(), name: 'посмотреть ТВ', status: true},
    {id: v1(), name: 'лечь спасть', status: false},
  ],
})

  return (
    <div className="App">
      {
        todolists.map( (tl) =>{

          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === false)
          }

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.status === true)
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTypeStatus={changeStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist}
            />
          )
        }

        )
      }
      
    </div>
  );
}

export default App;
