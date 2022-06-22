import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { fetchVideo, toggleFavorite } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'
import { Button } from 'react-bootstrap';
import agent from '../../../app/api/agent';
export default function VideoSection(){

    const {id} = useParams();
    const {selectedVideo, favoriteList} = useAppSelector(state => state.videoReducer);
    const dispatch = useAppDispatch();
    const [favorite, setFavorite] = useState(false);

    useEffect(()=>{
        if (!selectedVideo && id){
            dispatch(fetchVideo(id))
        }
        async function isFavorite(){
        
            if (selectedVideo !== null){
                if (favoriteList.length !== 0){
                    if (favoriteList.some(video => video.id === selectedVideo.id)){
                        setFavorite(true);
                    } else {
                        setFavorite(false);
                    }
                } else {
                    setFavorite(await agent.Videos.isFavorite(selectedVideo.id))
                }
            }
        }
        isFavorite()
    },[dispatch,  selectedVideo, favoriteList, favoriteList.length, id])

    function likeButtonHandle(){
        if (selectedVideo !== null){
            dispatch(toggleFavorite(selectedVideo))
            setFavorite(!favorite)
        }
    }
    
    return (
        <div className='mt-3'>
            <ReactPlayer width={'100%'} height={'100%'} controls url={selectedVideo?.videoUrl}/>
            <h2>{selectedVideo?.title}</h2>
            <div className='w-100'>
                <div>
                    <Button variant='light' onClick={likeButtonHandle}>
                        {favorite ?
                            <AiFillLike size={'1.5em'}/>
                            :
                            <AiOutlineLike size={'1.5em'}/>
                        }
                    </Button>
                </div>
                <div className='d-flex justify-content-between border p-2'>
                    <h4>
                        {selectedVideo?.owner.displayName}
                    </h4>
                    <Button variant='primary'>
                        Subscribe
                    </Button>
                </div>
            </div>
        </div>
    )
}