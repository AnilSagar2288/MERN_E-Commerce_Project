import React, {useEffect,useState} from 'react'
import {Form,Col, Row,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {register} from '../action/userAction'
import FormContainer from '../component/FormContainer'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const RegisterScreen = () => {
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [confirmPassword,setConfirmPassword] =useState("")
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const query = useLocation().search;
    const redirect = query ? query.split('=')[1] : '/'
    const {loading,error,userInfo} = useSelector(state=>state.userRegister)

    const dispatch = useDispatch()

    const submitHandler  =(e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('password and confirm password not match please try again !!')
        }
        else{
            dispatch(register(name,email,password))
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo,redirect,navigate]);
  return (
    <FormContainer>
      <h2>Sign Up</h2>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group className='mt-4' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className='mt-4' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className='mt-4' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password"/>
            </Form.Group>
            <Form.Group className='mt-4' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="Enter Confirm Password"/>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}`: 'login' } >Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
