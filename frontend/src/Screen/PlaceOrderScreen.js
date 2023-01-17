import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
// import { createOrder } from '../action/orderAction'
import {addOrder} from '../action/orderAction'
import CheckOutSteps from '../component/CheckOutSteps'
import Message from '../component/Message'

const PlaceOrderScreen = () => {
    const cart = useSelector(state=> state.cart)
    console.log(cart)
    
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const createOrder = useSelector(state=> state.createOrder)
    const {success, error, order} = createOrder

    // Calculate Price
    const addDecimals = (num) =>{        
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    const itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc + Number(item.price) * Number(item.qty),0))
    
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    
    const taxPrice = addDecimals((0.15 * itemsPrice))
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)


    const placeOrderHandler = () =>{         
        dispatch(addOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:itemsPrice,
            taxPrice:taxPrice,
            shippingPrice: shippingPrice,
            totalPrice:totalPrice
        }))
    }

    useEffect(()=>{
        if(cart && !cart.paymentMethod){
            navigate('/payment')
        }
        if(success){
            navigate(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[navigate,success])

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Item</h2>
                    {cart.cartItems === 0 ? <Message>Your cart is empty</Message>:(
                        <ListGroup variant='flush'>
                            
                            {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.thumbnail} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={8} className='justify-content-center' style={{display:"flex"}}>
                                        <Link to={`/product/${item.product}`} >{item.name}</Link>                                        
                                    </Col>
                                    <Col md={3}>
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
                        <Col>${itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping Price:</Col>
                        <Col>${shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax Price:</Col>
                        <Col>${taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col><strong>Total Price:</strong></Col>
                        <Col><strong>${totalPrice}</strong></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn-block' type='button' onClick={placeOrderHandler} disabled={cart.cartItems === 0} style={{width:"100%"}}>Place Order</Button>
                </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
