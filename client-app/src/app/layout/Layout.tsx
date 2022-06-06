import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {AiOutlineMenu, AiTwotoneHome, AiFillLike, AiOutlineFieldTime, AiOutlineGroup} from 'react-icons/ai';
import {Link} from 'react-router-dom';

export default function Layout(){


    return (
        <>
            <div className='position-sticky top-0'>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Button variant='light'>
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
                <SideBar>
                    <Nav className="d-flex flex-column">
                        <Nav.Link href="#home">
                            <AiTwotoneHome/>
                            <span>Home</span>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <AiFillLike/>
                            <span>Favorites</span>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <AiOutlineGroup/>
                            <span>Subscriptions</span>
                        </Nav.Link>
                        <Nav.Link href="#link">
                            <AiOutlineFieldTime/>
                            <span>History</span>
                        </Nav.Link>
                    </Nav>
                </SideBar>
            </div>
            <Outlet/>
        </>
    )
}

const SideBar = styled.div`
    float: left;
    span{
        margin-left: 10px;
    }
`