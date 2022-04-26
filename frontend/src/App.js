import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrder from "./components/screens/PlaceOrder";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";
import ForgetPassword from "./components/screens/ForgetPassword";
import ResetPassword from "./components/screens/ResetPassword";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-2">
        <Route exact path="/">
                  <HomeScreen />
                </Route>
                <Route exact path="/search/:keyword">
                  <HomeScreen />
                </Route>
                <Route exact path="/page/:pageNumber">
                  <HomeScreen />
                </Route>
           <Container>
            <Row>
              <Switch>
               
               <Container>
                <Route exact path="/login">
                  <LoginScreen />
                </Route>
                <Route exact path="/register">
                  <RegisterScreen />
                </Route>
                <Route exact path="/profile">
                  <ProfileScreen />
                </Route>
                <Route exact path="/shipping">
                  <ShippingScreen />
                </Route>
                <Route exact path="/payment">
                  <PaymentScreen />
                </Route>
                <Route exact path="/placeorder">
                  <PlaceOrder />
                </Route>
                <Route exact path="/admin/userlist">
                  <UserListScreen />
                </Route>
                <Route exact path="/admin/productlist">
                  <ProductListScreen />
                </Route>
                <Route exact path="/admin/productlist/:pageNumber">
                  <ProductListScreen />
                </Route>
                <Route exact path="/admin/orderlist">
                  <OrderListScreen />
                </Route>
                <Route exact path="/admin/user/:id/edit">
                  <UserEditScreen />
                </Route>
                <Route exact path="/admin/product/:id/edit">
                  <ProductEditScreen />
                </Route>
                <Route exact path="/forgotpassword">
                  <ForgetPassword />
                </Route>
                <Route exact path="/resetpassword/:token">
                  <ResetPassword />
                </Route>
               
                <Route exact path="/search/:keyword/page/:pageNumber">
                  <HomeScreen />
                </Route>



                <Route exact path="/order/:id">
                  <OrderScreen />
                </Route>

                <Route exact path="/products/:id">
                  <ProductScreen />
                </Route>

                <Route exact path="/cart/:id?">
                  <CartScreen />
                </Route>
                </Container>
               
              </Switch>
            </Row>
            </Container>
        
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
