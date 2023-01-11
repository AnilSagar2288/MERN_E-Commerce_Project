import axios from 'axios'
import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from '../constants/productConstant'
import {toast } from 'react-toastify';

export const productListAction = () => async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('http://localhost:5000/api/products')

        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})
        

    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const productDetailsAction = (id) => async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)

        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const productDeleteAction = (deleteId) => async(dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`http://localhost:5000/api/products/${deleteId}`,config)
        if(data)  toast.success(data.message)

        dispatch({type:PRODUCT_DELETE_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const productCreateAction = () => async(dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_CREATE_REQUEST})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{ 
                "Content-Type":"application/json",               
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/products`,{},config)

        dispatch({type:PRODUCT_CREATE_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const productUpdateAction = (product) => async(dispatch, getState)=>{
    try {
        dispatch({type:PRODUCT_UPDATE_REQUEST})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{ 
                "Content-Type":"application/json",               
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/products/${product._id}`,product,config)

        dispatch({type:PRODUCT_UPDATE_SUCCESS})
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}