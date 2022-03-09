import React, {useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const { loading, error, products } = productReducer;
 

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;