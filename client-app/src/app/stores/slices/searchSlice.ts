import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../models/Profile";
import { Video } from "../../models/Video";


interface SearchState{
    list: Profile[] | Video[];
    loading: boolean;
}

const initialState : SearchState = {
    list: [],
    loading: false
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setList: (state, action: PayloadAction<Profile[] | Video[]>)=>{
            state.list = action.payload;
        },
        setLoading: (state, action:PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    }
})



export default searchSlice