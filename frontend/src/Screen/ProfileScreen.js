import React, {useEffect,useState} from 'react'
import {Form,Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {getUserDetails, updateUserProfile} from '../action/userAction'
import {useNavigate} from 'react-router-dom'

const ProfileScreen = () => {
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [confirmPassword,setConfirmPassword] =useState("")
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const {loading,error,user} = useSelector(state=>state.userDetails)
    const {userInfo} = useSelector(state=>state.userLogin)
    const {success} = useSelector(state=>state.userUpdateProfile)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo,dispatch,navigate,user]);

    const submitHandler  =(e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('password and confirm password not match please try again !!')
        }
        else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }

    
  return <Row>
    <Col md={3}>
      <h2>User Profile</h2>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
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
            <Button type='submit' variant='primary' className='mt-4'>Update</Button>
        </Form> 
        </Col>

        <Col md={9}></Col>       
    </Row>

}

export default ProfileScreen
