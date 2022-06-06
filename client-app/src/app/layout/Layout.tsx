import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Image} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiTwotoneHome, AiFillLike, AiOutlineFieldTime, AiOutlineGroup} from 'react-icons/ai';
import {Link} from 'react-router-dom';

export default function Layout(){

    const [isExpanded, setExpanded] = useState<boolean>(true);

    function toggleHamburgerButton(){
        setExpanded(!isExpanded)
    }

    const links = [
        {
            name: 'Home',
            link: '/',
            icon: (size?:number)=><AiTwotoneHome size={size}/>
        },
        {
            name: 'Favorites',
            link: '/',
            icon: (size?:number)=> <AiFillLike size={size}/>
        },
        {
            name: 'Subscriptions',
            link: '/',
            icon: (size?:number)=> <AiOutlineGroup size={size}/>
        },
        {
            name: 'History',
            link: '/',
            icon: (size?:number)=> <AiOutlineFieldTime size={size}/>
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
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Register</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Container>
                </Navbar>
            </div>
            <Grid>
                <div className='position-sticky top-0'>
                    <Nav className="d-flex flex-column">
                        {links.map((link,index)=>(
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
                                
                            </Nav.Link>
                        ))}
                    </Nav>
                </div>
                <div>
                    <Outlet/>
                </div>
            </Grid>
        </>
    )
}
