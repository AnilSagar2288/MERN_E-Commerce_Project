import React, {useEffect,useState} from 'react'
import {Form,Col, Row,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {login} from '../action/userAction'
import FormContainer from '../component/FormContainer'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const LoginScreen = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const navigate = useNavigate()
    const query = useLocation().search;
    const redirect = query ? query.split('=')[1] : '/'
    const {loading,error,userInfo} = useSelector(state=>state.userLogin)

    const dispatch = useDispatch()

    const submitHandler  =(e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo,redirect,navigate]);
  return (
    <FormContainer>
      <h2>Sign In</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group className='mt-4'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className='mt-4'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='text' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password"/>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>Sign In</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: 'register' } >Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
