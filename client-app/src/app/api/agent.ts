import axios, { AxiosResponse } from 'axios';
import { Video } from '../models/Video';

axios.defaults.baseURL = 'https://localhost:5001/api'

const responseBody = <T>(response: AxiosResponse<T>)=>{
    return response.data;
}


const requests = {
    get: <T> (url: string)=> axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body:{})=> axios.get<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{})=> axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string)=> axios.delete<T>(url).then(responseBody)
}


const Videos = {
    list: ()=> requests.get<Video[]>('/video/list'),
    details: (id:string)=> requests.get<Video>(`/video/${id}`)
}


const agent = {
    Videos
}

export default agent;