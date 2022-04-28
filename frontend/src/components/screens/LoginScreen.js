import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { login } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
// Login Screen  

const LoginScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;



  const redirect = location.search ? location.search.split('=')[1] : '/'
 

 

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history,userInfo,redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    dispatch(login(email,password))
}



  return (
    <FormContainer  noValidate validated={validated}>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            hasValidation
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
      </Form>

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
          required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

      <Button className="my-3" type="submit" variant="primary">
        Sign In
      </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Forgot Password ?{" "}
          <Link
            to='/forgotpassword'
          >
              Reset 
          </Link>
        </Col>
      </Row>


      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
              Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
