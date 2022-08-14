import React, { useRef } from 'react'

import './Styles.css'

interface Props{
  toDo: string,
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;  
}

const InputField = ({ toDo, setToDo, handleAdd }: Props) => {

  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
      <input 
        ref={inputRef}
        type='input'
        value={toDo}
        onChange={
          (e) => setToDo(e.target.value)
        } 
        placeholder='Enter a task' 
        className='inputBox'
      />
      <button className='inputSubmit' type='submit'>Go</button>
    </form>
  )
}

export default InputField