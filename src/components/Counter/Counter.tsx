import React from 'react';
import Button from '../Button/Button';
import styles from './Counter.module.css'
import './../../App.css';
import {ErrorType} from '../../App';

type CounterType = {
    lsMaxValue: number
    inputMinValue: number
    inputMaxValue: number
    number: number
    setNumber: (number: number) => void
    error: ErrorType
}

const Counter: React.FC<CounterType> = ({
                                            lsMaxValue,
                                            inputMinValue,
                                            inputMaxValue,
                                            number,
                                            setNumber,
                                            error
                                        }) => {
    const incNumber = () => {
        let newNumber = number + 1
        newNumber < lsMaxValue + 1 ? setNumber(newNumber) : setNumber(lsMaxValue)
    };
    const resetNumber = () => {
        setNumber(inputMinValue)
    };
    const isInputError = error.isMaxError || error.isMinError
    const isDisabled = number === lsMaxValue || error.isMaxError || error.isMinError

    return (
        <div className={styles.Counter}>
            <h3>Counter</h3>
            <div
                className={`${styles.Number} ${number === lsMaxValue ? styles.NumberMax : ''} ${isInputError ? styles.error : ''}`}>
                <span>{isInputError ? 'Please enter correct value' : number}</span>
            </div>
            <div className={styles.ControlSection}>
                <Button
                    name={'INC'}
                    onClickCallback={incNumber}
                    disabled={isDisabled}
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