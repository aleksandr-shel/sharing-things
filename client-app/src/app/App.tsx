import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '../features/videos/Main';
import MovieDetails from '../features/videos/MovieDetails/MovieDetails';
import Layout from './layout/Layout';


function App() {
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/videos/:id' element={<MovieDetails/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
