import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { resetPassword } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
// Login Screen

const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPasswords = useSelector((state) => state.resetPasswords);
  const { loading, error, success } = resetPasswords;

  

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(password !== cPassword) {
      setMessage("Password Do Not Match!")
    } else {
      dispatch(resetPassword(params.token,password));
    }
    
  };

  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [dispatch, history, success]);

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={onSubmitHandler}>
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
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={cPassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Reset Your Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPassword;
