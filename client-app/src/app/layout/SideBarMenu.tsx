import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../models/User';
import FollowingListOnSidebar from './FollowingListOnSidebar';

interface Props{
    links:[any];
    user: User | null;
    isExpanded: boolean;
}

export default function SideBarMenu({links, user, isExpanded}:Props){
    return(
        <Nav className="d-flex flex-column">
            {links.map((link,index)=>{

                if (!link.requiredUser){
                    return (
                        <Nav.Link key={index} as={Link} to={`${link.link}`}>
                            {isExpanded ? 
                            (
                                <div className='d-flex'>
                                    {link.icon(25)}
                                    <span className='ms-2'>{link.name}</span>
                                </div>
                            ):(
                                <div className='my-2 d-flex justify-content-center flex-column align-items-center'>
                                    {link.icon(20)}
                                </div>
                            )}
                            
                        </Nav.Link>)
                } else if (user !== null) {
                    return (
                        <Nav.Link key={index} as={Link} to={`${link.link}`}>
                            {isExpanded ? 
                            (
                                <div className='d-flex'>
                                    {link.icon(25)}
                                    <span className='ms-2'>{link.name}</span>
                                </div>
                            ):(
                                <div className='my-2 d-flex justify-content-center flex-column align-items-center'>
                                    {link.icon(20)}
                                </div>
                            )}
                            
                        </Nav.Link>)
                } else {
                    return null;
                }
            })}
            <FollowingListOnSidebar user={user} isExpanded={isExpanded}/>
        </Nav>
    )
}