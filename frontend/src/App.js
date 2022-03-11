import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';

const App = () => {
  return (
    <>
    <Router>
      <Header/>
      <main className='py-2'>
        
      
        <Container >
          <Switch>
            <Route exact path="/">
            <HomeScreen/> 
            </Route>
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
            <Route exact path="/products/:id">
            <ProductScreen/>
            </Route>
            <Route exact path="/cart/:id?">
           <CartScreen/>
            </Route>
          </Switch>
          
   
        </Container>
      </main>
      <Footer/>
      </Router>
      
    </>
  );
}

export default App;
