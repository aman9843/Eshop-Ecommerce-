import React, { useEffect } from "react";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { topProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const ProductCarosul = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;
  console.log(topProducts)
 
  useEffect(() => {
    dispatch(topProduct());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause='hover' className="bg-primary"> 
       {products.map(product => (

           <Carousel.Item key={product._id}>
               <Link to={`/products/${product._id}`}>

               <Image src={product.image} alt={product.name}></Image>
               <Image className= "img2" src={product.image} alt={product.name}></Image>
               
               <Carousel.Caption className="carousel-caption">
                 
               <Image className="logo" src="../../images/logo.png" alt="logo"></Image>


                   <h2 className="ch">{product.name} ${product.price}</h2>

               </Carousel.Caption>


               </Link>

           </Carousel.Item>
           
            
           

       ))}
    </Carousel>
  );
};

export default ProductCarosul;
