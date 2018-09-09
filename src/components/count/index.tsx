import * as React from 'react';
import { task_count } from './index.css';

interface CountProps {
    complete: number;
    total: number;
}

const Count = (props: CountProps) => {
    const { complete, total } = props;

    return (
        <div className={task_count}>
            <span>{complete || 0} 已完成/ </span><span>{total || 0} 总数</span>
        </div>
    )
}

export default Count;
