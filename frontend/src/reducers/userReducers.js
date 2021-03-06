import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_RESET, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_ADMIN_UPDATE_FAIL, USER_ADMIN_UPDATE_RESET, USER_FORGET_PASSWORD_REQUEST, USER_FORGET_PASSWORD_SUCCESS, USER_FORGET_PASSWORD_FAIL, USER_FORGET_PASSWORD_RESET} from '../constants/userConstants'
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
        return { ...state,loading: true};
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
     case USER_DETAILS_RESET:
       return {user:{}}
  
      default:
        return state;
    }
  
  }



  // user Forget Password

export const userForgetPassword = (state ={}, action) => {
 
  switch (action.type) {
    case USER_FORGET_PASSWORD_REQUEST:
      return {loading: true};
    case USER_FORGET_PASSWORD_SUCCESS:
      return {loading: false, message:action.payload};
    case USER_FORGET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
      case USER_FORGET_PASSWORD_RESET:
       return {}
  

    default:
      return state;
  }

  }



  // user Rest Password

  export const userResetPassword = (state ={}, action) => {
 
    switch (action.type) {
      case USER_FORGET_PASSWORD_REQUEST:
        return {loading: true};
      case USER_FORGET_PASSWORD_SUCCESS:
        return {loading: false, success:action.payload};
      case USER_FORGET_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
  
  
      default:
        return state;
    }
  
    }


// USER LIST REDUCERS

export const userListReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {loading: true};
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: []}

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



// DELETE USER BY ADMIN


export const userDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {loading: true};
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true};
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }

}


// UPDATE AUTHORIZATION BY ADMIN

export const userAdminUpdateUser = (state = { user :{} }, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_REQUEST:
      return {loading: true};
    case USER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true};
    case USER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_UPDATE_RESET:
        return{}

    default:
      return state;
  }

}
