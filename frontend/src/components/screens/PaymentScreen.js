import React from "react";
import { useState } from "react";
import { Form, Col, Button} from "react-bootstrap";
import FormContainer from "../FormContainer";
import { savePaymentMethod } from "../../actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckOut from "../CheckOut";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(cart);

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
    <CheckOut step1 step2 step3 />
    <h1>Payment Method</h1>
    <Form onSubmit={onSubmitHandler}>
      <Form.Group>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
         
        </Col>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </Form>
  </FormContainer>
  );
};

export default PaymentScreen;
