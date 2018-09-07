import { observable, action, runInAction } from 'mobx';
import Api from '../util/api';
import { AxiosInstance } from 'axios';


interface IRootStore {
    axios: AxiosInstance;
}

interface ITask {
    id: number;
    name: string;
    isComplete: boolean;
}

export default class TaskStore {
    constructor(public rootStore: IRootStore) {
    }

    @observable
    taskList: ITask[] = [];

    @action
    fetchTaskList = async () => {
        const res = await this.rootStore.axios.get(Api.task.fetchTaskList);
        runInAction('fetchTaskList', () => {
            this.taskList = res.data || [];
        });
    }

    @action
    deleteTask = async (taskId: number) => {
        const res = await this.rootStore.axios.post(Api.task.deleteTask, { taskId });
        this.fetchTaskList();
    }

    @action
    changeTaskStatus = async (taskId: number, value: boolean) => {
        const res = await this.rootStore.axios.post(Api.task.changeTaskStatus, { taskId, value });
        this.fetchTaskList();
    }

    @action
    addTask = async (name: string) => {
        const res = await this.rootStore.axios.post(Api.task.addTask, { name });
        this.fetchTaskList();
    }
}