import axios from 'axios'
import {ADD_CART_ITEM,REMOVE_CART_ITEM} from '../constants/cartConstant'

export const addToCart = (id,qty) =>async (dispatch,getState)=>{
    const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)

    dispatch({type:ADD_CART_ITEM,payload:{
        product: data._id,
        name: data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty,
    }})

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => async(dispatch,getState) =>{
    dispatch({type:REMOVE_CART_ITEM, payload:id})

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}