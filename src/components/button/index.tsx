import * as React from 'react';
const styles = require('./index.css');

interface ButtonProps {
    children: React.ReactNode;
    onClick(): void;
}

const Button = (props: ButtonProps) => {
    const { children, onClick = () => { } } = props;

    return (
        <div className={styles.task_div}>
            <button className={styles.task_btn} onClick={() => { onClick() }}>{children}</button>
        </div>
    )
}

export default Button;
