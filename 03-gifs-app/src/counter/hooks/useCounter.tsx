import { useState } from "react";

export const useCounter = (initialValue: number = 1) => {
    const [counter, setCounter] = useState(initialValue);

    const handleAdd = () => setCounter(counter + 1);
    const handleSubtract = () => setCounter((prev) => prev - 1);
    const handleReset = () => setCounter(initialValue);

    return {
        // Values
        counter,

        // Methods / Actions
        handleAdd,
        handleSubtract,
        handleReset
    };
}
