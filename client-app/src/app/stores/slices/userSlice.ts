import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";


interface UserState{
    token: string | null,
    user: User | null,
    loading: boolean,
}

const initialState:UserState={
    token: null,
    user: null,
    loading: false,
}



const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<User>)=>{
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>)=>{
            state.token = action.payload;
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
            window.localStorage.removeItem('sharing-things-token')
        },
        setLoading: (state, action: PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    }
})

export const {logout, setToken, setUser, setLoading} = userSlice.actions;

export default userSlice;