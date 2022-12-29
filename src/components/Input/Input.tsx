import React, {ChangeEvent} from 'react';

type InputType = {
    value: number
    className: string
    onChange: (event: ChangeEvent<HTMLInputElement>)=>void
}

const Input: React.FC<InputType> = (props) => {


    return (
        <input
            type="number"
            onChange={props.onChange}
            value={props.value}
            className={props.className}/>
    );
};

export default Input;