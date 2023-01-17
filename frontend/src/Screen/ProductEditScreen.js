import React, {useEffect,useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector, useDispatch} from "react-redux"
import Message from '../component/Message'
import Loader  from '../component/Loader'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {productDetailsAction, productUpdateAction} from '../action/productAction'
import FormContainer from '../component/FormContainer'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstant'
import axios from 'axios'



const ProductEditScreen = () => {
    const {id} = useParams()
    const [name,setName] =useState("")
    const [price,setPrice] =useState(0)
    const [image,setImage] =useState("")
    const [brand,setBrand] =useState("")
    const [category,setCategory] =useState("")
    const [countInStock,setCountInStock] =useState(0)
    const [description,setDescription] =useState("")
    const [uploading,setUploading] =useState(false)
    const navigate = useNavigate() 
    
    const {loading,error,product} = useSelector(state=>state.productDetails)
    const {loading:updateLoading,error:updateError,success:successUpdate} = useSelector(state=>state.updateProduct)

    const dispatch = useDispatch()

    

    useEffect(() => {
      if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET})
        navigate('/admin/productList')
      }else{
        if(!product.name || product._id !== id){
          dispatch(productDetailsAction(id))
        }else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.thumbnail)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }
      }              
    }, [dispatch,id,product,navigate,successUpdate]);

    const uploadFileHandler = async(e) =>{
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
      try {
        const config ={
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }

        const {data} = await axios.post('http://localhost:5000/api/upload', formData, config)
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.log(error)
        setUploading(false)
      }
    }

    const submitHandler  =(e) =>{
      e.preventDefault()
      dispatch(productUpdateAction({_id:id,name,price,image,brand,category,countInStock,description}))
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
      <Link to="/admin/productList" className='btn btn-light my-3'>Go Back</Link>
      {updateLoading && <Loader />}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {successUpdate && toast.success("Product update Successfully !!") }
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
        <FormContainer>
        <h2>Edit Product</h2>
          <Form onSubmit={submitHandler}>
              <Form.Group className='mt-4' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type='number' value={price} onChange={(e)=> setPrice(e.target.value)} placeholder="Enter Price" />
              </Form.Group>
              <Form.Group className='mt-4'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type='text' value={image} onChange={(e)=> setImage(e.target.value)} placeholder="Enter image url" />
                  <Form.Control type='file' id='image-file' lable='Choose file' custom onChange={uploadFileHandler}></Form.Control>
                  {uploading && <Loader />}
              </Form.Group>

              <Form.Group className='mt-4' controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type='text' value={brand} onChange={(e)=> setBrand(e.target.value)} placeholder="Enter Brand" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control type='text' value={category} onChange={(e)=> setCategory(e.target.value)} placeholder="Enter Brand" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control type='text' value={category} onChange={(e)=> setCategory(e.target.value)} placeholder="Enter Category" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control type='number' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} placeholder="Enter Count In Stock" />
              </Form.Group>
              <Form.Group className='mt-4' controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Enter Description" />
              </Form.Group>
              <Button type='submit' variant='primary' className='mt-4'>Update</Button>
          </Form>        
      </FormContainer>
      )}
    </>
    
  )
}

export default ProductEditScreen
