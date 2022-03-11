import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,CART_PAYMENT_METHOD} from '../constants/cartConstants'


// Cart Actions to add Item 

export const addItem = (id,qty) =>async(dispatch,getState) => {
    
       
        const {data} = await axios.get(`/api/products/${id}`)   
     

         dispatch({
             type:CART_ADD_ITEM,
             payload:{
                 product:data._id,
                 name:data.name,
                 image:data.image,
                 price:data.price,
                 countInStock:data.countInStock,
                 qty


             },
         })
         localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        console.log(data.countInStock)
        console.log(data.name)
}

// Cart Actions To remove Item 

export const rmvItem = (id) => async(dispatch,getState) => {
     dispatch({
         type:CART_REMOVE_ITEM,
         payload:id,
         
     })
     localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


// Cart Actions for Saving Shipping Address 
export const saveAddress = (data) => async(dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
        
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}


// cart Payment Method

export const savePaymentMethod = (data) => async(dispatch) => {
    dispatch({
        type:CART_PAYMENT_METHOD,
        payload:data,
        
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}