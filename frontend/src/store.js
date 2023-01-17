import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cardReducer'
import { myOrderListReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer, orderReducer } from './reducers/orderReducer'
import { productCreateReducer, productCreateReviewReducer, productDeleteReducer, productDetailsReducer, productListReducer, productSearchReducer, productUpdateReducer } from './reducers/productReducer'
import { loginReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer'

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
    orderDelivered: orderDeliveredReducer,
    myOrders: myOrderListReducer,
    ordersList: orderListReducer,
    userList: userListReducer,
    deleteUser: userDeleteReducer,
    updateUser: userUpdateReducer,
    deleteProduct: productDeleteReducer,
    createProduct: productCreateReducer,
    updateProduct: productUpdateReducer,
    createProductReview: productCreateReviewReducer,
    searchKeyword : productSearchReducer
})




const store = configureStore({reducer})

export default store