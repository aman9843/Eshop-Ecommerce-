import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Message from "../Message";
import { addItem } from "../../actions/cartActions";
import { rmvItem } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const productId = params.id;
  console.log(productId);

  const qty = parseInt(
    location.search.substring(
      location.search.length - 1,
      location.search.length
    )
  );

  // location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addItem(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCart = (id) => {
    dispatch(rmvItem(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart Is Empty<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />

                      {/*  */}
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>

                    <Col md={3}>
                      <Form.Control
                        as="select"
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addItem(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      {/* <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addItem(item.product, Number(e.target.value))
                          );
                        }}
                      > */}
                        {/* {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))} */}
                      {/* </input> */}
                      {/* <Form.Select
                        aria-label="Default select example"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addItem(item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(qty).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select> */}
                   
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCart(item.product)}
                        style={{ fontSize: "25px" }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to CheckOut
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
