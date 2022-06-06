import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchVideos, videoActions } from "../../app/stores/actions/videoActions";
import { useAppDispatch, useAppSelector } from "../../app/stores/redux-hooks";


export default function Main(){

    const dispatch = useAppDispatch();
    const {videos, loading} = useAppSelector(state => state.videoReducer);

    useEffect(()=>{
        dispatch(fetchVideos())
    }, [dispatch]);


    if (loading) return <LoadingComponent/>

    return (
        <Container fluid>
            {
                videos.map((video)=>(
                    <Card key={video.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`pic${Math.ceil(Math.random() * 5)}.jpg`} />
                        <Card.Body>
                            <Button variant="light">{video.title}</Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}