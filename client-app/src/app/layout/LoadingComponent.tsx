import React from "react";
import { Spinner } from "react-bootstrap";

interface Props{
    content?:string
}

export default function LoadingComponent({content="Loading..."}:Props){
    return (
        <div className="dimmer">
            <Spinner animation="border"/>
            <h3 className="ms-2">{content}</h3>
        </div>
    )
}