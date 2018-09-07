import * as React from 'react';
const styles = require('./index.css');

interface CountProps {
    complete: number;
    total: number;
}

const Count = (props: CountProps) => {
    const { complete, total } = props;

    return (
        <div className={styles.task_count}>
            <span>{complete || 0} 已完成/ </span><span>{total || 0} 总数</span>
        </div>
    )
}

export default Count;
