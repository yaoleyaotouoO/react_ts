import * as React from 'react';
import { observer } from 'mobx-react';

import ListItem, { ListItemProps } from '../listItem';

interface ListProps {
    children: React.ReactNode;
}

const List = (props: ListProps) => {
    const { children } = props;
    
    return (
        <ul>
            {children}
        </ul>
    )
}

export default observer(List);
