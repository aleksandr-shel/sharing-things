import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchVideos } from "../../app/stores/actions/videoActions";
import { useAppDispatch, useAppSelector } from "../../app/stores/redux-hooks";
import MainVideoItem from "./MainVideoItem";


export default function Main(){

    const dispatch = useAppDispatch();
    const {videos, loading} = useAppSelector(state => state.videoReducer);

    useEffect(()=>{
        dispatch(fetchVideos())
    }, [dispatch]);


    if (loading) return <LoadingComponent/>

    return (
        <Container className='d-flex flex-wrap my-3' fluid>
            {
                videos.map((video)=>(
                    <MainVideoItem key={video.id} video={video}/>
                ))
            }
        </Container>
    )
}