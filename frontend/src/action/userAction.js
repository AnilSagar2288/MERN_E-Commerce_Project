import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUSET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUSET,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUSET,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUSET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_REQUSET,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUSET,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
  } from '../constants/userConstant';
  import {MY_ORDER_LIST_RESET} from '../constants/orderConstant'
  import {toast } from 'react-toastify';

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
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:MY_ORDER_LIST_RESET})
    dispatch({type:USER_LIST_RESET})
    
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


export const getUserDetails = (id) => async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUSET})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`http://localhost:5000/api/users/${id}`,config)

        dispatch({type:USER_DETAILS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const updateUserProfile = (user) => async(dispatch,getState)=>{
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUSET})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{
                "Content-Type":"application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/users/profile`,user,config,)

        dispatch({type:USER_UPDATE_PROFILE_SUCCESS, payload:data})

        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}





export const getUserListDetails = () => async(dispatch,getState)=>{
    try {
        dispatch({type:USER_LIST_REQUSET})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`http://localhost:5000/api/users`,config)

        dispatch({type:USER_LIST_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const userDeleteAction = (userDeleteId) => async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DELETE_REQUSET})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`http://localhost:5000/api/users/${userDeleteId}`,config)
        console.log("data",data);
        if(data)  toast.success(data.message)

        dispatch({type:USER_DELETE_SUCCESS, payload:data})
        // const remaningUser=users.filter(user=>user._id !== userDeleteId)
        // console.log(remaningUser);
        // dispatch({type:USER_LIST_SUCCESS, payload:remaningUser})

    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
