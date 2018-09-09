import * as React from 'react';
import { task_div, task_btn } from './index.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick(): void;
}

const Button = (props: ButtonProps) => {
    const { children, onClick = () => { } } = props;

    return (
        <div className={task_div}>
            <button className={task_btn} onClick={() => { onClick() }}>{children}</button>
        </div>
    )
}

export default Button;
