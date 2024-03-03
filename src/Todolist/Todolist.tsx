import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "../App";
import { AddItemForm } from "../AddItemForm";
import { EditableSpan } from "../EditableSpan";


type CaseType = {
    id: string;
    title: string;
    tasks: CaseName[];
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValueType, todolistId: string) => void;
    addTask: (title: string, todolistId: string)  => void;
    changeTypeStatus: (taskId: string, status: boolean, todolistId: string) => void;
    changeTaskName: (Id: string, newTitle: string, todolistId: string) => void;
    filter: FilterValueType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
}

export type CaseName = {
    id: string;
    name: string;
    status: boolean;
}

export const Todolist = (props: CaseType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
      props.removeTodolist(props.id);
    }

    const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
      props.addTask(title, props.id);
    }

    return(
      <div>
      <h1> <EditableSpan name={props.title} onChange={changeTodolistTitle} editMode={false} />
        <button onClick={removeTodolist}>x</button>
      </h1>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasks.map ((t) => {

            const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTypeStatus (t.id, e.currentTarget.checked, props.id)
            }

            const onChangeNameHandler = (newValue: string) => {
              props.changeTaskName (t.id, newValue, props.id)
            }


            return <li className={t.status ? "status" : ""}>
              <input type = 'checkbox'
                onChange={onChangeStatusHandler}
                checked = {t.status}/>
              <EditableSpan name={t.name} onChange={onChangeNameHandler} editMode={false} />
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>

      <div>
        <button className={props.filter === 'all' ? "active-filter" : ""} 
          onClick={onAllClickHandler}>Все задачи</button>
        <button className={props.filter === 'active' ? "active-filter" : ""} 
          onClick={onActiveClickHandler}>Не выполненные задачи</button>
        <button className={props.filter === 'completed' ? "active-filter" : ""} 
          onClick={onCompletedClickHandler}>Завершенные задачи</button>
      </div>
    </div>
    )

  }


 