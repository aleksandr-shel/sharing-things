import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Profile } from '../../../app/models/Profile';
import { getProfile, updateFollowing } from '../../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';


interface Props{
    profile: Profile
}

export default function ProfileInfo({profile}:Props){

    const dispatch = useAppDispatch();

    const {selectedProfile, loadingProfile, updatingFollowing} = useAppSelector(state => state.profileReducer)
    const {user} = useAppSelector(state => state.userReducer)
    useEffect(()=>{
        if (profile){
            dispatch(getProfile(profile.username!))
        }
    },[dispatch, profile])

    function handleFollowing(){
        dispatch(updateFollowing(selectedProfile?.username!))
    }

    if (loadingProfile || selectedProfile === null) return null

    return(

        <div className='d-flex justify-content-between border p-2'>
            <h4>
                <Link style={{textDecoration: 'none'}} to={`/profiles/${selectedProfile.username}`}>
                    {selectedProfile.displayName}
                </Link>
            </h4>
            <div>
                <span className='mx-2'>
                    {selectedProfile.followersCount} 
                    {selectedProfile.followersCount === 1 ? ' Subscriber' : ' Subscribers'}
                </span>
            
            
                {/* if current user is selected profile then no subscribe button */}
                {user?.username !== selectedProfile.username &&
                    <Button onClick={handleFollowing} variant={selectedProfile.following ? 'danger' : 'primary'}>
                        {
                            updatingFollowing ?
                            <Spinner animation="border"/>
                            :
                            <>
                            {
                                selectedProfile.following ? 
                                'Unsubscribe'
                                :
                                'Subscribe'
                            }
                            </>
                        }
                    </Button>
                }
            </div>
        </div>
    )
}