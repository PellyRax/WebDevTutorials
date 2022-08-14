import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { ToDo } from './models/model';

const App:React.FC = () => {

  const [toDo, setToDo] = useState("")
  const [toDos, setToDos] = useState<ToDo[]>([])  

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(toDo){
      setToDos([...toDos, { id: Date.now(), toDo: toDo, isDone: false }]);
      setToDo("");
      console.log(toDo)
    }

  }

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd}/>
      <ToDoList toDos={toDos} setToDos={setToDos}/>
    </div>
  );
}

export default App;
