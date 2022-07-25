import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Profile } from '../../app/models/Profile';
import { Video } from '../../app/models/Video';
import { videoActions } from '../../app/stores/actions/videoActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/redux-hooks';
import { setSelectedProfile } from '../../app/stores/slices/profileSlice';
import ProfileHeader from '../profiles/ProfileHeader';

function instanceOfProfile(object: any): object is Profile {
    return 'username' in object;
}

function instanceOfVideo(object: any): object is Video {
    return 'videoUrl' in object;
}
export default function SearchResultList(){

    const {list, loading} = useAppSelector(state => state.searchReducer)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        // if (list.length === 0){
        //     navigate('/')
        // }
    },[list.length, navigate])

    function selectVideo(id:string, video: Video){
        dispatch(videoActions.setSelectedVideo(video));
        navigate(`/videos/${id}`)
    }

    function handleClickProfile(profile: Profile){
        dispatch(setSelectedProfile(profile))
    }

    if (loading) return <LoadingComponent content='Searching'/>

    if (list.length === 0) return <div></div>

    return(
        <ListGroup className='w-100 mx-1 my-2'>
            {
                list.map(item =>{
                    if (instanceOfProfile(item)){
                        return (<ListGroup.Item
                                    key={item.username}
                                    as={Link} to={`/profiles/${item.username}`}
                                    onClick={()=>handleClickProfile(item)}
                                    >
                                    <ProfileHeader profile={item}/>
                                </ListGroup.Item>
                            )
                    }
                    if (instanceOfVideo(item)){
                        return (<ListGroup.Item key={item.id} className='d-flex'  action onClick={()=>selectVideo(item.id, item)}>
                                    <div className='w-25'>
                                        <video width={'100%'} preload='metadata'>
                                            <source src={item.videoUrl + `#t=10`}/>
                                        </video>
                                    </div>
                                    <div className='ms-5'>
                                        <h4>{item.title}</h4>
                                        <h6>
                                            Author: {item.owner.displayName}
                                        </h6>
                                    </div>
                                </ListGroup.Item>)
                    }
                    return null;
                })
            }
            {/* {videos.map(video =>{
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
            })} */}
        </ListGroup>
    )
}