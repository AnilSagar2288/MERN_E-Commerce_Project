import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserListDetails, userDeleteAction } from '../action/userAction'
import Loader from '../component/Loader'
import Message from '../component/Message'



const UserListScreen = () => {
  const navigate =useNavigate()
    const dispatch = useDispatch()
    const {users,error,loading} = useSelector(state=>state.userList) 
    
    const {success:deleteSuccess} = useSelector(state=>state.deleteUser)
    // console.log(deleteUser);
    
    
    
        
    const {userInfo} = useSelector(state=>state.userLogin) 

    // console.log("inside Component")
    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(getUserListDetails())
      }else{
        navigate('/login')
      }
        
        //console.log("In useEffect")
    }, [dispatch,navigate,userInfo,deleteSuccess]);

    const deleteUserHandler = (id) => {
      if(window.confirm("Are you sure!")){
        dispatch(userDeleteAction(id))
      }
    }
  return ( 
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      <h2>User Details</h2>      
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
                <>
                
                {users.length > 0 ? (users.map(user=>(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? <i className='fas fa-check' style={{color:"green"}}></i> : <i className='fas fa-times' style={{color:"red"}}></i>}</td>
                        <td>
                          <Link to={`/admin/user/${user._id}/edit`} as='span'>
                            <Button variant='success' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </Link>
                          
                          <Button variant="danger" className='btn-sm'  onClick={()=>deleteUserHandler(user._id)}>
                              <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                    </tr>
                ))): "No User Found"}
                </>
            )}
        </tbody>
      </Table>

    </>
  )
}

export default UserListScreen
