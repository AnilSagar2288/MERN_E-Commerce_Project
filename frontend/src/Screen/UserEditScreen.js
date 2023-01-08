import React, {useEffect,useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {getUserDetails} from '../action/userAction'
import FormContainer from '../component/FormContainer'
import {Link, useParams} from 'react-router-dom'

const UserEditScreen = () => {
    const {id} = useParams()
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [isAdmin,setIsAdmin] =useState(false)    
    
    const {loading,error,user} = useSelector(state=>state.userDetails)

    const dispatch = useDispatch()

    const submitHandler  =(e) =>{
        e.preventDefault()
            
    }

    useEffect(() => {
      if(!user.name || user._id !== id){
        dispatch(getUserDetails(id))
      }else{
        setName(user.name)
        setEmail(user.name)
        setIsAdmin(user.isAdmin)
      }
        
    }, [dispatch,user,id]);
  return (
    <>
      <Link to="/admin/userList" className='btn btn-light my-3'>Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
        <FormContainer>
        <h2>Edit User</h2>
          <Form onSubmit={submitHandler}>
              <Form.Group className='mt-4' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='isadmin'>                                
                  <Form.Check 
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e)=> setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              
              <Button type='submit' variant='primary' className='mt-4'>Update</Button>
          </Form>        
      </FormContainer>
      )}
    </>
    
  )
}

export default UserEditScreen
