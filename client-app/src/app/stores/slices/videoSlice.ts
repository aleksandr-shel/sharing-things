import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../models/Video";


interface VideoStateModel{
    videos: Video[],
    selectedVideo: Video | null
}

const initialState:VideoStateModel = {
    videos: [],
    selectedVideo: null
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
        }
    }
})


export default videoSlice;