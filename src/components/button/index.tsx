import * as React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick(): void;
}

const Button = (props: ButtonProps) => {
    const { children, onClick = () => { } } = props;

    return (
        <button onClick={() => { onClick() }}>{children}</button>
    )
}

export default Button;
