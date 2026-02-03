import { useMemo } from "react";
import { useCounter } from "@/hooks/useCounter";

const heavyStuff = (iterationNumber: number) => {
    console.time('Heavy_stuff_started');

    for (let index = 0; index < iterationNumber; index++) {
        console.log('Here we go!');
    }

    console.timeEnd('Heavy_stuff_started');

    return `${iterationNumber} iterations done`;
}

export const MemoCounter = () => {
    const { counter, increment } = useCounter(40_000);
    const { counter: counter2, increment: increment2 } = useCounter(10);

    /* 
    * useMemo se utiliza para memorizar el resultado de una función pesada y evitar 
    * que se vuelva a ejecutar en cada renderización del componente, a menos que las 
    * dependencias hayan cambiado.
    */
    const heavyStuffResult = useMemo(() => heavyStuff(counter), [counter]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Memo - useMemo - {heavyStuffResult}</h1>
            <hr />

            <h2>Counter: {counter}</h2>
            <h2>Counter 2: {counter2}</h2>
            <button 
                className="bg-blue-500 px-4 py-2 text-white rounded-md cursor-pointer"
                onClick={increment}
            >+1</button>

            <button 
                className="bg-blue-500 px-4 py-2 text-white rounded-md cursor-pointer"
                onClick={increment2}
            >+1 - counter 2</button>
        </div>
    );
}
