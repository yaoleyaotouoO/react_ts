import * as React from 'react';

import { DropDownWithFilter, IIdName, IDropDownConfing } from '../../../../components/dropDownWithFilter';


export interface ISelectProps {

}

export interface ISelectState {

}

export default class Select extends React.Component<ISelectProps, ISelectState>{
    constructor(props: ISelectProps) {
        super(props);
    }

    toggleCheck = () => {
        return true;
    }

    toggleCheckAll = () => {

    }

    render() {
        const rawData: IIdName[] = [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' }
        ]

        const data: IDropDownConfing = {
            rawData,
            selectedIds: [1, 2]
        }

        return <DropDownWithFilter
            data={data}
            toggleCheck={() => this.toggleCheck()}
            toggleCheckAll={() => this.toggleCheckAll()}
        />;
    }

}