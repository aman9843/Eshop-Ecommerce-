import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  //middleware
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducers, productReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateReducers } from './reducers/userReducers'
import { OrderDetailsReducers, OrderCreateReducers, OrderPayReducers } from './reducers/orderReducers'
//Reducers
const reducer = combineReducers({
    productList: productReducers,
    productsDetails:productDetailsReducers,
    cart:cartReducers,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdate:userUpdateReducers,
    orderCreate: OrderCreateReducers,
    ordersDetails:OrderDetailsReducers,
    orderPay:OrderPayReducers
    
})
// Get Item
const cartItemsFromStrorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStrorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress'))

 : {}


// Initial State
const initialState = {
    cart:{cartItems:cartItemsFromStrorage,
          shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStrorage},
   

}
// middleware
const middleware = [thunk]

// store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)


export default store
