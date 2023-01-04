
import React, {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import { saveShippingAddress } from '../action/cartActions'
import FormContainer from '../component/FormContainer'
import {useNavigate} from 'react-router-dom'

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {shippingAddress} =useSelector(state=>state.cart)
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()  
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className='mt-4' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' value={address} required onChange={(e)=> setAddress(e.target.value)} placeholder="Enter Address" />
            </Form.Group>
            <Form.Group className='mt-4' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' value={city} required onChange={(e)=> setCity(e.target.value)} placeholder="Enter City" />
            </Form.Group>
            <Form.Group className='mt-4' controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' value={postalCode} required onChange={(e)=> setPostalCode(e.target.value)} placeholder="Enter postalCode" />
            </Form.Group>
            <Form.Group className='mt-4' controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' value={country} required onChange={(e)=> setCountry(e.target.value)} placeholder="Enter Country" />
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
