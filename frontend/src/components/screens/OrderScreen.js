import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import Message from "../Message";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from "../../constants/orderConstants";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails, payOrder, deliverOrder } from "../../actions/orderActions";
import axios from "axios";


const OrderScreen = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const orderId = params.id;
  const [sdk, setSdk] = useState(false);

  const cart = useSelector((state) => state.cart);
  
  const ordersDetails = useSelector((state) => state.ordersDetails);
  const { order, loading, error } = ordersDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } = orderDelivered;


  //Payment Validation
  // To add decimal
  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2);
  // };
  // // // Items Price
  // order.itemsPrice = addDecimals(
  //   order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );
  //  // useeffect
  // order.itemsPrice = addDecimals(
  //   order.orderItems.reduce((acc,item) => acc + item.price * item.qty,0)
  // )

  useEffect(() => {


      if(!userInfo) {
        history.push('/login')
      }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };

      document.body.appendChild(script);
    };
    if (!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({type: ORDER_DELIVERED_RESET})
      dispatch(orderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch, orderId, successPay, order,successDelivered,history,userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);

    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
       dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Orders {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method:</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Item:</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order Item is Empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                <h2>Order Summary</h2>
              </ListGroupItem>
              {/* <ListGroupItem>
                <Row>
                  <Col> Items </Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col> Shipping Price </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col> Tax Price </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem> */}

              <ListGroupItem>
                <Row>
                  <Col> Total Price </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!sdk ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}

              {loadingDelivered && <Loader/>}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroupItem>
                <Button className="btn btn-block"
                         type="button" onClick={deliverHandler}>

                           Mark As Delivered

                </Button>
              </ListGroupItem>
              
              
              
              
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
