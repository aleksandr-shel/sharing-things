import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { fetchVideo, toggleFavorite } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'
import { Button } from 'react-bootstrap';
import agent from '../../../app/api/agent';
import ProfileInfo from './ProfileInfo';


export default function VideoSection(){

    const {id} = useParams();
    const {selectedVideo, favoriteList} = useAppSelector(state => state.videoReducer);
    const {user} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [favorite, setFavorite] = useState(false);

    useEffect(()=>{
        if (!selectedVideo && id){
            dispatch(fetchVideo(id))
        }
        async function isFavorite(){
        
            if (selectedVideo !== null && user !== null){
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
    },[dispatch, user, selectedVideo, favoriteList, favoriteList.length, id])

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
                {
                    user !== null &&
                    <>
                        <div>
                            <Button variant='light' onClick={likeButtonHandle}>
                                {favorite ?
                                    <AiFillLike size={'1.5em'}/>
                                    :
                                    <AiOutlineLike size={'1.5em'}/>
                                }
                            </Button>
                        </div>
                        <ProfileInfo profile={selectedVideo?.owner!}/>
                    </>
                }
            </div>
        </div>
    )
}