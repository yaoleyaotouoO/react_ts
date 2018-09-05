import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '../../components/button';
import Count from '../../components/count';
import List from '../../components/list';
import ListItem from '../../components/listItem';
import Task from '../../components/task';

interface INote {
    id: number;
    text: string;
    isComplete: boolean;
}

export interface NoteProps {
}

export interface NoteState {
    data: INote[];
}


@inject('rootStore')
@observer
export default class Note extends React.Component<NoteProps, NoteState> {
    constructor() {
        super();

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const
    }


    deleteItem = (taskId: number) => {

    }

    changeItem = (taskId: number, value: boolean) => {

    }


    public render() {
        const { data } = this.state;

        return (
            <div>
                <p>任务便签</p>
                <List>
                    {
                        data.map(x => {
                            <ListItem
                                deleteItem={(taskId: number) => this.deleteItem(taskId)}
                                changeItem={(taskId: number, value: boolean) => this.changeItem(taskId, value)}
                                taskId={x.id}
                                text={x.text}
                                isComplete={x.isComplete}
                            />
                        })
                    }
                </List>

                {/* <Count></Count>

                <Task></Task>

                <Button></Button> */}
            </div>
        );
    }
}
