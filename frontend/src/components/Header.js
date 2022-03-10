import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logOutHandler = () => {
    
     
    dispatch(logOut())

  };

  return (
    <header>
      {/* using navbar brand as link because imported from react bootstrap */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Eshop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="headerNav">
              <Nav.Link as={Link} to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <Container as={Link} to="/profile">
                    Profile
                  </Container>

                  <NavDropdown.Item onClick={logOutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (

                <Nav.Link as={Link} to="/login">
                <i className="fa-solid fa-user"></i>Sign In
              </Nav.Link>
               
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
