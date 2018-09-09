import * as React from 'react';
import { observer } from 'mobx-react';
import { list_li, list_check, list_name, list_name_complete, list_delete } from './index.css';

export interface ListItemProps {
    deleteTask(taskId: number): void;
    taskId: number;
    name: string;
    isComplete: boolean;
    changeTaskStatus(taskId: number, value: boolean): void;
}

const ListItem = (props: ListItemProps) => {
    const { deleteTask = () => { }, taskId, name, isComplete, changeTaskStatus = () => { } } = props;

    return (
        <li className={list_li}>
            <input className={list_check} type="checkbox" checked={isComplete} onChange={e => changeTaskStatus(taskId, e.target.checked)} />
            <p className={`${list_name} ${isComplete ? list_name_complete : ''}`}>{name}</p>
            <a className={list_delete} href="javascript:void(0)" onClick={() => deleteTask(taskId)}>删除</a>
        </li>
    )
}

export default observer(ListItem);
