import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {productSearchKeword} from '../action/productAction'


const SearchBox = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [keyword, setKeyword]= useState('')
    const submitHandler = (e)=>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
    useEffect(() => {
        dispatch(productSearchKeword(keyword))
    }, [keyword,dispatch]);
  return (
    <Form onSubmit={submitHandler} style={{display:"flex"}}>
        <Form.Control type='text' name='q' onChange={(e)=> setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' placeholder='Search Products...'></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox
