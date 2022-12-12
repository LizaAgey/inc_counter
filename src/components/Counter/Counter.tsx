import React from 'react';
import Button from '../Button/Button';
import styles from './Counter.module.css'
import './../../App.css';

type CounterType = {
    maxValue: number
    minValue: number
    number: number
    setNumber: (number: number) => void
}

const Counter: React.FC<CounterType> = ({
                                            maxValue,
                                            minValue,
                                            number,
                                            setNumber
                                        }) => {
    const incNumber = () => {
        let newNumber = number + 1
        newNumber < maxValue + 1 ? setNumber(newNumber) : setNumber(maxValue)
    };

    const resetNumber = () => {
        setNumber(minValue)
    };

    return (
        <div className={styles.Counter}>
            <h3>Counter</h3>
            <div className={`${styles.Number} ${number === maxValue ? styles.NumberMax : ''}`}>
                {number}
            </div>
            <div className={styles.ControlSection}>
                <Button
                    name={'INC'}
                    onClickCallback={incNumber}
                    disabled={number === maxValue}
                />
                <Button
                    name={'RESET'}
                    onClickCallback={resetNumber}
                />
            </div>
        </div>
    );
};

export default Counter;