import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { VideoCommentsModel } from "../../models/Comment";
import commentSlice from "../slices/commentSlice";
import { RootState } from "../store";


const commentsActions = commentSlice.actions;

export const createHubConnection = (videoId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async(dispatch, getState)=>{
        dispatch(commentsActions.setLoadingComments(true))
        const hubConnection:HubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL + '?videoId=' + videoId, {
                accessTokenFactory: () => getState().userReducer.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        hubConnection.start().catch(error => console.log('Error establishing the connection: ', error))

        hubConnection.on('LoadComments', (videoComments: VideoCommentsModel)=>{
            dispatch(commentsActions.setVideoComments(videoComments))
        })

        hubConnection.on('ReceiveComment', (comment:Comment)=>{
            dispatch(commentsActions.addComment(comment))
        })

        hubConnection.on('DeleteComment', (commentId: string)=>{
            dispatch(commentsActions.deleteComment(commentId))
        })

        dispatch(commentsActions.setHubConnection(hubConnection))
        dispatch(commentsActions.setLoadingComments(false))
    }
}

export const addComment = (comment: any):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch,getState)=>{
        try{
            await getState().commentsReducer.hubConnection?.invoke("SendComment", comment)
        }catch(error){
            console.log(error);
        }
    }
}

export const removeComment = (videoId:string, commentId:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch,getState)=>{
        try{
            await getState().commentsReducer.hubConnection?.invoke("DeleteComment", videoId, commentId)
        }catch(error){
            console.log(error);
        }
    }
}