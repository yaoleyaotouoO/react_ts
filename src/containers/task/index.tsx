import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import RootStore from '../../store/store';
const styles = require('./index.css');

import Button from '../../components/button';
import Count from '../../components/count';
import List from '../../components/list';
import ListItem from '../../components/listItem';
import Input from '../../components/Input';


interface ITask {
    id: number;
    name: string;
    isComplete: boolean;
}

export interface TaskProps {
    rootStore?: RootStore;
}

export interface TaskState {
    task: string;
    warning: string;
}

@inject('rootStore')
@observer
export default class Task extends React.Component<TaskProps, TaskState> {
    constructor(props: TaskProps) {
        super(props);

        this.state = {
            task: '',
            warning: ''
        }
    }

    componentDidMount() {
        const { rootStore: { taskStore } } = this.props;

        taskStore.fetchTaskList();
    }

    deleteTask = (taskId: number) => {
        const { rootStore: { taskStore } } = this.props;

        taskStore.deleteTask(taskId);
    }

    changeTaskStatus = (taskId: number, value: boolean) => {
        const { rootStore: { taskStore } } = this.props;

        taskStore.changeTaskStatus(taskId, value);
    }

    submit = () => {
        const { task, warning } = this.state;
        const { rootStore: { taskStore } } = this.props;

        if (task.trim() === '') {
            this.setState({ warning: '请输入任务。' });
            return;
        }

        this.setState({ task: '', warning: '' });
        taskStore.addTask(task);
    }

    public render() {
        const { task, warning } = this.state;
        const { rootStore: { taskStore } } = this.props;
        const { taskList } = taskStore;

        return (
            <div className={styles.task_center}>

                <p className={styles.task_text_center}>任务便签</p>

                <List>
                    {
                        taskList.map(x => {
                            return <ListItem
                                key={x.id}
                                deleteTask={(taskId: number) => this.deleteTask(taskId)}
                                changeTaskStatus={(taskId: number, value: boolean) => this.changeTaskStatus(taskId, value)}
                                taskId={x.id}
                                name={x.name}
                                isComplete={x.isComplete}
                            />
                        })
                    }
                </List>

                {(!task && warning) && <p style={{ color: 'red' }}>{warning}</p>}

                <Count
                    total={taskList.length}
                    complete={taskList.filter(x => x.isComplete).length} />

                <Input
                    lable={'任务'}
                    value={task}
                    placeholder={'安排新的任务吧。。。'}
                    onChange={(task: string) => this.setState({ task })}
                    onEnter={() => this.submit()} />

                <Button onClick={() => this.submit()}>保存任务</Button>
            </div>
        );
    }
}