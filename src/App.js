import React, { useEffect, useState } from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout';
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { commerce } from '../src/components/lib/commerce';


const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  //const navigate = useNavigate();
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data);
    }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
      const { data } =  await commerce.cart.retrieve();
   
    }

    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);
      setCart(item);
     
    }

    const handleUpdateCartQty = async (productId, quantity) => {
      const item = await commerce.cart.update(productId, { quantity });
      setCart(item);
    }
    
    const handleRemoveFromCart = async (productId) => {
      const item = await commerce.cart.remove(productId);
      setCart(item);
    }

    const handleEmptyCart = async () => {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
      // console.log("cart is empty");
      // navigate("/");
      window.location.href = '/';
     
    }
   
    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();
  
      setCart(newCart);
    }; 

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
  
        setOrder(incomingOrder);
       refreshCart();

      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    }

    useEffect(() => {
      fetchProducts();
      fetchCart();
    }, []);
  
    return (
      <Router> 
        <div>
        <Navbar totalItems={ (cart) ? cart.total_items : '0'} />
            <Routes>
              <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
              <Route exact path='/cart' 
                element={<Cart cart={cart} 
                handleUpdateCartQty={handleUpdateCartQty} 
                handleRemoveFromCart={handleRemoveFromCart} 
                handleEmptyCart={handleEmptyCart} /> } 
              />
              <Route exact path= "/checkout" 
              element ={ <Checkout 
                onCaptureCheckout={handleCaptureCheckout} 
                order={order}
                error={errorMessage}
                cart={cart}></Checkout>} 
              
               />
            </Routes>
           
        </div>
      </Router>
    )
}
export default App