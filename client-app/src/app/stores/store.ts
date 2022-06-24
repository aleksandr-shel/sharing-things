import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import profileSlice from "./slices/profileSlice";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";


const store = configureStore(
    {
        reducer: {
            videoReducer: videoSlice.reducer,
            modalReducer: modalSlice.reducer,
            userReducer: userSlice.reducer,
            profileReducer: profileSlice.reducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;