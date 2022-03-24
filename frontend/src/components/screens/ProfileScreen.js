import React from "react";
import { useState, useEffect } from "react";
import { useHistory,Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  Table,
  Container,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { details,updateDetails } from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import { myOrders } from "../../actions/orderActions";



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
  

  const myyOrders = useSelector((state) => state.myyOrders);
  const {orders} = myyOrders;
  console.log(myyOrders)
  


  // const getUserData = async() => {
  //   const res = await fetch('/myorders', {
  //     method:"Get",
  //     headers: {
  //       Authorization: `${userInfo.token}`,
  //     },
  //   })

  //   const data = await res.json();
  //   console.log(data)
  // }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {

      if(!userInfo || !userInfo.name) {
        dispatch({type : USER_UPDATE_RESET})
         dispatch(details('profile'))
        dispatch(myOrders())
      } else {
 
        setName(userInfo.name)
        setEmail(userInfo.email)
       
        
      }
//  axios.get(`localhost:5000/api/orders/myorders`,{
  
//     headers: {
//       Authorization: `${userInfo.token}`,
//     },
  
//  })
      // .then((res) => {
      //   console.log(`res`,res.data)
      // })        

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
          {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

            <Table striped bordered responsive hover className="table-sm">
              <thead>
                <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
              </thead>
               <tbody>
                 {orders.map((order) => (
                  
                  <tr key={order._id}> 
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10):<i className="fas fa-times" style={{color:"red"}}></i>}</td>
                  <td>
                    <Container as={Link} to={`/order/${order._id}`}>


                      <Button className="btn-sm" variant="light">

                        Details
                      </Button>
                      
                      
                      </Container>
                  </td>
                </tr>


                 ))}

                
              
               </tbody>

            </Table>

          )

          }

      </Col>
    </Row>
  
  );
};

export default ProfileScreen;
