import React, {useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Image} from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiTwotoneHome, AiFillLike, AiOutlineGroup, AiOutlineVideoCameraAdd} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { openModal } from '../stores/slices/modalSlice';
import Login from '../../features/users/Login';
import { useAppDispatch, useAppSelector } from '../stores/redux-hooks';
import Register from '../../features/users/Register';
import { logout } from '../stores/slices/userSlice';
import { fetchVideos } from '../stores/actions/videoActions';
import { setPageNumber, setVideos } from '../stores/slices/videoSlice';
import FollowingListOnSidebar from './FollowingListOnSidebar';
import {setFollowingList} from '../stores/slices/profileSlice';
import SearchForm from '../../features/search/SearchForm';
import {Box, Drawer} from '@mui/material';

export default function Layout(){

    const [isExpanded, setExpanded] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state=> state.userReducer);
    
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleHamburgerButton(){
        setExpanded(!isExpanded)
    }

    function logoutHandler(){
        navigate('/')
        dispatch(setPageNumber(1))
        dispatch(setVideos([]))
        dispatch(setFollowingList([]))
        dispatch(logout());
        dispatch(fetchVideos())
    }

    const links = [
        {
            name: 'Home',
            link: '/',
            icon: (size?:number)=><AiTwotoneHome size={size}/>,
            requiredUser: false,
        },
        {
            name: 'Favorites',
            link: '/favorites',
            icon: (size?:number)=> <AiFillLike size={size}/>,
            requiredUser: true,
        },
        {
            name: 'Subscriptions',
            link: '/subscriptions-videos',
            icon: (size?:number)=> <AiOutlineGroup size={size}/>,
            requiredUser: true,
        },
        // {
        //     name: 'History',
        //     link: '/',
        //     icon: (size?:number)=> <AiOutlineFieldTime size={size}/>,
        //     requiredUser: true,
        // },
    ]
    const Grid = styled.div`
        display:grid;
        grid-template-columns: ${isExpanded ? '2fr' : '50px'} 15fr;
    `
    return (
        <>
            <div className='position-sticky top-0' style={{zIndex:'1000'}}>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        {/* <Button variant='light' onClick={toggleHamburgerButton}>
                            <AiOutlineMenu/>
                        </Button> */}
                        <Button variant='light' style={{borderRadius:'40%'}} onClick={()=>setDrawerOpen(true)}>
                            <AiOutlineMenu/>
                        </Button>
                        <Navbar.Brand as={Link} to='/' className='ms-1'>
                            <Image src='./logo192.png' className='img-thumbnail' style={{height:'30px'}}/>
                            {' '}
                            Sharing things
                        </Navbar.Brand>
                        <SearchForm/>
                        <Nav>
                            {
                                user !== null &&
                                <Nav.Link as={Link} to='/share-video'><AiOutlineVideoCameraAdd/></Nav.Link>
                            }
                        </Nav>
                        <NavDropdown className='me-3' key="user-nav" title={user==null ? "Login/Register" : user.displayName} id="basic-nav-dropdown">
                            {
                                user == null ?
                                <>
                                    <NavDropdown.Item onClick={()=>{
                                        dispatch(openModal(<Login/>))
                                    }}>Login</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>{
                                        dispatch(openModal(<Register/>))
                                    }}>Register</NavDropdown.Item>
                                </>
                                :
                                <>
                                    <NavDropdown.Item as={Link} to={`/profiles/${user.username}`}>My Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Container>
                </Navbar>
            </div>
            <Drawer
                open={drawerOpen}
                onClose={()=>setDrawerOpen(false)}
            >
                <Box
                    sx={{width: 'auto'}}
                    role="presentation"
                    // onClick={()=>setDrawerOpen(false)}
                    // onKeyDown={()=>setDrawerOpen(false)}
                >
                    <Nav className="d-flex flex-column">
                        {links.map((link,index)=>{

                            if (!link.requiredUser){
                                return (
                                    <Nav.Link key={index} as={Link} to={`${link.link}`}>
                                        {isExpanded ? 
                                        (
                                            <>
                                                {link.icon(25)}
                                                <span className='ms-2'>{link.name}</span>
                                            </>
                                        ):(
                                            <div className='my-2 d-flex justify-content-center flex-column align-items-center'>
                                                {link.icon(20)}
                                                {/* <span style={{fontSize:'0.75em'}}>{link.name}</span> */}
                                            </div>
                                        )}
                                        
                                    </Nav.Link>)
                            } else if (user !== null) {
                                return (
                                    <Nav.Link key={index} as={Link} to={`${link.link}`}>
                                        {isExpanded ? 
                                        (
                                            <>
                                                {link.icon(25)}
                                                <span className='ms-2'>{link.name}</span>
                                            </>
                                        ):(
                                            <div className='my-2 d-flex justify-content-center flex-column align-items-center'>
                                                {link.icon(20)}
                                                {/* <span style={{fontSize:'0.75em'}}>{link.name}</span> */}
                                            </div>
                                        )}
                                        
                                    </Nav.Link>)
                            } else {
                                return null;
                            }
                        })}
                        <FollowingListOnSidebar user={user} isExpanded={isExpanded}/>
                    </Nav>
                </Box>
            </Drawer>
            <Container fluid>
                <Outlet/>
            </Container>
        </>
    )
}
