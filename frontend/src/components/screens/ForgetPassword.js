import React from "react";
import { useState, useEffect } from "react";
import {useHistory } from "react-router-dom";
import {

  Button,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import {forgetPassword} from "../../actions/userActions"
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { USER_FORGET_PASSWORD_RESET } from "../../constants/userConstants";
// Login Screen  

const ForgetPassword = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");

  const forgetPasswords = useSelector((state) => state.forgetPasswords);
  const { loading, message, error } = forgetPasswords;




  



  // const redirect = location.search ? location.search.split('=')[1] : '/resetpassword'
 

const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email))

    dispatch({ type: USER_FORGET_PASSWORD_RESET });
}

  useEffect(() => {

    if (message) {
      history.push('/resetpassword')
      alert(message)
      
    }
  }, [dispatch,history,message]);








  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      {error && <Message variant='danger'>{error}</Message>}
     
      {loading && <Loader />}
      
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

      <Button className="my-3" type="submit" variant="primary">
        Send Mail
      </Button>
      </Form>

  
        
        
        





    </FormContainer>
  );
};

export default ForgetPassword;
