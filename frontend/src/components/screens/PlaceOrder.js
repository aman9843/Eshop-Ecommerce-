import React, {useEffect} from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Message";
import {orderList} from '../../actions/orderActions'
import CheckOut from "../CheckOut";
import { useHistory } from "react-router-dom";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import { ORDER_LIST_RESET } from "../../constants/orderConstants";

const PlaceOrder = () => {
const dispatch = useDispatch();
const history = useHistory();


  // Payment Details 
  //useSelector
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate)
  const {order,success,error} =  orderCreate
  




  // To add decimal
  const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
  }
  // Items Price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc,item) => acc + item.price * item.qty,0)
  )
   // Shipping Price
  cart.shippingPrice = addDecimals(
    cart.itemsPrice > 100 ? 0 : 100 )

  
  // Tax Price

  cart.taxPrice = addDecimals(Number((0.15*cart.itemsPrice).toFixed(2))) 
  
  // Total Price 

  cart.totalPrice = (Number(cart.itemsPrice)) + (Number(cart.shippingPrice)) + (Number(cart.taxPrice))
  
  const onPlaceOrder = () => {
    dispatch(orderList({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethods:cart.paymentMethods,
      itemsPrice:cart.itemsPrice,
      shippingPrice:cart.shippingPrice,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice

    }))
  }

    //useEffect 
useEffect(() => {
  if(success) {
    history.push(`/order/${order._id}`)
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_LIST_RESET})
    
  }

   //eslint-disable-next-line
},[history,success])


 

  return (
    <>
      <CheckOut step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method:</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}

          
            </ListGroupItem>
   
          <ListGroupItem>
            <h2>Order Item:</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your Cart Item is Empty </Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={4}>
                        {item.qty}*${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}

           
              </ListGroup>
            )}
          </ListGroupItem>
          </ListGroup>

          
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary </h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
             
                  <Col> Items </Col>
                  <Col>
                    ${cart.itemsPrice}
                 
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
             
                  <Col> Shipping Price </Col>
                  <Col>
                    ${cart.shippingPrice}
                 
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
             
                  <Col> Tax Price </Col>
                  <Col>
                    ${cart.taxPrice}
                 
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
             
                  <Col> Total Price  </Col>
                  <Col>
                    ${cart.totalPrice}
                 
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button type="button" className='btn-block' disabled={cart.cartItems === 0 } onClick={onPlaceOrder}>
                  Place Order
                </Button>
              </ListGroupItem>


            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
