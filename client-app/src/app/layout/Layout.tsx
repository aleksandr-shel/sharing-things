import React, {useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Image} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiTwotoneHome, AiFillLike, AiOutlineFieldTime, AiOutlineGroup, AiOutlineVideoCameraAdd} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { openModal } from '../stores/slices/modalSlice';
import Login from '../../features/users/Login';
import { useAppDispatch, useAppSelector } from '../stores/redux-hooks';
import Register from '../../features/users/Register';
import { logout } from '../stores/slices/userSlice';


export default function Layout(){

    const [isExpanded, setExpanded] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=> state.userReducer);

    function toggleHamburgerButton(){
        setExpanded(!isExpanded)
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
            link: '/',
            icon: (size?:number)=> <AiOutlineGroup size={size}/>,
            requiredUser: true,
        },
        {
            name: 'History',
            link: '/',
            icon: (size?:number)=> <AiOutlineFieldTime size={size}/>,
            requiredUser: true,
        },
    ]
    const Grid = styled.div`
        display:grid;
        grid-template-columns: ${isExpanded ? '2fr' : '1fr'} 15fr;
    `
    return (
        <>
            <div className='position-sticky top-0' style={{zIndex:'1000'}}>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Button variant='light' onClick={toggleHamburgerButton}>
                            <AiOutlineMenu/>
                        </Button>
                        <Navbar.Brand as={Link} to='/' className='ms-1'>
                            <Image src='./logo192.png' className='img-thumbnail' style={{height:'30px'}}/>
                            {' '}
                            Sharing things
                        </Navbar.Brand>
                        <Form className="d-flex mx-auto w-50">
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav>
                            {
                                user !== null &&
                                <Nav.Link as={Link} to='/share-video'><AiOutlineVideoCameraAdd/></Nav.Link>
                            }
                        </Nav>
                        <NavDropdown key="user-nav" title={user==null ? "Login/Register" : user.displayName} id="basic-nav-dropdown">
                            {
                                user == null ?
                                <>
                                    <NavDropdown.Item onClick={()=>dispatch(openModal(<Login/>))}>Login</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>dispatch(openModal(<Register/>))}>Register</NavDropdown.Item>
                                </>
                                :
                                <NavDropdown.Item onClick={()=> dispatch(logout())}>Logout</NavDropdown.Item>
                            }
                        </NavDropdown>
                    </Container>
                </Navbar>
            </div>
            <Grid>
                <div className='position-sticky top-0'>
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
                                                {link.icon(30)}
                                                <span style={{fontSize:'0.75em'}}>{link.name}</span>
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
                                                {link.icon(30)}
                                                <span style={{fontSize:'0.75em'}}>{link.name}</span>
                                            </div>
                                        )}
                                        
                                    </Nav.Link>)
                            } else {
                                return null;
                            }
                        })}
                    </Nav>
                </div>
                <div>
                    <Outlet/>
                </div>
            </Grid>
        </>
    )
}
