import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUSET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUSET,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUSET,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUSET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUSET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUSET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUSET,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,

} from '../constants/userConstant';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const loginReducer = (state = {userInfo: userInfoFromStorage}, action) => {
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
      return {loading: false, user: action.payload};
    case USER_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    case USER_DETAILS_RESET:
      return {user:{}}
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUSET:
      return {loading: true};
    case USER_UPDATE_PROFILE_SUCCESS:
      return {loading: false,success:true, userInfo: action.payload};
    case USER_UPDATE_PROFILE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const userListReducer = (state = {users:[]}, action) => {
  switch (action.type) {
    case USER_LIST_REQUSET:
      return {loading: true};
    case USER_LIST_SUCCESS:
      return {loading: false, users: action.payload};
    case USER_LIST_FAIL:
      return {loading: false, error: action.payload};
    case USER_LIST_RESET :
      return {users:[]}
    default:
      return state;
  }
};


export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUSET:
      return {loading: true};
    case USER_DELETE_SUCCESS:
      return {loading: false, success: true, deleteMessage: action.payload};
    case USER_DELETE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};


export const userUpdateReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUSET:
      return {loading: true};
    case USER_UPDATE_SUCCESS:
      return {loading: false, success: true};
    case USER_UPDATE_FAIL:
      return {loading: false, error: action.payload};
    case USER_UPDATE_RESET :
        return {user:{}}
    default:
      return state;
  }
};


