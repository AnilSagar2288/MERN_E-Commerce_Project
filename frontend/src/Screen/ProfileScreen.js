import React, {useEffect,useState} from 'react'
import {Form,Button, Row, Col, Table} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {getUserDetails, updateUserProfile} from '../action/userAction'
import {useNavigate} from 'react-router-dom'
import { getMyOrderDetails } from '../action/orderAction'
import {LinkContainer} from 'react-router-bootstrap'

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
    const {myOrders,loading: orderLoading, error: orderError} = useSelector(state=>state.myOrders)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrderDetails())
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

        <Col md={9}>
        <h2>My Orders</h2>
            {orderLoading ? <Loader /> : orderError ? <Message variant='danger'>{orderError}</Message> : (
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERD</th>
                    <th>CHECK DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                    {myOrders.map(item=> (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.createdAt.substring(0,10)}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.isPaid ? item.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                            <td>{item.isDelivered ? item.deliveredAt.substring(0,10) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                            <td>
                                <LinkContainer to={`/order/${item._id}`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </Col>       
    </Row>

}

export default ProfileScreen
