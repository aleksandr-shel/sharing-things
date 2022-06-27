import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Video } from '../../app/models/Video';
import { videoActions } from '../../app/stores/actions/videoActions';
import { useAppDispatch } from '../../app/stores/redux-hooks';

interface Props{
    video: Video;
}

export default function ProfileVideoItem({video}:Props){

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function selectVideo(id:string){
        dispatch(videoActions.setSelectedVideo(video));
        navigate(`/videos/${id}`)
    }

    return(
        <Card className='position-relative main-video-item mx-1 my-1'>
            {/* <Card.Img variant="bottom" className='video-item-img' src={`pic${Math.ceil(Math.random() * 5)}.jpg`}/> */}
            <div>
                <video width={'100%'} preload='metadata'>
                    <source src={video.videoUrl + `#t=10`}/>
                </video>
            </div>
            <Card.Body className='video-item-body position-absolute bottom-0 w-100 align-items-center justify-content-center opacity-75'>
                <Button onClick={()=>selectVideo(video.id)} variant="light" className='w-100'>{video.title}</Button>
            </Card.Body>
        </Card>
    )
}