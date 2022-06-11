import React from "react";
import { Formik, ErrorMessage } from "formik";
import { register} from "../../app/stores/actions/userActions";
import { Button, Form, FormLabel, Spinner} from "react-bootstrap";
import * as Yup from 'yup';
import { useAppDispatch } from "../../app/stores/redux-hooks";

export default function Register(){
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        displayName: Yup.string().required('Required')
    })
    const dispatch = useAppDispatch();

    return(
        <Formik
            initialValues={{email:'', password:'', displayName:'', username:'', error:null}}
            validationSchema={validationSchema}
            onSubmit = {(values, actions)=>{
                dispatch(register(values));
                // actions.setSubmitting(false);
            }}
        >
            {
                (formik)=>(
                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <h3 className='text-center'>Register</h3>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control {...formik.getFieldProps('email')} type="text" placeholder="email@example.com" />
                            {formik.touched.email && formik.errors.email ? (
                                <FormLabel 
                                    className='text-danger'>
                                    {formik.errors.email}
                                </FormLabel>
                            ): null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control {...formik.getFieldProps('password')} type='password' placeholder='password'/>
                            {formik.touched.password && formik.errors.password ? (
                                <FormLabel 
                                    className='text-danger'>
                                    {formik.errors.password}
                                </FormLabel>
                            ): null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Display Name:</Form.Label>
                            <Form.Control {...formik.getFieldProps('displayName')} type='text' placeholder='display name'/>
                            {formik.touched.displayName && formik.errors.displayName ? (
                                <FormLabel 
                                    className='text-danger'>
                                    {formik.errors.displayName}
                                </FormLabel>
                            ): null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control {...formik.getFieldProps('username')} type='text' placeholder='username'/>
                            {formik.touched.username && formik.errors.username ? (
                                <FormLabel 
                                    className='text-danger'>
                                    {formik.errors.username}
                                </FormLabel>
                            ): null}
                        </Form.Group>
                        <ErrorMessage
                            name='error'
                            render={()=>
                            <FormLabel 
                                color='red'>
                                {formik.errors.error}
                            </FormLabel>}
                        />
                        <Button disabled={!formik.isValid} type='submit'>
                            {formik.isSubmitting ?
                                <Spinner animation="border" role="status"/>
                                :
                                'Register'
                            }
                        </Button>
                    </Form>
                )
            }
        </Formik>
    )
}