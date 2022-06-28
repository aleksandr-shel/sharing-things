import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import searchSlice from "../slices/searchSlice";
import { RootState } from "../store";



export const searchActions = searchSlice.actions;


export const search = (query: string) : ThunkAction<void, RootState, unknown, AnyAction>=>{
    return async (dispatch)=>{
        dispatch(searchActions.setLoading(true))
        const response = await agent.Search.list(query);
        dispatch(searchActions.setList(response))
        dispatch(searchActions.setLoading(false))
    }
}