import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Profile } from "../models/Profile";
import { User } from "../models/User";
import { fetchFollowingList } from "../stores/actions/profileActions";
import { useAppDispatch, useAppSelector } from "../stores/redux-hooks";
import { setSelectedProfile } from "../stores/slices/profileSlice";

interface Props{
    user: User | null,
    isExpanded: boolean
}

export default function FollowingListOnSidebar({user, isExpanded}:Props){

    const dispatch = useAppDispatch();
    const {followingList} = useAppSelector(state => state.profileReducer)

    const [open, setOpen] = useState(false);

    function loadFollowing(){
        setOpen(!open)
        if (followingList.length === 0){
            dispatch(fetchFollowingList())
        }
    }

    function handleClickProfile(profile: Profile){
        dispatch(setSelectedProfile(profile))
    }

    if (user === null || !isExpanded) return null

    return(
        <>
            <Button variant={open ? 'primary' : 'outline-primary'} onClick={loadFollowing}>
                Followings
            </Button>
            {
                open &&
                <ListGroup>
                    {followingList.map(profile=>{
                        return(
                            <ListGroup.Item 
                                as={Link} to={`profiles/${profile.username}`}
                                onClick={()=>handleClickProfile(profile)}
                            >
                                {profile.displayName}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            }
        </>
    )
}