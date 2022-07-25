import { Button } from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound(){

    return(
        <div className='d-flex justify-content-center align-content-center flex-column text-center'>
            <h1  className='my-3'>NOT FOUND</h1>
            <Link to='/'  className='my-3'>
                <Button variant="contained">
                    Go Home
                </Button>
            </Link>
            <div className='my-3'>
                <img
                    className='img-thumbnail rounded'
                    style={{width:'300px'}}
                    src='./sadpanda.png'
                    alt='NOT FOUND'
                />
            </div>
        </div>
    )
}