import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { Hello } from './components/Hello';
import { useForm } from './customHooks/useForm';
import { useMeasure } from './customHooks/useMeasure';


const App = () => {
  const [values, handleChange] = useForm({ email: '', password:'', firstName: ''});
  const [showHello, setShowHello] = useState(true)
  
  const inputRef = useRef();
  const hello = useRef(() => console.log('hello'))

  const [rect, inputRef2] = useMeasure([]);

  const [count, setCount] = useState(0);
  

  useEffect(() => {
    console.log(rect);
  }, [rect])

  // useLayoutEffect(() => {
  //   console.log(inputRef.current.getBoundingClientRect())
  // }, [])

  return (
    <div>

      <button onClick={() => setShowHello(!showHello)}>Toggle Hello</button>
      {showHello && <Hello />}
      <input ref={inputRef} name='email' placeholder='email' value={values.email} onChange={handleChange}/>
      <input ref={inputRef2}name='firstName' placeholder='first name' value={values.firstName} onChange={handleChange}/>
      <input type='password' placeholder='password' name='password' value={values.password} onChange={handleChange}/>

      <button onClick={() => {
        inputRef.current.focus()
        hello.current()
      }}>focus</button> 
    </div>
  );
}

export default App;
