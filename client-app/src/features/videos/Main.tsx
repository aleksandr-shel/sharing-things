import React, { useEffect } from "react";
import { fetchVideos } from "../../app/stores/actions/videoActions";
import { useAppDispatch, useAppSelector } from "../../app/stores/redux-hooks";


export default function Main(){

    const dispatch = useAppDispatch();
    const {videos} = useAppSelector(state => state.videoReducer);

    useEffect(()=>{
        dispatch(fetchVideos())
    }, [dispatch])

    return (
        <>
            {
                videos.map((video)=>(
                    <div key={video.id}>
                        {video.title}
                    </div>
                ))
            }
        </>
    )
}