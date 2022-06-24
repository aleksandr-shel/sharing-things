import React from "react";
import { Formik, ErrorMessage } from "formik";
import { login } from "../../app/stores/actions/userActions";
import { Button, Form, FormLabel, Spinner} from "react-bootstrap";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../app/stores/redux-hooks";

export default function Login(){

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
    })
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state => state.userReducer);

    return(
        <Formik
            initialValues={{email:'', password:'', error:null}}
            validationSchema={validationSchema}
            onSubmit = {(values)=>{
                dispatch(login(values));
            }}
        >
            {
                (formik)=>(
                    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <h3 className='text-center'>Login</h3>
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
                        <ErrorMessage
                            name='error'
                            render={()=>
                            <FormLabel 
                                color='red'>
                                {formik.errors.error}
                            </FormLabel>}
                        />
                        <Button disabled={!formik.isValid} type='submit'>
                            {loading ?
                                <Spinner animation="border" role="status"/>
                                :
                                'Login'
                            }
                        </Button>
                    </Form>
                )
            }
        </Formik>
    )
}