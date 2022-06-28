import React, { useState } from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { search } from '../../app/stores/actions/searchActions';
import { useAppDispatch } from '../../app/stores/redux-hooks';

export default function SearchForm(){

    const [queryString, setQueryString] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSearch(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        dispatch(search(queryString))
        navigate('/search-page')
    }

    return(
        <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={queryString}
                onChange={(e)=>setQueryString(e.target.value)}
            />
            <Button type='submit' variant="outline-success">Search</Button>
        </Form>
    )
}