import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Profile } from '../../models/Profile'

interface ProfileState {
    selectedProfile: Profile | null,
    followingList: Profile[],
    profilesList: Profile[],
    loadingProfile: boolean,
    updatingFollowing: boolean
}

const initialState: ProfileState = {
    selectedProfile: null,
    followingList: [],
    profilesList: [],
    loadingProfile: false,
    updatingFollowing: false
}


const profileSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setSelectedProfile: (state, action: PayloadAction<Profile | null>)=>{
            state.selectedProfile = action.payload
        },
        setFollowingList: (state, action: PayloadAction<Profile[] | []>)=>{
            state.followingList = action.payload;
        },
        addFollowing: (state, action: PayloadAction<Profile>)=>{
            state.followingList.push(action.payload)
        },
        removeFollowing: (state, action: PayloadAction<Profile>)=>{
            state.followingList = state.followingList.filter(x =>{
                return x.username !== action.payload.username;
            })
        },
        setProfilesList: (state, action: PayloadAction<Profile[]>)=>{
            state.profilesList = action.payload;
        },
        addProfilesList: (state, action: PayloadAction<Profile[]>)=>{
            state.profilesList = state.profilesList.concat(action.payload);
        },
        setLoadingProfile: (state, action: PayloadAction<boolean>)=>{
            state.loadingProfile = action.payload;
        },
        setUpdatingFollowing: (state, action: PayloadAction<boolean>)=>{
            state.updatingFollowing = action.payload;
        },
        updateSelectedProfileFollowing: (state, action: PayloadAction<boolean>)=>{
            const followers =  state.selectedProfile?.followersCount;
            const subs = action.payload ? followers! + 1 : followers! -1 
            state.selectedProfile = {...state.selectedProfile!, following: action.payload, followersCount: subs}
        }
    }
})

export const {setSelectedProfile, setFollowingList, addFollowing, removeFollowing,
    setProfilesList, addProfilesList} = profileSlice.actions;

export default profileSlice;