import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { resetPassword } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

// Login Screen

const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  

  const resetPasswords = useSelector((state) => state.resetPasswords);
  const { loading, error, success } = resetPasswords;

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  const onSubmitHandler = (e) => {
  
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (password !== cPassword) {
      setMessage("Password Do Not Match!");
    } else {
      dispatch(resetPassword(params.token, password, cPassword, message));
      history.push("/login");
      Swal.fire(
        "Your Password Has Changed",
        "Now You Can Login....",
        "success"
      );

   

    }
  };

  useEffect(() => {}, [dispatch, history, success, message]);

  return (
    <FormContainer noValidate validated={validated}>
      <h1>Reset Password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={onSubmitHandler}>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Cpassword"
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
