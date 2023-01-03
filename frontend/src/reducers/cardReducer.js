import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cartConstant'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

export const cartReducer = (state= { cartItems:cartItemsFromStorage}, action) =>{
    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
              return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                  x.product === existItem.product ? item : x
                ),
              };
            } else {
              return {
                ...state,
                cartItems: [...state.cartItems, item],
              };
            }
            case REMOVE_CART_ITEM:
              return{
                ...state,
                cartItems:state.cartItems.filter((x)=> x.product !== action.payload)
              }
        default:
            return state;
    }
}