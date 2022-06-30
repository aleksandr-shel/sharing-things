import videoSlice, { addVideos, setPagination, setVideos } from "../slices/videoSlice";
import agent from "../../api/agent";
import { AnyAction, ThunkAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Video } from "../../models/Video";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const videoActions = videoSlice.actions;


export const fetchVideos = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        const params = new URLSearchParams();
        const {pagingParam} = getState().videoReducer;
        params.append('pageNumber', pagingParam.pageNumber.toString());
        params.append('pageSize', pagingParam.pageSize.toString())
        dispatch(videoActions.setLoading(true))
        const result  = await agent.Videos.list(params);
        dispatch(setVideos(result.data))
        dispatch(setPagination(result.pagination))
        dispatch(videoActions.setLoading(false))
    }
}


export const fetchNextVideos = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        const params = new URLSearchParams();
        const {pagingParam} = getState().videoReducer;
        params.append('pageNumber', pagingParam.pageNumber.toString());
        params.append('pageSize', pagingParam.pageSize.toString())
        dispatch(videoActions.setLoading(true))
        const result  = await agent.Videos.list(params);
        dispatch(addVideos(result.data))
        dispatch(setPagination(result.pagination))
        dispatch(videoActions.setLoading(false))
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

export const deleteVideo = (id:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch)=>{
        const status = await agent.Videos.deleteVideo(id)
        if (status === 200){
            dispatch(videoActions.deleteVideo(id))
        }
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
        if (response.status === 200){
            dispatch(videoActions.toggleFavorite(video))
            toast.info('Updated')
        }
    }
}


export const fetchSubscriptionVideos = (): ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async(dispatch)=>{
        dispatch(videoActions.setLoadingSubscriptions(true))
        const response = await agent.Videos.subscriptionsList();
        dispatch(videoActions.setSubscriptionsList(response))
        dispatch(videoActions.setLoadingSubscriptions(false))
    }
}