import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./slices/commentSlice";
import modalSlice from "./slices/modalSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";


const store = configureStore(
    {
        reducer: {
            videoReducer: videoSlice.reducer,
            modalReducer: modalSlice.reducer,
            userReducer: userSlice.reducer,
            profileReducer: profileSlice.reducer,
            searchReducer: searchSlice.reducer,
            commentsReducer: commentSlice.reducer
        },
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
            serializableCheck: false
        })
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;