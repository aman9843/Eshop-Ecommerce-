import React from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { listProducts } from "../../actions/productActions";
import { productDelete } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { productCreate } from "../../actions/productActions";


const ProductListScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log(products)

  const productsDelete = useSelector((state) => state.productsDelete);
  const {loading:loadingDelete, success:successDelete, error:errorDelete} = productsDelete;

  const productsCreate = useSelector((state) => state.productsCreate);
  const {loading:loadingCreate, success:successCreate, error:errorCreate, product:createdProduct} = productsCreate;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  


  useEffect(() => {

    dispatch({type:PRODUCT_CREATE_RESET})

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
     
    } 

    if(successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts(''));
    }
  }, [dispatch, history, userInfo,successDelete,successCreate,createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(productDelete(id))
    }
  };

  const createProductsHandler = () => {
      dispatch(productCreate())
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductsHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <Container as={Link} to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas  fa-eye"></i>
                    </Button>
                  </Container>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(product._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
