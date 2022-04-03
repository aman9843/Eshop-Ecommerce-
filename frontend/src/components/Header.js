import React from "react";
import { Navbar, Nav, Container, NavDropdown, NavItem,Image } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <header>
      {/* using navbar brand as link because imported from react bootstrap */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
        
          <Image className="homeLogo" src="../../images/logo.png" alt="logo"></Image>
        
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="headerNav">
              <Nav.Link as={Link} to="/cart">
                <i className="fa-solid fa-cart-shopping fa-lg"></i>Cart
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

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavItem>
                    <Container as={Link} to="/admin/userlist">
                      Users
                    </Container>
                  </NavItem>
                  <NavItem>
                    <Container as={Link} to="/admin/productlist">
                      Products
                    </Container>
                  </NavItem>
                  <NavItem>
                    <Container as={Link} to="/admin/orderlist">
                      Orders
                    </Container>
                  </NavItem>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
