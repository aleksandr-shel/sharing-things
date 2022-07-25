import React, { useEffect } from 'react';
import {Container} from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/stores/redux-hooks';
import ProfileHeader from './ProfileHeader';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { getProfile, getProfileVideos } from '../../app/stores/actions/profileActions';
import ProfileContent from './ProfileContent';


export default function ProfilePage(){


    const {username} = useParams<string>();
    const dispatch = useAppDispatch();
    const {profileVideos, selectedProfile, loadingProfile, loadingProfileVideos} = useAppSelector(state=> state.profileReducer)

    useEffect(()=>{
        if ((selectedProfile === null || selectedProfile.username !== username) && username !== undefined){
            dispatch(getProfile(username))
        }
    },[dispatch, selectedProfile, username])

    useEffect(()=>{
        if(username !== undefined){
            dispatch(getProfileVideos(username))
        }
    },[dispatch, username])

    if (selectedProfile === null || loadingProfile) return <LoadingComponent content='Loading profile...'/>;

    return(
        <Container fluid className='mt-3'>
            <ProfileHeader profile={selectedProfile}/>
            <ProfileContent loading={loadingProfileVideos} videos={profileVideos}/>
        </Container>
    )
}