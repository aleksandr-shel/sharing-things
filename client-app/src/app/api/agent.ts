import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Video } from '../models/Video';

const sleep = (delay: number)=>{
    return new Promise(resolve =>{
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use( async response =>{
    await sleep(1000);
    return response;
}, (error: AxiosError)=>{
    const {status}= error.response!;
    switch(status){
        case 400:
            toast.error('400 Bad Request');
            break;
        case 401:
            toast.error('401 Unauthorized');
            break;
        case 404:
            toast.error('404 Not Found')
            break;
        case 500:
            toast.error('500 Server Error')
            break;
    }
    return Promise.reject(error);
})

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