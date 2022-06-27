import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Video } from '../../models/Video';

interface Props{
    videos: Video[],
    selectVideo: (id:string, video: Video) => void
}

export default function VideoList({videos, selectVideo}:Props){

    return (
        <ListGroup className='w-75'>
            {videos.map(video =>{
                return (
                    <ListGroup.Item key={video.id} className='d-flex'  action onClick={()=>selectVideo(video.id, video)}>
                        <div className='w-25'>
                            <video width={'100%'} preload='metadata'>
                                <source src={video.videoUrl + `#t=10`}/>
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