import { useState } from "react";

// import './ItemCounter.css';
import styles from './ItemCounter.module.css';

interface ItemCounterProps {
    name: string;
    quantity?: number;
}

export const ItemCounter = ({ name, quantity = 1 }: ItemCounterProps) => {
    const [counter, setCounter] = useState(quantity);

    const handleAdd = () => {
        setCounter(counter + 1);
    }

    const handleSubtract = () => {
        if (counter === 1) return;
        setCounter(prev => prev - 1);
    }

    return (
        <section className={ styles.itemRow }>
            <span 
                className={ styles['item-text'] } 
                style={{ color: counter === 1 ? 'red' : 'black' }}
            >{ name }</span>
            <button onClick={ handleSubtract }>-1</button>
            <span>{ counter }</span>
            <button onClick={ handleAdd }>+1</button>
        </section>
    );
}
