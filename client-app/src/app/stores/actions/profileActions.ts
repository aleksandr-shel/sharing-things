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


export const updateFollowing = (username:string):ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch, getState)=>{
        dispatch(profileActions.setUpdatingFollowing(true))
        const response = await agent.Profiles.updateFollowing(username);
        if (response === 200){
            dispatch(profileActions.updateSelectedProfileFollowing(!getState().profileReducer.selectedProfile?.following))
        }
        dispatch(profileActions.setUpdatingFollowing(false))
    }
}


