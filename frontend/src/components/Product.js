import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (

    // creating a card for listing all products inside a card from react-bootstrap
  
    <>
    <Card className='my-3 p-4 rounded'>

      <Link to={`/products/${product._id}`}>
          <Card.Img src = {product.image} variant='top' />

      </Link>
    
    <Card.Body>

      <Link to={`/products/${product._id}`}>
          <Card.Title as='div'>
              <strong>{product.name}</strong>

          </Card.Title>

      </Link>
      <Card.Text as='div'>
          <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          
          
          />
        
    </Card.Text>
    <Card.Text as='h3'>
        {product.price}
          
        
    </Card.Text>

    </Card.Body>
    </Card>



    </>
  )
}

export default Product