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
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUSET,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstant';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUSET:
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};


export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUSET:
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_REGISTER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};



export const userDetailsReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUSET:
      return {...state,loading: true};
    case USER_DETAILS_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUSET:
      return {loading: true};
    case USER_UPDATE_SUCCESS:
      return {loading: false, userInfo: action.payload};
    case USER_UPDATE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};