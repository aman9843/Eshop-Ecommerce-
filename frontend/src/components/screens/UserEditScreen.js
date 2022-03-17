import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { details } from "../../actions/userActions";

import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";


// Edit user Via Admin

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const userId = useParams();
  console.log(userId)
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  
  const userDetails = useSelector((state) => state.userDetails);
  const {loading,error,user} = userDetails;
  console.log(userDetails)



    
  



  useEffect(() => {




    
        dispatch(details)
    
       

   


  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>User Data </h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isAdmin">
   
              <Form.Check
                type="checkbox"
                label='isAdmin'
                checked={isAdmin}
                onChange={(e) => {
                  setAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update Authorization
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
