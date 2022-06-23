import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Video } from '../../../app/models/Video';
import { fetchFavoriteVideosList, videoActions } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';


export default function FavoriteList(){

    const {favoriteList, loadingFavorite} = useAppSelector(state => state.videoReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if (favoriteList.length == 0){
            dispatch(fetchFavoriteVideosList())
        }
    },[dispatch, favoriteList.length])

    function selectVideo(id:string, video: Video){
        dispatch(videoActions.setSelectedVideo(video));
        navigate(`/videos/${id}`)
    }

    if (loadingFavorite) return <LoadingComponent content='Loading favorites...'/>

    return(
        <ListGroup className='w-75'>
            {favoriteList.map(video =>{
                return (
                    <ListGroup.Item key={video.id} className='d-flex'  action onClick={()=>selectVideo(video.id, video)}>
                        <div className='w-25'>
                            <video width={'100%'}>
                                <source src={video.videoUrl + '#t=0.5'}/>
                            </video>
                        </div>
                        <div className='ms-5'>
                            <h4>{video.title}</h4>
                            <h6>
                                Author: {video.owner.displayName}
                            </h6>
                        </div>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}