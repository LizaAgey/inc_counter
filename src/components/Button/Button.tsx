import React from 'react';
import styles from './Button.module.css'

type ButtonType = {
    name: string,
    onClickCallback?: () => void
    disabled?: boolean
}

const Button: React.FC<ButtonType> = (props) => {
    const onClickHandler = () => {
        props.onClickCallback && props.onClickCallback()
    };

    return (
        <button onClick={onClickHandler} disabled={props.disabled} className={styles.button}>{props.name}</button>
    );
};

export default Button;