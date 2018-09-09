import * as React from 'react';
import { observer } from 'mobx-react';
import { task_ul } from './index.css';

import ListItem, { ListItemProps } from '../listItem';

interface ListProps {
    children: React.ReactNode;
}

const List = (props: ListProps) => {
    const { children } = props;

    return (
        <ul className={task_ul}>
            {children}
        </ul>
    )
}

export default observer(List);
