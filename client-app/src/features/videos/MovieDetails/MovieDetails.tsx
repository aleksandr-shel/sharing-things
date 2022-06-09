import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import CommentsSection from './CommentsSections';
import SuggestionsSection from './SuggestionsSection';
import VideoSection from './VideoSection';

export default function MovieDetails(){

    return (
        <Container fluid>
            <Row>
                <Col sm={9}>
                    <VideoSection/>
                    <CommentsSection/>
                </Col>
                <Col sm={3} style={{backgroundColor:'lightblue'}}>
                    <SuggestionsSection/>
                </Col>
            </Row>
        </Container>
    )
}