import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Video } from '../../app/models/Video';
import ProfileVideoItem from './ProfileVideoItem';

interface Props{
    videos: Video[],
    loading: boolean
}

export default function ProfileContent({videos, loading}:Props){


    
    if (loading) return  <Container className='d-flex justify-content-center align-content-center'><Spinner  animation={'border'}/></Container>
    return (
        <Container className='d-flex flex-wrap my-3' fluid>
            {
                videos.map((video)=>(
                    <ProfileVideoItem key={video.id} video={video}/>
                ))
            }
        </Container>
    )
}