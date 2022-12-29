import React from 'react';
import Button from '../Button/Button';
import styles from './Counter.module.css'
import './../../App.css';
import {ErrorType} from '../../App';
import {NavLink} from 'react-router-dom';

type CounterType = {
    lsMaxValue: number
    inputMinValue: number
    number: number
    setNumber: (number: number) => void
    error: ErrorType
    isSettingsSaved: boolean
}

const Counter: React.FC<CounterType> = ({
                                            lsMaxValue,
                                            inputMinValue,
                                            number,
                                            setNumber,
                                            error,
                                            isSettingsSaved
                                        }) => {
    const incNumber = () => {
        let newNumber = number + 1
        newNumber < lsMaxValue + 1 ? setNumber(newNumber) : setNumber(lsMaxValue)
    };
    const resetNumber = () => {
        setNumber(inputMinValue)
    };
    const isDisabled = number === lsMaxValue || error.isMaxError || error.isMinError || !isSettingsSaved
    const numberStyles = `${styles.Number} ${number === lsMaxValue ? styles.NumberMax : ''}`

    return (
        <div className={styles.Counter}>
            <h3>Counter</h3>
            <div className={numberStyles}>
                <span className={numberStyles}>
                    {number}
                </span>
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
                <NavLink to={'/'}>
                    <Button
                        name={'to settings'}
                    />
                </NavLink>
            </div>
        </div>
    );
};

export default Counter;