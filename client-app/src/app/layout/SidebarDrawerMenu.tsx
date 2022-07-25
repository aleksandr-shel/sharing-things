import { Box, Drawer } from '@mui/material';
import React from 'react';
import { Nav, Button, Navbar, Image} from 'react-bootstrap';
import { User } from '../models/User';
import { useAppDispatch } from '../stores/redux-hooks';
import { setExpanded } from '../stores/slices/sidebarSlice';
import {AiOutlineMenu} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FollowingListOnSidebar from './FollowingListOnSidebar';

interface Props{
    isExpanded: boolean,
    user:User | null,
    links:[any]
}

export default function SidebarDrawerMenu({isExpanded, user, links}:Props){

    const dispatch=useAppDispatch();

    return(
        <Drawer
                open={isExpanded}
                onClose={()=>dispatch(setExpanded(false))}
            >
            <Box
                sx={{width: 'auto'}}
                role="presentation"
            >
                <Nav className="d-flex flex-column">
                    <Nav.Link className="d-flex justify-content-center align-items-center">
                        <Button variant='light' onClick={()=>dispatch(setExpanded(false))} className='d-flex justify-content-center align-items-center' style={{borderRadius:'50%', width:'2.5em',height:'2.5em'}}>
                            <AiOutlineMenu/>
                        </Button>
                        <Navbar.Brand as={Link} to='/' className='ms-1'  style={{color:'black'}}>
                            <Image src='./sharing-things.png' className='img-thumbnail' style={{height:'40px', border: '0'}}/>
                            {' '}
                            Sharing things
                        </Navbar.Brand>
                    </Nav.Link>
                    {links.map((link,index)=>{

                        if (!link.requiredUser){
                            return (
                                <Nav.Link onClick={()=>dispatch(setExpanded(false))} key={index} as={Link} to={`${link.link}`}>
                                    {link.icon(25)}
                                    <span className='ms-2'>{link.name}</span>
                                    
                                </Nav.Link>)
                        } else if (user !== null) {
                            return (
                                <Nav.Link onClick={()=>dispatch(setExpanded(false))} key={index} as={Link} to={`${link.link}`}>
                                    {link.icon(25)}
                                    <span className='ms-2'>{link.name}</span>
                                </Nav.Link>)
                        } else {
                            return null;
                        }
                    })}
                    <FollowingListOnSidebar user={user} isExpanded={isExpanded}/>
                </Nav>
            </Box>
        </Drawer>
    )
}