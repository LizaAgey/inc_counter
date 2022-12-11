import React, {useState} from 'react';
import Button from '../Button/Button';
import styles from "./Counter.module.css"
import './../../App.css';

const Counter: React.FC<any> = () => {
    const MAX_NUMBER = 5
    const MIN_NUMBER = 0
    const [number, setNumber] = useState<number>(0)

    const incNumber = () => {
        let newNumber = number + 1
        newNumber < MAX_NUMBER + 1 ? setNumber(newNumber) : setNumber(MAX_NUMBER)
    };

    const resetNumber = () => {
        setNumber(MIN_NUMBER)
    };
    return (
        <div className={styles.Counter}>
            <h3>Counter from 0 to 5</h3>
            <div className={`${styles.Number} ${number === MAX_NUMBER ? styles.NumberMax : ""}`}>{number}</div>
            <div className={styles.ControlSection}>
                <Button
                    name={"INC"}
                    onClickCallback={incNumber}
                    disabled={number === MAX_NUMBER}
                />
                <Button
                    name={"RESET"}
                    onClickCallback={resetNumber}
                    disabled={number === MIN_NUMBER}
                />
            </div>
        </div>
    );
};

export default Counter;