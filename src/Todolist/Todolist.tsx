import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "../App";

type CaseType = {
    id: string;
    title: string;
    tasks: CaseName[];
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValueType, todolistId: string) => void;
    addTask: (title: string, todolistId: string)  => void;
    changeTypeStatus: (taskId: string, status: boolean, todolistId: string) => void;
    filter: FilterValueType;
    removeTodolist: (todolistId: string) => void;
}

type CaseName = {
    id: string;
    name: string;
    status: boolean;
}

export const Todolist = (props: CaseType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.charCode === 13) {
        props.addTask(newTaskTitle, props.id);
        setNewTaskTitle("");
      }
    }

    const addTask = () => {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle("");
      }
      else {
        setError ("Поле обязательно для заполнения")
      }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
      props.removeTodolist(props.id);
    }

    return(
      
      <div>
      <h1>{props.title}<button onClick={removeTodolist}>x</button></h1>
      <div>
        <input value={newTaskTitle} 
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">*Поле обязательно для заполнения</div>}
      </div>

      <ul>
        {
          props.tasks.map ((t) => {

            const onRemoveHandler = () => {props.removeTask(t.id, props.id)}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTypeStatus (t.id, e.currentTarget.checked, props.id)
            }


            return <li className={t.status ? "status" : ""}>
              <input type = 'checkbox'
                onChange={onChangeHandler}
                checked = {t.status}/>
              <span>{t.name}</span>
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