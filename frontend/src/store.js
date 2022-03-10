import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  //middleware
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducers, productReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productReducers,
    productsDetails:productDetailsReducers,
    cart:cartReducers,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails:userDetailsReducers
})

const cartItemsFromStrorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStrorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart:{cartItems:cartItemsFromStrorage},
    userLogin:{userInfo:userInfoFromStrorage}
}

const middleware = [thunk]


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)


export default store
