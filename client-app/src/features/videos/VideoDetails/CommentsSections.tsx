import { format } from 'date-fns';
import { Field, FieldProps, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addComment, createHubConnection, removeComment } from '../../../app/stores/actions/commentActions';
import { useAppDispatch, useAppSelector } from '../../../app/stores/redux-hooks';
import { clearComments, stopHubConnection } from '../../../app/stores/slices/commentSlice';
import * as Yup from 'yup';

interface Props{
    videoId:string | undefined
}

export default function CommentsSection({videoId}:Props){

    const {comments} = useAppSelector(state => state.commentsReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (videoId){
            dispatch(createHubConnection(videoId))
        } 

        return ()=>{
            dispatch(clearComments())
            dispatch(stopHubConnection())
        }
    },[dispatch, videoId])



    return (
        <ListGroup className='mt-3 mb-5'>
            
            {
                !!user &&
                <Formik
                    onSubmit={(values,{resetForm})=>{
                        dispatch(addComment({body:values.body, videoId}))
                        resetForm();
                    }}
                    initialValues={{body: ''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({isSubmitting, isValid, handleSubmit})=>(
                        <Form className='overflow-auto'>
                            <Field name='body'>
                                {(props: FieldProps)=>(
                                    <div style={{position:'relative'}}>
                                        <textarea
                                            placeholder='Enter your comment: (Enter to submit, SHIFT + Enter for new line)'
                                            rows={4}
                                            className='w-100'
                                            {...props.field}
                                            onKeyDownCapture={e => {
                                                if (e.key === 'Enter' && e.shiftKey){
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey){
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            }
            {comments.map(comment=>{
                return(
                    <ListGroup.Item key={comment.id} className='position-relative'>
                        {!!user && user.username === comment.author.username &&
                        <button type="button" className="close position-absolute top-0 end-0" aria-label="Close"
                            onClick={()=>{
                                if (videoId){
                                    dispatch(removeComment(videoId, comment.id))
                                }
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        }
                        <h6 className='my-0'>
                            <Link style={{textDecoration: 'none'}} to={`/profiles/${comment.author.username}`}>
                                {comment.author.displayName}
                            </Link>
                        </h6>
                        <div className='my-2' style={{whiteSpace:'pre-wrap', fontSize:'1.1em'}}>
                            {comment.body}
                        </div>
                        <div style={{fontSize:'0.6em'}}>
                            {format(new Date(comment.createdAt), 'dd MMM yyyy h:mm aa')}
                        </div>
                    </ListGroup.Item>
                )
            })}

        </ListGroup>
    )
}