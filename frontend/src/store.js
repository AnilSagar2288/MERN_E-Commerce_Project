import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cardReducer'
import { myOrderListReducer, orderDetailsReducer, orderPayReducer, orderReducer } from './reducers/orderReducer'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { loginReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'

const reducer  = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin: loginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: orderReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myOrderListReducer,
    userList: userListReducer,
    deleteUser: userDeleteReducer,
})


// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// const initialState = {
//     cart: {cartItems: cartItemsFromStorage},
//     userLogin: {userInfo:userInfoFromStorage}

// }



const store = configureStore({reducer})

export default store