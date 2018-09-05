import { configure } from "mobx";
import { AxiosInstance } from 'axios';
import Api from '../util/api';

configure({ enforceActions: 'observed' });
class RootStore {
    axios: AxiosInstance;
    constructor() {
        this.axios = Api.axios;
    }
}

export default new RootStore();