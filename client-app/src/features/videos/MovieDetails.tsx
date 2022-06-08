import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/stores/redux-hooks';

export default function MovieDetails(){

    const {id} = useParams();
    const {selectedVideo} = useAppSelector(state => state.videoReducer);

    return (
        <>
            <h3>{selectedVideo?.title}</h3>
            <video width="320" height="240" controls>
                <source src={`${selectedVideo?.videoUrl}`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </>
    )
}