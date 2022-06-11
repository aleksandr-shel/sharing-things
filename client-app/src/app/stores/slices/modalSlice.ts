import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ModalState{
    open: boolean;
    body: JSX.Element | null
}

const initialState:ModalState ={
    open: false,
    body: null
}


const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers: {
        setActive:(state, action: PayloadAction<boolean>)=>{
            state.open = action.payload;
        },
        setBody:(state, action: PayloadAction<JSX.Element | null>)=>{
            state.body = action.payload;
        },
        closeModal:(state)=>{
            state.body = null;
            state.open = false;
        },
        openModal:(state, action: PayloadAction<JSX.Element>)=>{
            state.body = action.payload;
            state.open = true;
        },
    }
})

export const {closeModal, openModal} = modalSlice.actions;


export default modalSlice;