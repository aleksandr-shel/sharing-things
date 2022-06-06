import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";


const store = configureStore(
    {
        reducer: {
            videoReducer: videoSlice.reducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;