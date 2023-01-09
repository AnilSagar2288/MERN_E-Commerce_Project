import React, { useEffect } from 'react'
import { Button, Table,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {productDeleteAction, productListAction  } from '../action/productAction'
import Loader from '../component/Loader'
import Message from '../component/Message'



const ProductListScreen = () => {
  const navigate =useNavigate()
    const dispatch = useDispatch()
    const {products,error,loading} = useSelector(state=>state.productList)             
    const {success: successDelete, loading: loadingDelete, error: errorDelete} = useSelector(state=>state.deleteProduct) 
    const {userInfo} = useSelector(state=>state.userLogin) 
    
    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(productListAction())
      }else{
        navigate('/login')
      }
        
        //console.log("In useEffect")
    }, [dispatch,navigate,userInfo,successDelete]);

    const createProductHandler = (product)=>{
      console.log(product);
    }

    const deleteUserHandler = (id) => {
      if(window.confirm("Are you sure!")){
        // Delete Product
        dispatch(productDeleteAction(id))
      }
    }
  return ( 
    <>    
    {loadingDelete && <Loader />}  
    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}  
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

        <Row className='align-item-center'>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className='text-right' style={{display: "contents"}}>
            <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'></i> Create Product</Button>
          </Col>
        </Row>        
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>: (
                <>                
                {products.length > 0 ? (products.map(product=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <Link to={`/admin/product/${product._id}/edit`} as='span'>
                            <Button variant="success" className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </Link>
                          
                          <Button variant="danger" className='btn-sm ml-2'  onClick={()=>deleteUserHandler(product._id)}>
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

export default ProductListScreen
