import * as React from 'react';
import { observer } from 'mobx-react';
const styles = require('./index.css');

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
        <li className={styles.list_li}>
            <input className={styles.list_check} type="checkbox" checked={isComplete} onChange={e => changeTaskStatus(taskId, e.target.checked)} />
            <p>{name}</p>
            <a className={styles.list_delete} href="javascript:void(0)" onClick={() => deleteTask(taskId)}>删除</a>
        </li>
    )
}

export default observer(ListItem);
