import { createSlice, PayloadAction} from '@reduxjs/toolkit';


interface SidebarStateModel{
    isDrawer: boolean,
    isExpanded: boolean,
}


const initialState: SidebarStateModel = {
    isDrawer: false,
    isExpanded: true
}

const sidebarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        setDrawer:(state, action: PayloadAction<boolean>)=>{
            state.isDrawer = action.payload;
        },
        setExpanded:(state, action: PayloadAction<boolean>)=>{
            state.isExpanded = action.payload;
        },
    }
})

export const {setDrawer, setExpanded} = sidebarSlice.actions;

export default sidebarSlice;