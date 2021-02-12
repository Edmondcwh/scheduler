
import { Text,Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createUrqlClient } from '../utils/createUrqlClients';

interface CounterProps {

}

const Counter : React.FC<CounterProps> = ({}) => {

    const [count, setCount] = useState(0);
    const [start, changeStart] = useState(false);
    const [interval, setIn] = useState(null);

    
    function startcount () {
        clearInterval(interval)
        let timer = window.setInterval(()=>{
            setCount((count) => count + 1);
            console.log('s');
            
        },1000)
        setIn(timer);
    }
   

    // useEffect(() => {
    //     const counterInterval = setInterval(()=>{
            
    //         setCount((prev) => prev + 1);
    //     },interval);
    //     return () => clearInterval(counterInterval);
    // },[interval])

    return(<>
        <Text>{count}</Text>
        <Button onClick={startcount}>start</Button>
        <Button onClick={()=>{clearInterval(interval)}}>Stio</Button>
    </>)
}

export default withUrqlClient(createUrqlClient) (Counter);