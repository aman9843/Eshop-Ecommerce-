import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_RESET,
  ALLORDER_LIST_REQUEST,
  ALLORDER_LIST_SUCCESS,
  ALLORDER_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";

export const OrderCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const OrderDetailsReducers = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const OrderPayReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

// ORDER DELIVERED STATUS VIA ADMIN

export const OrderDeliveredReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};

    default:
      return state;
  }
};

export const myOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    case MY_ORDERS_RESET:
      return { orders: [] };

    default:
      return state;
  }
};

export const AllOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALLORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ALLORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ALLORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
