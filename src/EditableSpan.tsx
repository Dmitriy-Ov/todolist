import { ChangeEvent, useState } from "react";

type EditableSpanPropsType ={
  name: string;
  editMode: boolean;
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType){
  let [editMode, setEditMode] = useState(false)
  let [name, setName] = useState("")

  const activateEditMod = () =>{
     setEditMode(true);
     setName(props.name)
  }

  const activateViewMod = () => {
    setEditMode(false);
    props.onChange(name);
  }

  const OnChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)

  return editMode
  ? <input value={name} onChange={OnChangeNameHandler} onBlur={activateViewMod} autoFocus />
  : <span onDoubleClick={activateEditMod}>{props.name}!!</span>
}