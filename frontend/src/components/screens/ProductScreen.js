import React,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form} from 'react-bootstrap'
import Rating from '../Rating'
import { useParams } from 'react-router-dom'
import {detailsProducts} from "../../actions/productActions";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'



// Product Screen 

const ProductScreen = () => {
  const dispatch = useDispatch();
  const productsDetails = useSelector((state) => state.productsDetails);
  const { loading, error, products } = productsDetails;
  const [qnt,setQnt] = useState(1);
  const params = useParams();
  const history = useHistory();
  const addToCart = () => {
        history.push(`/cart/${params.id}?qnt:${qnt}`)
  }
  

  useEffect(() => {
  
     //eslint-disable-next-line
     dispatch(detailsProducts(params.id))
  },[dispatch,params])
 
  return (
    <>
   <Link className='btn btn-light my-3' to='/'>
     Go Back
   </Link>

   {loading?<Loader />: error?<Message variant='danger'>{error}</Message>:(
     <Row>
     <Col md={6}>
       <Image src={products.image} alt={products.name}></Image>
       
     </Col>
     <Col md={3}>

       <ListGroup variant='flush'>
         <ListGroupItem>
           <h3>{products.name}</h3>
         </ListGroupItem>
         <Rating
         
         value={products.rating}
         text={`${products.numReviews} reviews`}


        />
        <ListGroupItem>Price: ${products.price}</ListGroupItem>
        <ListGroupItem>Description: ${products.description}</ListGroupItem>

       </ListGroup>

     </Col>
     <Col md={3}>

       <Card>
         <ListGroup variant='flush'>
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
                <strong>${products.countInStock > 0 ? 'InStock' : 'OutOfStock'}</strong>

               </Col>
             </Row>

           </ListGroupItem>

           {products.countInStock > 0 && (

             <ListGroupItem>
               <Row>
                 <Col>QNT</Col>
                 <Col>
                  <Form.Control

                  as='select'
                  value={qnt}
                  onChange={(e) => setQnt(e.target.value)}>


                    {[...Array(products.countInStock).keys()].map((x) =>(

                    <option
                    key={x+1}
                    value={x+1}
                    >
                      {x+1}
                    </option>

                       
                    ))}
        




                </Form.Control>
                 </Col>
               </Row>

             </ListGroupItem>

           )}
           <ListGroupItem>
             <Button className='btn-block' onClick={addToCart} type='button' disabled={products.countInStock === 0}>
               Add To Cart
             </Button>

           </ListGroupItem>
         </ListGroup>
       </Card>
     
     
     </Col>
     
   </Row>

   )}
   

   

    </>
  )
}

export default ProductScreen