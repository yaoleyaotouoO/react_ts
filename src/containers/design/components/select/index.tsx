import * as React from 'react';

import { DropDownWithFilter, IIdName } from '../../../../components/dropDownWithFilter';


export interface ISelectProps {

}

export interface ISelectState {
    selectedIds: number[];
    rawData: IIdName[];
}

export default class Select extends React.Component<ISelectProps, ISelectState>{
    constructor(props: ISelectProps) {
        super(props);

        this.state = {
            selectedIds: [],
            rawData: [
                { id: 1, name: 'Animal Habitat 1' },
                { id: 2, name: 'Animal Habitat 2' },
                { id: 3, name: 'Animal Habitat 3' },
                { id: 4, name: 'Animal Habitat 4' },
                { id: 5, name: 'Animal Habitat 5' },
                { id: 6, name: 'Animal Habitat 6' },
                { id: 7, name: 'Animal Habitat 7' },
                { id: 8, name: 'Animal Habitat 8' },
                { id: 9, name: 'Animal Habitat 9' },
                { id: 10, name: 'Animal Habitat 10' },
                { id: 11, name: 'Animal Habitat 11' },
                { id: 12, name: 'Animal Habitat 12' },
            ]
        }
    }

    toggleCheck = (checked: boolean, checkedId: number) => {
        let { selectedIds } = this.state;

        if (!checked) {
            selectedIds = selectedIds.filter(x => x !== checkedId);
            this.setState({ selectedIds });
            return;
        }

        selectedIds.push(checkedId);
        this.setState({ selectedIds });
    }

    toggleCheckAll = (checked: boolean) => {
        const { rawData } = this.state;

        if (!checked) {
            this.setState({ selectedIds: [] });
            return;
        }

        let selectedIds = rawData.map(x => x.id);
        this.setState({ selectedIds });
    }

    render() {
        const { rawData, selectedIds } = this.state;

        return <div style={{ width: '216px', padding: '5px' }}>
            <DropDownWithFilter
                data={{ rawData, selectedIds }}
                placeholder="Filter by Service Category"
                toggleCheck={(checked: boolean, checkedId: number) => this.toggleCheck(checked, checkedId)}
                toggleCheckAll={(checked: boolean) => this.toggleCheckAll(checked)}
            />
        </div>;
    }
}