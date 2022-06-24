import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../models/Video";


interface VideoStateModel{
    videos: Video[],
    selectedVideo: Video | null,
    loading: boolean,
    downloadVideoLoading: boolean,
    favoriteList: Video[],
    loadingFavorite: boolean,
    subscriptionsVideoList: Video[],
    loadingSubscriptions: boolean
}

const initialState:VideoStateModel = {
    videos: [],
    selectedVideo: null,
    loading: false,
    downloadVideoLoading: false,
    favoriteList: [],
    loadingFavorite: false,
    subscriptionsVideoList: [],
    loadingSubscriptions: false
}

const videoSlice = createSlice({
    name:'videos',
    initialState,
    reducers:{
        setVideos:(state, action: PayloadAction<Video[]>)=>{
            state.videos = action.payload
        },
        setSelectedVideo:(state, action: PayloadAction<Video | null>)=>{
            state.selectedVideo = action.payload;
        },
        setLoading:(state, action: PayloadAction<boolean>)=>{
            state.loading = action.payload;
        },
        addVideo: (state, action: PayloadAction<Video>)=>{
            state.videos.push(action.payload);
        },
        setDownloadLoading: (state, action: PayloadAction<boolean>)=>{
            state.downloadVideoLoading = action.payload;
        },
        setFavoriteList: (state, action: PayloadAction<Video[]>)=>{
            state.favoriteList = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<Video>)=>{
            let favorites = state.favoriteList;
            const video :Video = action.payload;
            if (favorites.some(vid => vid.id === video.id)){
                favorites = favorites.filter(vid => vid.id !== video.id)
            } else {
                favorites.push(video);
            }
            state.favoriteList = favorites;
        },
        setLoadingFavorite: (state, action: PayloadAction<boolean>)=>{
            state.loadingFavorite = action.payload;
        },
        setSubscriptionsList: (state, action: PayloadAction<Video[]>)=>{
            state.subscriptionsVideoList = action.payload;
        },
        setLoadingSubscriptions: (state,action: PayloadAction<boolean>)=>{
            state.loadingSubscriptions = action.payload;
        },
    }
})

export const {setFavoriteList, toggleFavorite, setVideos, setSelectedVideo} = videoSlice.actions;

export default videoSlice;