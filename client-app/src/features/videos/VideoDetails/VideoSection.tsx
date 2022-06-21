import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideo } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';

export default function VideoSection(){

    const {id} = useParams();
    const {selectedVideo} = useAppSelector(state => state.videoReducer);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (!selectedVideo && id){
            dispatch(fetchVideo(id))
        }
    },[dispatch, selectedVideo, id])

    
    return (
        <div className='mt-3'>
            <video key={selectedVideo?.videoUrl} className='w-100' controls preload='auto'>
                <source src={selectedVideo?.videoUrl} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <h4>{selectedVideo?.title}</h4>
        </div>
    )
}