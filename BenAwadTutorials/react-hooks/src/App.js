import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import { useFetch } from './customHooks/useFetch'

const computeLongestWord = (arr) => {
  if(!arr){
    return[]
  }

  console.log('computing longest word')

  let longestWord = ''

  JSON.parse(arr).forEach(sentence => sentence.split(' ').forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }))

  return longestWord;
}

const App = () => {
  const [count, setCount] = useState(0);
  const {data} = useFetch('https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json')

  const longestWord = useMemo (() => {
    computeLongestWord(data)
  }, [data])

  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <div>{longestWord}</div>
    </>
  );
}

export default App;
