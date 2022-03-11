import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckOut = ({step1, step2, step3, step4}) => {
  return (
    <>
    <Nav className='justify-content-center mb-4'>
        <Nav.Item> 
            
            {step1 ? (
            <Container as={Link} to="/login">
                 <Nav>Sign In</Nav>
            </Container> ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
            
            )} 
            
        </Nav.Item>

        <Nav.Item> 
            
            {step2 ? (
            <Container as={Link} to="/shipping">
                 <Nav>Shipping</Nav>
            </Container> ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
            
            )} 
            
        </Nav.Item>

        <Nav.Item> 
            
            {step3 ? (
            <Container as={Link} to="/payment">
                 <Nav>Payment</Nav>
            </Container> ) : (
            <Nav.Link disabled>Payment</Nav.Link>
            
            )} 
            
        </Nav.Item>

        <Nav.Item> 
            
            {step4 ? (
            <Container as={Link} to="/placeorder">
                 <Nav>Place Order</Nav>
            </Container> ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
            
            )} 
            
        </Nav.Item>
        
        
    </Nav> 

   
    </>
  )
}

export default CheckOut