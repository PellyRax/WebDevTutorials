import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useFetch } from '../customHooks/useFetch';
import { useMeasure } from '../customHooks/useMeasure';

export const Hello = () => {
    const [count, setCount] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const divRef = useRef();

    // const renders = useRef(0);

    // console.log('hello renders: ', renders.current++)

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div ref={divRef} >{!data ? 'loading...' : data}</div>
            </div>
            <div>count: {count}</div>
            <button onClick={() => setCount(c => c + 1)}>increment count</button>
        </div>
    ) 
}
