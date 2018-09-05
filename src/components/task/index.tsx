import * as React from 'react';

export interface TaskProps {
    lable: string;
    value: string;
    placeholder: string;
    onChange(value: string): void;
    onKeyUp(): void;
}

export interface TaskState {
}

export default class Task extends React.Component<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        const { lable, value, placeholder, onChange = () => { }, onKeyUp = () => { } } = this.props;

        return (
            <div>
                <label>{lable}: </label>
                <input
                    value={value}
                    placeholder={placeholder}
                    onKeyUp={e => { if (e.keyCode === 13) { onKeyUp() } }}
                    onChange={e => onChange(e.target.value)} />
            </div>
        );
    }
}
