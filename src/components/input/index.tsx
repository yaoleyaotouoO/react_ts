import * as React from 'react';
import { task_input, task_input_div } from './index.css';

export interface InputProps {
    lable: string;
    value: string;
    placeholder: string;
    onChange(value: string): void;
    onEnter(): void;
}

const Input = (props: InputProps) => {
    const { lable, value, placeholder, onChange = () => { }, onEnter = () => { } } = props;

    return (
        <div className={task_input_div}>
            <label>{lable}: </label>
            <input
                className={task_input}
                value={value}
                placeholder={placeholder}
                onKeyUp={e => { if (e.keyCode === 13) { onEnter() } }}
                onChange={e => onChange(e.target.value)} />
        </div>
    );
}

export default Input;
