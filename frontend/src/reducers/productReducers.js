import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_RESET,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_TOP_PRODUCTS_REQUEST,
  PRODUCT_TOP_PRODUCTS_SUCCESS,
  PRODUCT_TOP_PRODUCTS_FAIL,
  PRODUCT_DETAILS_RESET,

} from "../constants/productConstants";



// Product Reducers
export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload.products, page:action.payload.page, pages:action.payload.pages};
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }



};


// Product Details Reducers

export const productDetailsReducers = (state = { products: {reviews: []} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true};
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_DETAILS_RESET:
        return{products:{reviews:[]}}
   

    default:
      return state;
  }

}


// DELETE USER BY ADMIN


export const productDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {loading: true};
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true};
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }

}


// CREATE PRODUCT VIA ADMIN

export const productCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {loading: true};
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success:true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
        return{}

    default:
      return state;
  }

}


// UPDATE PRODUCT VIA ADMIN

export const productUpdateReducers = (state = {product: {}}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {loading: true};
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success:true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
        return{product : {}}

    default:
      return state;
  }

}



// Review Product

export const productReviewReducers = (state = { } , action) => {
  switch (action.type) {
    case PRODUCT_REVIEWS_REQUEST:
      return {loading: true};
    case PRODUCT_REVIEWS_SUCCESS:
      return { loading: false, success:true};
    case PRODUCT_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEWS_RESET:
        return {}

    default:
      return state;
  }

}



// get product by id 

export const TopProductReducers = (state = { products:[]} , action) => {
  switch (action.type) {
    case PRODUCT_TOP_PRODUCTS_REQUEST:
      return {loading: true, products:[]};
    case PRODUCT_TOP_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload};
    case PRODUCT_TOP_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
   

    default:
      return state;
  }

}

