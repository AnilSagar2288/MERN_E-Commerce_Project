import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUSET,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUSET,
    USER_REGISTER_SUCCESS,
  } from '../constants/userConstant';

export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUSET})

        const config = {
            headers :{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/users/login`,{email,password},config)

        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const logout = () => async(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
}


export const register = (name,email,password) => async(dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUSET})

        const config = {
            headers :{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post(`http://localhost:5000/api/users`,{name,email,password},config)

        dispatch({type:USER_REGISTER_SUCCESS, payload:data})
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const userDetailsAction = () => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUSET})

        const config = {
            headers :{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.get(`http://localhost:5000/api/users/profile`,config)

        dispatch({type:USER_DETAILS_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const userUpdateAction = (formData) => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUSET})

        const config = {
            headers :{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/users/profile`,config,formData)

        dispatch({type:USER_DETAILS_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
