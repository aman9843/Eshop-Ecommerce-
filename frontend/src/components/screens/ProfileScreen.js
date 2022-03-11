import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { details,updateDetails } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../constants/userConstants";

// Profile Screen 

const ProfileScreen = () => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const {loading,error,user} = userDetails;
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const userUpdate = useSelector((state) => state.userUpdate);
  const {success} = userUpdate;

 


  

 

 

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {

      if(!userInfo || !userInfo.name) {
        dispatch({type : USER_UPDATE_RESET})
         dispatch(details('profile'))
      } else {
 
        setName(userInfo.name)
        setEmail(userInfo.email)
       
        
      }

        

    }
  }, [dispatch,history,userInfo,user,success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(password !== cpassword) {
        setMessage("Password Do Not Match!")
    } else {
       dispatch(updateDetails({id : userInfo._id ,email,name,password,cpassword}))
    }
    
}



  return (  
    <Row>
      <Col md={3}>
      <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
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
       Update
      </Button>
      </Form>
      </Col>
      <Col md={9}>
          <h2>My Orders</h2>

      </Col>
    </Row>
  );
};

export default ProfileScreen;
