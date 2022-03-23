import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { details, userUpdateDetails } from "../../actions/userActions";

import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { USER_ADMIN_UPDATE_RESET } from "../../constants/userConstants";

// Edit user Via Admin

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
 
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState("");
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const usersAdminUpdate = useSelector((state) => state.usersAdminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = usersAdminUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== params.id) {
        dispatch(details(params.id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, history, params, successUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateDetails({ _id: params.id,name,email,isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>User Data </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

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
                disabled
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
                disabled
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="isAdmin"
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
