import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from '../features/errors/NotFound';
import ProfilePage from '../features/profiles/ProfilePage';
import SearchResultList from '../features/search/SearchResultList';
import FavoriteList from '../features/videos/Favorite/FavoriteList';
import AddVideoForm from '../features/videos/Form/AddVideoForm';
import Main from '../features/videos/Main';
import SubscriptionsVideoList from '../features/videos/SubscriptionsVideoList/SubscriptionsVideoList';
import MovieDetails from '../features/videos/VideoDetails/MovieDetails';
import ModalContainer from './common/modals/ModalContainer';
import Layout from './layout/Layout';
import { current } from './stores/actions/userActions';
import { useAppDispatch } from './stores/redux-hooks';
import { setToken } from './stores/slices/userSlice';

function App() {

  const dispatch = useAppDispatch();
  useEffect(()=>{
    const tokenHere = window.localStorage.getItem('sharing-things-token')
    if (tokenHere){
        dispatch(setToken(tokenHere));
        dispatch(current())
    }
  },[dispatch])

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <ModalContainer/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='*' element={<NotFound />} />
          <Route index element={<Main/>}/>
          <Route path='/videos/:id' element={<MovieDetails/>}/>
          <Route path='share-video' element={<AddVideoForm/>}/>
          <Route path='favorites' element={<FavoriteList/>}/>
          <Route path="subscriptions-videos" element={<SubscriptionsVideoList/>}/>
          <Route path="/profiles/:username" element={<ProfilePage/>}/>
          <Route path='/search-page' element={<SearchResultList/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
