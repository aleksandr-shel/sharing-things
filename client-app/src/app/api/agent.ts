import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { PaginatedResult } from '../models/pagination';
import { Profile } from '../models/Profile';
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
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination){
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error:AxiosError)=>{
    const {status} = error.response!;
    switch(status){
        case 400:
            toast.error('400 Bad request');
            console.log(error.response?.data)
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
    list: (params : URLSearchParams)=> axios.get<PaginatedResult<Video[]>>('/video/list',{params}).then(responseBody),
    details: (id:string)=> requests.get<Video>(`/video/${id}`),
    uploadVideo: (file: File, title:string)=> {
        let formData = new FormData();
        formData.append('File', file);
        formData.append('Title', title);
        return axios.post<Video>('video', formData,{
            headers: {'Content-type':'multipart/form-data'}
        })
    },
    deleteVideo: (id:string) => axios.delete(`/video/${id}`).then(response => response.status),
    favoriteList: () => requests.get<Video[]>('/favorite/list'),
    toggleFavorite: (id: string)=> axios.post(`/favorite/${id}`, {}),
    isFavorite: (id:string)=>requests.get<boolean>(`/favorite/${id}`),
    subscriptionsList: ()=>requests.get<Video[]>('video/subscriptions')
}

const Account = {
    login: (user:UserFormValues)=> requests.post<User>('/account/login', user),
    register: (user:UserFormValues)=> requests.post<User>('/account/register', user),
    current: ()=> requests.get<User>('/account/current')
}

const Profiles = {
    listFollowing: () => requests.get<Profile[]>(`/follow/list`),
    updateFollowing: (username:string)=>axios.post(`/follow/${username}`,{}).then(response => response.status),
    listProfiles: () => requests.get<Profile[]>('/profile/list'),
    getSingleProfile: (username:string) => requests.get<Profile>(`/profile/list/${username}`),
    getProfileVideos: (username: string)=> requests.get<Video[]>(`/profile/${username}/videos`)
}

const Search = {
    list: (query:string)=> axios.get<Profile[] | Video[]>(`search?q=${query}`).then(responseBody),

}

const agent = {
    Videos,
    Account,
    Profiles,
    Search
}

export default agent;