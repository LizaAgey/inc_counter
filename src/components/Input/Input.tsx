import React, {ChangeEvent} from 'react';
import styles from "./Input.module.css"

type InputType = {
    setTitle: (title: string) => void,
    title: string
}

const Input: React.FC<InputType> = (props) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onChangeHandler} value={props.title} className={styles.input}/>
        </div>
    );
};

export default Input;