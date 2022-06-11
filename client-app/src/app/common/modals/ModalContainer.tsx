import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../stores/redux-hooks";
import { closeModal } from "../../stores/slices/modalSlice";


export default function ModalContainer(){

    const {body, open} = useAppSelector(state => state.modalReducer)
    const dispatch = useAppDispatch();

    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" show={open} onHide={()=> dispatch(closeModal())} animation={false} centered>
            <Modal.Header closeButton />
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    )
}