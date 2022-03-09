import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  //middleware
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducers, productReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'

const reducer = combineReducers({
    productReducer: productReducers,
    productsDetails:productDetailsReducers,
    cart:cartReducers
})

const cartItemsFromStrorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart:{cartItems:cartItemsFromStrorage}
}

const middleware = [thunk]


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)


export default store
