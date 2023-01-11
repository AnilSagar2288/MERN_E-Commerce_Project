import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, PayOrderAction,orderDeliveredAction } from '../action/orderAction'
import Loader from '../component/Loader'
import Message from '../component/Message'
import {ORDER_PAY_RESET, ORDER_DELIVERED_RESET} from '../constants/orderConstant'

const OrderScreen = () => {
    const {id} =useParams();
    const [sdkReady, setSdkReady] = useState(false)
    
    const dispatch = useDispatch() 
    const orderDetails =  useSelector(state=> state.orderDetails)
    const {error, order, loading} = orderDetails

    const userLogin =  useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const orderDelivered =  useSelector(state=> state.orderDelivered)
    const {success:successDelivered, loading: loadingDelivered} = orderDelivered


    const orderPay =  useSelector(state=> state.orderPay)
    const {success:successPay, loading: loadingPay} = orderPay


    if(!loading){
        // Calculate Price
        const addDecimals = (num) =>{
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0))         
    }

    useEffect(()=>{
        if(!userInfo){
            navigator('/login')
        }

        const addPayPalScript = async () =>{
            const {data:clientId} = await axios.get('http://localhost:5000/api/cogfig/paypal')
            console.log(clientId);
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload =()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDelivered){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
        //eslint-disable-next-line  
    },[dispatch,id,successPay,order,successDelivered])


    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult);
        dispatch(PayOrderAction(id, paymentResult))
    }

    const deliveredHandlered = () =>{
        dispatch(orderDeliveredAction(order))
    }

  return loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : <>
  <h1>{`Order ${order._id}`}</h1>
  <Row>
        <Col md={8}>
            <ListGroup>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name:</strong> {order.user.name}</p>
                    <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}

                    </p>
                    <div>{order.isDelivered ? <Message>Paid At: {order.deliveredAt}</Message>: <Message variant='danger'>Not Delivered</Message> } </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                    </p>
                    <div>{order.isPaid ? <Message>Paid At: {order.paidAt}</Message>: <Message variant='danger'>Not Paid</Message> } </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Item</h2>
                    {order.orderItems === 0 ? <Message>Your cart is empty</Message>:(
                        <ListGroup variant='flush'>
                            
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={6} className='justify-content-center' style={{display:"flex"}}>
                                        <Link to={`/product/${item.product}`} >{item.name}</Link>                                        
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x {item.price} = {item.qty * item.price}
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                            ))}                            
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup varient='flush'>
                <ListGroup.Item>Order Summery</ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items price:</Col>
                        <Col>${order.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping Price:</Col>
                        <Col>${order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax Price:</Col>
                        <Col>${order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><strong>Total Price:</strong></Col>
                        <Col><strong>${order.totalPrice}</strong></Col>
                    </Row>
                </ListGroup.Item>                
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? (<Loader />): (
                                <PayPalButton amount={order.totalPrice}  onSuccess={successPaymentHandler}/>                                
                            )}
                        </ListGroup.Item>
                    )}
                    {loadingDelivered && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button  variant="dark" type='button' block onClick={deliveredHandlered}>Mark as Delivered</Button>                        
                        </ListGroup.Item>
                    )}
            </ListGroup>
            </Card>
        </Col>
      </Row>
  </>
}

export default OrderScreen
