import axios from "axios";

const Api = {
    axios: axios.create({
        baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:8081/' : ''
    }),
  //  axiosPure: axios,
}

export default Api;