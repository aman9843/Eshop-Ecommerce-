import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_RESET, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST} from '../constants/userConstants'
///user login reducers
export const userLoginReducers = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {loading: true};
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
          return{}
  
      default:
        return state;
    }
  
  }
///user register reducers
export const userRegisterReducers = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return {loading: true};
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
          return{}
  
      default:
        return state;
    }
  
  }

///user details reducers

export const userDetailsReducers = (state = { user :{} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {loading: true};
      case USER_DETAILS_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
          return{}
  
      default:
        return state;
    }
  
  }
  

// update user details


export const userUpdateReducers = (state = { user :{} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {loading: true};
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
        return{}

    default:
      return state;
  }

}
