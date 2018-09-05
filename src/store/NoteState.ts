import { observable, action, runInAction } from 'mobx';
import Api from '../util/api';
import { AxiosInstance } from 'axios';

interface IRootStore {
    axios: AxiosInstance;
}

interface INote {
    id: number;
    text: string;
    isComplete: boolean;
}

export default class NoteState {
    constructor(public rootStore: IRootStore) {
    }

    @observable
    noteList: INote[] = [];

    @action
    fetchNoteList() {
        this.noteList = [{ id: 1, text: 'xjxtest1', isComplete: true }];
    }
}