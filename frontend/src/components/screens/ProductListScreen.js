import React from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { listProducts } from "../../actions/productActions";
import { productDelete } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { productCreate } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import Paginate from "./Paginate";
import Swal from 'sweetalert2'

const ProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1
  console.log(pageNumber)
  const dispatch = useDispatch();

  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error,page,pages} = productList;
  console.log(productList)

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
      dispatch(listProducts('',pageNumber));
    }
  }, [dispatch, history, userInfo,successDelete,successCreate,createdProduct,pageNumber]);

 
  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      dispatch(productDelete(id))
    })
  };


  const createProductsHandler = () => {
    dispatch(productCreate())
   
  }

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
        <Paginate  page={page} pages={pages} isAdmin={true}/>
        
    </>
  );
};

export default ProductListScreen;
