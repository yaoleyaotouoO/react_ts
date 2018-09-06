import { configure } from 'mobx';
import { AxiosInstance } from 'axios';
import Api from '../util/api';
import TaskStore from './TaskStore';

configure({ enforceActions: 'observed' });
class RootStore {
    axios: AxiosInstance;
    taskStore: TaskStore;
    constructor() {
        this.axios = Api.axios;
        this.taskStore = new TaskStore(this);
    }
}

export default RootStore;