import axios from "axios";

const Api = {
    axios: axios.create({
        baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3333/' : ''
    }),
    //  axiosPure: axios,
    task: {
        fetchTaskList: '/task/fetchTaskList',
        deleteTask: '/task/deleteTask',
        changeTaskStatus: '/task/changeTaskStatus',
        addTask: '/task/addTask'
    }
}

export default Api;