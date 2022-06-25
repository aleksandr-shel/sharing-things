import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import profileSlice from "../slices/profileSlice";
import { RootState } from "../store";






export const profileActions = profileSlice.actions;

export const getProfile = (username: string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        dispatch(profileActions.setLoadingProfile(true))
        const response = await agent.Profiles.getSingleProfile(username)
        dispatch(profileActions.setSelectedProfile(response))
        dispatch(profileActions.setLoadingProfile(false))
    }
}


export const getProfileVideos = (username: string):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async (dispatch)=>{
        dispatch(profileActions.setLoadingProfileVideos(true))
        const response = await agent.Profiles.getProfileVideos(username)
        dispatch(profileActions.setProfileVideos(response))
        dispatch(profileActions.setLoadingProfileVideos(false))
    }
}


export const updateFollowing = (username:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch, getState)=>{
        dispatch(profileActions.setUpdatingFollowing(true))
        const response = await agent.Profiles.updateFollowing(username);
        if (response === 200){
            const following = getState().profileReducer.selectedProfile?.following
            dispatch(profileActions.updateSelectedProfileFollowing(!following))
            const profile = getState().profileReducer.selectedProfile
            if (following){
                dispatch(profileActions.removeFollowing(profile!))
            } else {
                dispatch(profileActions.addFollowing(profile!))
            }
        }
        
        dispatch(profileActions.setUpdatingFollowing(false))
    }
}


export const fetchFollowingList = ():ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        const response = await agent.Profiles.listFollowing()
        dispatch(profileActions.setFollowingList(response))
    }
}

