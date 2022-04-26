import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  //middleware
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducers, productReducers,productDeleteReducers,productCreateReducers, productUpdateReducers,productReviewReducers, TopProductReducers} from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateReducers, userListReducers, userDeleteReducers,userForgetPassword,userResetPassword, userAdminUpdateUser } from './reducers/userReducers'
import { OrderDetailsReducers, OrderCreateReducers, OrderPayReducers, myOrdersReducers, AllOrdersReducers, OrderDeliveredReducers} from './reducers/orderReducers'
//Reducers
const reducer = combineReducers({
    productList: productReducers,
    productsDetails:productDetailsReducers,
    productsDelete:productDeleteReducers,
    productsCreate:productCreateReducers,
    productsUpdate:productUpdateReducers,
    productsReviews:productReviewReducers,
    topProducts:TopProductReducers,
    cart:cartReducers,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdate:userUpdateReducers,
    orderCreate: OrderCreateReducers,
    ordersDetails:OrderDetailsReducers,
    orderPay:OrderPayReducers,
    orderDelivered:OrderDeliveredReducers,
    myyOrders:myOrdersReducers,
    allOrders:AllOrdersReducers,
    usersList:userListReducers,
    usersDelete:userDeleteReducers,
    usersAdminUpdate:userAdminUpdateUser,
    forgetPasswords:userForgetPassword,
    resetPasswords:userResetPassword
    
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
