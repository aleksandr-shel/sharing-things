import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoList from '../../../app/common/VideoList/VideoList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Video } from '../../../app/models/Video';
import { fetchSubscriptionVideos, videoActions } from '../../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';

export default function SubscriptionsVideoList(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {subscriptionsVideoList, loadingSubscriptions} = useAppSelector(state => state.videoReducer)

    useEffect(()=>{
        if (subscriptionsVideoList.length === 0){
            dispatch(fetchSubscriptionVideos())
        }
    },[dispatch, subscriptionsVideoList.length])

    function selectVideo(id:string, video: Video){
        dispatch(videoActions.setSelectedVideo(video));
        navigate(`/videos/${id}`)
    }

    if (loadingSubscriptions) return <LoadingComponent content="Loading Subscriptions Videos..."/>

    return(
        <VideoList videos={subscriptionsVideoList} selectVideo={selectVideo}/>
    )
}