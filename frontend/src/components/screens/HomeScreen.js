import React, {useEffect } from "react";
import { Row, Col} from "react-bootstrap";
import Product from "../Product";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "./Paginate";
import ProductCarosul from "../ProductCarosul";
import Meta from "../Meta";



const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1
  const productList = useSelector((state) => state.productList);
  const { loading, error, products,page,pages } = productList;
  

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);
  return (
    <>
    <Meta/>
      {!keyword ? <ProductCarosul/> : <Link to='/' className="btn btn-light" > Go Back</Link>}
      
      <h1 style={{textAlign:"center"}}>Latest Products</h1>
     
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
     
        </Row>
       
         
         <Paginate  page={page} pages={pages} keyword={keyword ? keyword : ''}/>
        
        
        </>
      )}
    </>
  );
};

export default HomeScreen;
