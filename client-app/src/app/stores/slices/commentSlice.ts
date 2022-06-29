import { HubConnection } from '@microsoft/signalr';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Comment, VideoCommentsModel } from '../../models/Comment';

interface CommentState{
    videoComments: VideoCommentsModel | null;
    loadingComments: boolean;
    hubConnection: HubConnection | null;
    comments: Comment[];
}

const initialState : CommentState= {
    videoComments: null,
    loadingComments: false,
    hubConnection: null,
    comments: []
}

const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{
        setVideoComments: (state, action: PayloadAction<VideoCommentsModel>)=>{
            state.videoComments = action.payload;
            state.comments = action.payload.comments;
        },
        setLoadingComments: (state, action: PayloadAction<boolean>)=>{
            state.loadingComments = action.payload;
        },
        addComment: (state, action: PayloadAction<any>)=>{
            state.comments.unshift(action.payload);
        },
        deleteComment: (state, action: PayloadAction<string>)=>{
            state.comments = state.comments.filter(comment => comment.id !== action.payload)
        },
        setHubConnection: (state, action: PayloadAction<HubConnection | null>)=>{
            state.hubConnection = action.payload;
        },
        stopHubConnection: (state)=>{
            state.hubConnection?.stop().catch(error => console.log(`Error stoping connection`, error))
        },
        clearComments: (state)=>{
            state.videoComments = null;
            state.comments = [];
        },
    }
})

export const {stopHubConnection, clearComments} = commentSlice.actions

export default commentSlice;
