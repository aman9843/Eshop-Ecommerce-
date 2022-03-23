import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import { useParams } from "react-router-dom";
import { detailsProducts, productReviews } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { PRODUCT_REVIEWS_RESET } from "../../constants/productConstants";

// Product Screen

const ProductScreen = () => {
  const dispatch = useDispatch();
  const productsDetails = useSelector((state) => state.productsDetails);
  const { loading, error, products } = productsDetails;
  console.log(productsDetails);

  const productsReviews = useSelector((state) => state.productsReviews);
  const {loading: loadingReview, success: successReview, error: errorReview } = productsReviews;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const date = new Date();
  // const today = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

  const [qnt, setQnt] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();

  const history = useHistory();

  useEffect(() => {


    if(successReview) {
      
      setRating(0)
      setComment('')
    
    }

    if(!products._id || products._id === params.id) {

      dispatch(detailsProducts(params.id));
      dispatch({type:PRODUCT_REVIEWS_RESET})

    }
    
    
  }, [dispatch, params, successReview]);


  const addToCart = () => {
    history.push(`/cart/${params.id}?qnt:${qnt}`);
  };



  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(productReviews(params.id,{
      rating,
      comment
    }))

  }

  


  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={products.image} alt={products.name}></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{products.name}</h3>
                </ListGroupItem>
                <Rating
                  value={products.rating}
                  text={`${products.numReviews} reviews`}
                />
                <ListGroupItem>Price: ${products.price}</ListGroupItem>
                <ListGroupItem>
                  Description: ${products.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${products.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          $
                          {products.countInStock > 0 ? "InStock" : "OutOfStock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {products.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>QNT</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qnt}
                            onChange={(e) => setQnt(e.target.value)}
                          >
                            {[...Array(products.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      onClick={addToCart}
                      type="button"
                      disabled={products.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {products.reviews.length === 0 && (
                <Message variant="danger">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {products.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />

                    <p>{review.comment}</p>
                   
                  </ListGroupItem>
                ))}

                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  { errorReview && <Message variant='danger'>{errorReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={onSubmitHandler}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - fair</option>
                          <option value="3">3 - good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" disabled={loadingReview}>
                        Submit
                        
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login"> Sign In</Link>To Write A Review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
