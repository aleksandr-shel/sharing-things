import React, {useEffect} from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Image} from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineMenu, AiTwotoneHome, AiFillLike, AiOutlineGroup, AiOutlineVideoCameraAdd} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { openModal } from '../stores/slices/modalSlice';
import Login from '../../features/users/Login';
import { useAppDispatch, useAppSelector } from '../stores/redux-hooks';
import Register from '../../features/users/Register';
import { logout } from '../stores/slices/userSlice';
import { fetchVideos } from '../stores/actions/videoActions';
import { setPageNumber, setVideos } from '../stores/slices/videoSlice';
import {setFollowingList} from '../stores/slices/profileSlice';
import SearchForm from '../../features/search/SearchForm';
import SideBarMenu from './SideBarMenu';
import {setExpanded, setDrawer} from '../stores/slices/sidebarSlice';
import SidebarDrawerMenu from './SidebarDrawerMenu';

export default function Layout(){

    // const [isExpanded, setExpanded] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state=> state.userReducer);
    const {isDrawer, isExpanded} = useAppSelector(state => state.sidebarReducer);

    const location = useLocation();

    function logoutHandler(){
        navigate('/')
        dispatch(setPageNumber(1))
        dispatch(setVideos([]))
        dispatch(setFollowingList([]))
        dispatch(logout());
        dispatch(fetchVideos())
    }


    //sidebar handler

    const drawerPathnames = [
        "/videos/"
    ]

    useEffect(()=>{
        console.log(location.pathname)
        
        if (drawerPathnames.some(x=>{
            return location.pathname.includes(x);
        })){
            dispatch(setDrawer(true))
            dispatch(setExpanded(false))
        } else {
            dispatch(setDrawer(false))
        }
    },[location])

    function handleSidebarChange(){
        dispatch(setExpanded(!isExpanded));
    }

    //sidebar links
    const links : any = [
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
    return (
        <>
            <div className='position-sticky top-0' style={{zIndex:'1000'}}>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Button variant='light' className='d-flex justify-content-center align-items-center' style={{borderRadius:'50%', width:'2.5em',height:'2.5em'}} onClick={handleSidebarChange}>
                            <AiOutlineMenu/>
                        </Button>
                        <Navbar.Brand as={Link} to='/' className='ms-1'>
                            <Image src='./sharing-things.png' className='img-thumbnail' style={{height:'40px', border: '0'}}/>
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
            {
                isDrawer &&
                <SidebarDrawerMenu links={links} user={user} isExpanded={isExpanded}/>
            }
            {
                isDrawer ?
                <Container fluid>
                    <Outlet/>
                </Container>
                :
                <div className='d-flex'>
                    <div>
                        <SideBarMenu links={links} user={user} isExpanded={isExpanded}/>
                    </div>
                    <Container fluid>
                        <Outlet/>
                    </Container>
                </div>
            }
        </>
    )
}
