import React from 'react'
import { useState} from "react";
import {
    Button,
    Form,
  } from "react-bootstrap";
  import FormContainer from "../FormContainer";
  import { saveAddress } from "../../actions/cartActions";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckOut from '../CheckOut';
  
const ShippingScreen = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const cart = useSelector((state) => state.cart)
   const {shippingAddress} = cart;



   

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(saveAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

  return (
   <FormContainer>
       <CheckOut step1 step2/>
       <h1>Shipping</h1>
        <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="postalcode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>


          <Button
          className='my-3'
          type='submit'
          variant='primary'>
              Continue

          </Button>


        </Form>

   </FormContainer>
  )
}

export default ShippingScreen