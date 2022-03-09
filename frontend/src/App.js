import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';

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