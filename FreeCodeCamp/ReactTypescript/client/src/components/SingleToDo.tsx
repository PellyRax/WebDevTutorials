import React, { useEffect, useRef, useState } from 'react'
import { ToDo } from '../models/model'
import { AiFillEdit, AiFillDelete, } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

import './Styles.css'

interface Props {
  toDo: ToDo,
  toDos: ToDo[],
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const SingleToDo = ({toDo, toDos, setToDos}: Props) => {

  const [edit, setEdit] = useState(false)
  const [editToDo, setEditToDo] = useState(toDo.toDo)

  const handleDone = (id: number) => {
    setToDos(toDos.map((toDo) => toDo.id === id?{...toDo, isDone: !toDo.isDone}: toDo)
  )}

  const handleDelete = (id: number) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id))
  }

  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setToDos(toDos.map((toDo) => 
    (
      toDo.id === id ?  {...toDo, toDo:editToDo}: toDo
    )));
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <form className="toDosSingle" onSubmit={(e) => handleEdit(e, toDo.id)}>
      {
         edit ? (
          <input ref={inputRef} value={editToDo} onChange={(e) => setEditToDo(e.target.value)} className="toDosSingleText" />
         ):(
          toDo.isDone ? (
            <s className="toDosSingleText">{toDo.toDo}</s>
  
          ): (
            
            <span className="toDosSingleText">{toDo.toDo}</span>
          )
         )
      }
      <div>
        <span className="icon" onClick={() => {
          if (!edit) {
            {setEdit(!edit)}
          }
          }}><AiFillEdit /></span>
        <span className="icon" onClick={() => handleDelete(toDo.id)}><AiFillDelete /></span>
        <span className="icon" onClick={() => handleDone(toDo.id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleToDo