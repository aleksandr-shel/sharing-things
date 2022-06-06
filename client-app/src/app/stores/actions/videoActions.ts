import videoSlice from "../slices/videoSlice";
import agent from "../../api/agent";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Video } from "../../models/Video";

export const videoActions = videoSlice.actions;


export const fetchVideos = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        if(getState().videoReducer.videos.length === 0){
            const response:Video[] = await agent.Videos.list();
            dispatch(videoActions.setVideos(response))
        }
    }
}

export const fetchVideo = (id: string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        const response:Video = await agent.Videos.details(id);
        dispatch(videoActions.setSelectedVideo(response));
    }
}