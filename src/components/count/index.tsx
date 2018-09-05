import * as React from 'react';


interface CountProps {
    complete: number;
    total: number;
}

const Count = (props: CountProps) => {
    const { complete, total } = props;

    return (
        <div>
            <span>{complete || 0} 已完成数/ </span><span>{total || 0} 总数</span>
        </div>
    )
}

export default Count;
