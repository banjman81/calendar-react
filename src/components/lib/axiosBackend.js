import axios from "axios";

let url = "http://localhost:3001"

const AxiosBackend = axios.create({
    baseURL : url,
    timeout: 50000,
    headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
})

export default AxiosBackend