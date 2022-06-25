import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Profile } from '../../app/models/Profile';
import { updateFollowing } from '../../app/stores/actions/profileActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/redux-hooks';


interface Props{
    profile: Profile
}

export default function ProfileHeader({profile}:Props){

    const {updatingFollowing} = useAppSelector(state => state.profileReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    function handleFollowing(){
        dispatch(updateFollowing(profile.username!))
    }

    return(
        <div className='d-flex justify-content-between border p-2'>
            <h4>
                {profile.displayName}
            </h4>
            <div>
                <span className='mx-2'>
                    {profile.followersCount} 
                    {profile.followersCount === 1 ? ' Subscriber' : ' Subscribers'}
                </span>
            
            {/* if current user is selected profile then no subscribe button */}
            {user?.username !== profile.username &&
                <Button onClick={handleFollowing} variant={profile.following ? 'danger' : 'primary'}>
                    {
                        updatingFollowing ?
                        <Spinner animation="border"/>
                        :
                        <>
                        {
                            profile.following ? 
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