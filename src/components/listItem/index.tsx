import * as React from 'react';
import { observer } from 'mobx-react';

export interface ListItemProps {
    deleteItem(taskId: number): void;
    taskId: number;
    text: string;
    isComplete: boolean;
    changeItem(taskId: number, value: boolean): void;
}

const ListItem = (props: ListItemProps) => {
    const { deleteItem = () => { }, taskId, text, isComplete, changeItem = () => { } } = props;

    return (
        <li key={taskId}>
            <input type="checkbox" checked={isComplete} onChange={e => changeItem(taskId, e.target.checked)} />
            <p>{text}</p>
            <a href="javascript:void(0)" onClick={() => deleteItem(taskId)}>删除</a>
        </li>
    )
}

export default observer(ListItem);
