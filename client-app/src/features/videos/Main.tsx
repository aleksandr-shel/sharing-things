import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import { fetchNextVideos, fetchVideos } from "../../app/stores/actions/videoActions";
import { useAppDispatch, useAppSelector } from "../../app/stores/redux-hooks";
import { setPageNumber } from "../../app/stores/slices/videoSlice";
import MainVideoItem from "./MainVideoItem";


export default function Main(){

    const dispatch = useAppDispatch();
    const {videos, loading, pagination} = useAppSelector(state => state.videoReducer);

    useEffect(()=>{
        if (videos.length <= 1){
            dispatch(fetchVideos())
        }
    }, [dispatch, videos.length]);

    function handleGetNext(){
        dispatch(setPageNumber(pagination?.currentPage! + 1))
        dispatch(fetchNextVideos())
    }

    // if (loading) return <LoadingComponent/>

    return (
        <>
            <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loading && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                <Container className='d-flex flex-wrap my-3' fluid>
                    {
                        videos.map((video)=>(
                            <MainVideoItem key={video.id} video={video}/>
                        ))
                    }
                </Container>
            </InfiniteScroll>
            <Container className='d-flex justify-content-center'>
                {
                    loading &&
                    <Spinner animation="border"/>
                }
            </Container>
        </>
    )
}