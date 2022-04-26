import axios from "axios";
import { MY_ORDERS_RESET } from "../constants/orderConstants";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_ADMIN_UPDATE_FAIL,
  USER_FORGET_PASSWORD_REQUEST,
  USER_FORGET_PASSWORD_SUCCESS,
  USER_FORGET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL
} from "../constants/userConstants";

// Login Action

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: MY_ORDERS_RESET,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
};

// Register Action
export const register =
  (name, email, password, cpassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password, cpassword },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


// Forgot Password Actions 
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGET_PASSWORD_REQUEST});

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/forgotpassword",
      {email},
      config
    );

    dispatch({ type: USER_FORGET_PASSWORD_SUCCESS, payload: data.message});
    
  } catch (error) {
    dispatch({
      type: USER_FORGET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// Reset Password Actions


export const resetPassword = (token,password) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST});

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/users/resetpassword/${token}`,
      {password},
      config
      
    );

    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data.success});
    
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




// User Details Action

export const details = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });


  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Update Details

export const updateDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User List Actions

export const userList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.get(`/api/users/register`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User DELETE ACTIONS

export const userDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.delete(`/api/users/${id}`, config);
    console.log(data);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user authorization update by admin

export const userUpdateDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADMIN_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    console.log(data);

    dispatch({ type: USER_ADMIN_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
