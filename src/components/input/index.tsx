import * as React from 'react';


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
        <div>
            <label>{lable}: </label>
            <input
                value={value}
                placeholder={placeholder}
                onKeyUp={e => { if (e.keyCode === 13) { onEnter() } }}
                onChange={e => onChange(e.target.value)} />
        </div>
    );
}

export default Input;
