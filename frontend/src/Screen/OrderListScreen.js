import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {orderListAction } from '../action/orderAction'
import Loader from '../component/Loader'
import Message from '../component/Message'




const OrderListScreen = () => {
  const navigate =useNavigate()
    const dispatch = useDispatch()
    const {orders,error,loading} = useSelector(state=>state.ordersList)                   

    const {userInfo} = useSelector(state=>state.userLogin)  
    
    useEffect(() => {
      
      if(!userInfo.isAdmin && !userInfo){
        navigate('/login')
      }else{
        dispatch(orderListAction())
      }
      
        
        //console.log("In useEffect")
    }, [dispatch,navigate,userInfo]);



  return ( 
    <>
    <h1>All Orders</h1>
    {loading && <Loader />}    
    {error && <Message variant='danger'>{error}</Message>}    
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
        
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ORDER ID</th>
                <th>USER NAME</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
                <>                
                {orders.length > 0 ? (orders.map(order=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>                                                
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className='fas fa-times' style={{color:"red"}}></i>)}</td>
                        <td>

                          <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                </LinkContainer>                       
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

export default OrderListScreen
