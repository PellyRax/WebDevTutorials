import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useCountRenders } from '../customHooks/useCountRenders';
import { useFetch } from '../customHooks/useFetch';
import { useMeasure } from '../customHooks/useMeasure';

export const Hello = React.memo(({increment}) => {
    // useCountRenders();

    return (
        <button onClick={() => increment(5)}>Hello</button>
    ) 
});
