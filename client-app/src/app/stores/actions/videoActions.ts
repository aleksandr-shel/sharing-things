import videoSlice from "../slices/videoSlice";
import agent from "../../api/agent";
import { AnyAction, ThunkAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Video } from "../../models/Video";
import { AxiosResponse } from "axios";

export const videoActions = videoSlice.actions;


export const fetchVideos = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        if(getState().videoReducer.videos.length <= 1){
            dispatch(videoActions.setLoading(true))
            const response:Video[] = await agent.Videos.list();
            dispatch(videoActions.setVideos(response))
            dispatch(videoActions.setLoading(false))
        }
    }
}

export const fetchVideo = (id: string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        const response:Video = await agent.Videos.details(id);
        dispatch(videoActions.setSelectedVideo(response));
    }
}


export const postVideo = (title: string, file: File):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        const response = await agent.Videos.uploadVideo(file, title);
        const video = response.data;
        dispatch(videoActions.addVideo(video));
    }
}


export const fetchFavoriteVideosList = ():ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch)=>{
        dispatch(videoActions.setLoadingFavorite(true))
        const response = await agent.Videos.favoriteList();
        dispatch(videoActions.setFavoriteList(response))
        dispatch(videoActions.setLoadingFavorite(false));
    }
}

export const toggleFavorite = (video: Video):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        const response : AxiosResponse = await agent.Videos.toggleFavorite(video.id);
        if (response.status == 200){
            dispatch(videoActions.toggleFavorite(video))
        }
    }
}