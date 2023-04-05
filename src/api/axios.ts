import axios from "axios";

export const axiosPrivate = axios.create({
    baseURL : process.env.REACT_APP_ENDPOINT ,
    headers : {
        'Content-Type' : 'application/json',
    } ,
})