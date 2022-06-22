import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../models/User';
import { Video } from '../models/Video';
import store from '../stores/store';

const sleep = (delay: number)=>{
    return new Promise(resolve =>{
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config=>{
    const token = store.getState().userReducer.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use( async response =>{
    await sleep(1000);
    return response;
}, (error: AxiosError)=>{
    const {status, statusText, data}= error.response!;
    switch(status){
        case 400:
            if (typeof data === 'string'){
                toast.error(data);
            }
            else {
                toast.error('400 Bad Request: '+ statusText);
            }
            
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
    post: <T> (url: string, body:{})=> axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body:{})=> axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string)=> axios.delete<T>(url).then(responseBody)
}


const Videos = {
    list: ()=> requests.get<Video[]>('/video/list'),
    details: (id:string)=> requests.get<Video>(`/video/${id}`),
    uploadVideo: (file: File, title:string)=> {
        let formData = new FormData();
        formData.append('File', file);
        formData.append('Title', title);
        return axios.post<Video>('video', formData)
    },
    favoriteList: () => requests.get<Video[]>('/favorite/list'),
    toggleFavorite: (id: string)=> axios.post(`/favorite/${id}`, {}),
    isFavorite: (id:string)=>requests.get<boolean>(`/favorite/${id}`)
}

const Account = {
    login: (user:UserFormValues)=> requests.post<User>('/account/login', user),
    register: (user:UserFormValues)=> requests.post<User>('/account/register', user),
    current: ()=> requests.get<User>('/account/current')
}

const agent = {
    Videos,
    Account
}

export default agent;