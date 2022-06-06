import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from '../features/videos/Main';
import MovieDetails from '../features/videos/MovieDetails';
import Layout from './layout/Layout';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
      </Route>
    </Routes>
  );
}

export default App;
