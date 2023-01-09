import React, {useEffect,useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import {getUserDetails, userUpdateAction} from '../action/userAction'
import FormContainer from '../component/FormContainer'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {USER_UPDATE_RESET} from '../constants/userConstant'

const UserEditScreen = () => {
    const {id} = useParams()
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [isAdmin,setIsAdmin] =useState(false)
    const navigate = useNavigate() 
    
    const {loading,error,user} = useSelector(state=>state.userDetails)
    const {loading:updateLoading,error:updateError,success:successUpdate} = useSelector(state=>state.updateUser)

    const dispatch = useDispatch()

    const submitHandler  =(e) =>{
        e.preventDefault()
        dispatch(userUpdateAction({_id:id,name,email,isAdmin}))
    }

    useEffect(() => {
      if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        navigate('/admin/userList')
      }else{
        if(!user.name || user._id !== id){
          dispatch(getUserDetails(id))
        }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      }
      
        
    }, [dispatch,user,id,successUpdate,navigate]);
  return (
    <>
      <Link to="/admin/userList" className='btn btn-light my-3'>Go Back</Link>
      {updateLoading && <Loader />}
      {updateError && <Message variant='danger'>{updateError}</Message>}
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
