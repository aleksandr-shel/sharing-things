import React, { useEffect, useState } from 'react';
import VideoUploadWidget from '../../../app/common/VideoUploadWidget/VideoUploadWidget';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';
import { useNavigate } from 'react-router-dom';
import agent from '../../../app/api/agent';
import { videoActions } from '../../../app/stores/actions/videoActions';
import ReactPlayer from 'react-player';

export default function AddVideoForm(){

    const [files, setFiles] = useState<File>();
    const [title, setTitle] = useState('');
    const [src, setSrc] = useState(null);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const {downloadVideoLoading} = useAppSelector(state => state.videoReducer)

    useEffect(()=>{
        if(files !== undefined && files?.name.split('.').at(-1) !== 'mp4'){
            setError(true);
        } else {
            setError(false);
        }
    },[setFiles, files?.name, files])

    async function UploadVideo(){
        dispatch(videoActions.setDownloadLoading(true))
        try{
            const response = await agent.Videos.uploadVideo(files!, title);
            const video = response.data;
            dispatch(videoActions.addVideo(video));
            dispatch(videoActions.setDownloadLoading(false))
            navigate('/')
        }catch(error){
            console.log(error);
            dispatch(videoActions.setDownloadLoading(false))
        }
    }

    function handleCancel(){
        navigate('/')
    }

    return(
        <div>
            <Row>
                <Col sm={6}>
                    <Form className='w-50 mx-auto'>
                        <Form.Group>
                            <Form.Control required value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" />
                            {
                                error && 
                                <Form.Label style={{color:'red'}}>
                                    Only mp4 format
                                </Form.Label>
                            }
                        </Form.Group>
                        <VideoUploadWidget setSrc={setSrc} setFiles={setFiles}/>
                        
                        <Button disabled={error || title ===''} variant='outline-primary' type='button' onClick={async()=>await UploadVideo()}>
                            {downloadVideoLoading && 
                                <Spinner animation="border" role="status"/>
                            }
                            Post
                        </Button>
                        <Button className='float-end' variant="outline-secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form>
                </Col>
                <Col sm={6}>
                    {src !== null &&
                        <div className='w-75 mt-5 me-5'>
                            <ReactPlayer  controls url={src} />
                        </div>
                    }
                </Col>
            </Row>
        </div>
    )
}