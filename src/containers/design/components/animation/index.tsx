import * as React from 'react';

import Gallery from '../../../../components/gallery';


export interface IAnimationProps {

}

export interface IAnimationState {

}

class Animation extends React.Component<IAnimationProps, IAnimationState>{
    constructor(props: IAnimationProps) {
        super(props);
    }

    render() {
        return <div>
            <Gallery />
        </div>;
    }
}

export default Animation;