import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CommentsSection from './CommentsSections';
import VideoSection from './VideoSection';

export default function MovieDetails(){

    const {id} = useParams();


    return (
        <Container fluid>
            <Row>
                <Col sm={10}>
                    <VideoSection/>
                    <CommentsSection videoId={id}/>
                </Col>
            </Row>
        </Container>
    )
}