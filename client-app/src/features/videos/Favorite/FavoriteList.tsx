import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoList from '../../../app/common/VideoList/VideoList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Video } from '../../../app/models/Video';
import { fetchFavoriteVideosList, videoActions } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';


export default function FavoriteList(){

    const {favoriteList, loadingFavorite} = useAppSelector(state => state.videoReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if (favoriteList.length <= 1){
            dispatch(fetchFavoriteVideosList())
        }
    },[dispatch, favoriteList.length])

    function selectVideo(id:string, video: Video){
        dispatch(videoActions.setSelectedVideo(video));
        navigate(`/videos/${id}`)
    }

    if (loadingFavorite) return <LoadingComponent content='Loading favorites...'/>

    return(
        <VideoList videos={favoriteList} selectVideo={selectVideo}/>
    )
}