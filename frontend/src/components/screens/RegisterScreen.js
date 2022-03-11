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
import { register } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
// Register Screen 
const RegisterScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;



  const redirect = location.search ? location.search.split('=')[1] : '/'

 

 

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history,userInfo,redirect]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(password !== cpassword) {
        setMessage("Password Do Not Match!")
    } else {
        dispatch(register(name,email,password,cpassword))
    }
    
}



  return (
    <FormContainer>
      <h1>Register YourSelf</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
     
    
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
     

      
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>

          
        </Form.Group>
       

    
        <Form.Group controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="cpassword"
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

      <Button className="my-3" type="submit" variant="primary">
       Register 
      </Button>
      </Form>


      <Row className="py-3">
        <Col>
          Already Have An Account ?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
           Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
