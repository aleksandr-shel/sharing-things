import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../models/Video";


interface VideoStateModel{
    videos: Video[],
    selectedVideo: Video | null,
    loading: boolean
}

const initialState:VideoStateModel = {
    videos: [],
    selectedVideo: null,
    loading: false
}

const videoSlice = createSlice({
    name:'videos',
    initialState,
    reducers:{
        setVideos:(state, action: PayloadAction<Video[]>)=>{
            state.videos = action.payload
        },
        setSelectedVideo:(state, action: PayloadAction<Video>)=>{
            state.selectedVideo = action.payload;
        },
        setLoading:(state, action: PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    }
})


export default videoSlice;