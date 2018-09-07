import * as React from 'react';
import { observer } from 'mobx-react';
const styles = require('./index.css');

import ListItem, { ListItemProps } from '../listItem';

interface ListProps {
    children: React.ReactNode;
}

const List = (props: ListProps) => {
    const { children } = props;

    return (
        <ul className={styles.task_ul}>
            {children}
        </ul>
    )
}

export default observer(List);
