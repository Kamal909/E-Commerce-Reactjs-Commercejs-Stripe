import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './Styles';
import { Link, useLocation } from 'react-router-dom';
import CardItem from './CardItem/CardItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes= useStyles();

    const EmptyCart = () => (
        <Typography variant= "subtitle1" >You have no items in your shoping cart, start adding one!!</Typography>
    );

    const FilledCard = () => (
        <>
       <Grid container spacing={3}>
        
            {cart.line_items.length > 0 ? cart.line_items.map((item) => (
                <Grid item xs= {12} sm= {14} key= {item.id} >
                    <div>{item.name}</div>
                    <CardItem item={item} handleUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} ></CardItem>
                </Grid>
            )) : ('')}
            
        </Grid>
        <div className={ classes.cardDetails }>
            <Typography className={ classes.title }  variant="h4" gutterBottom>Your Shoping Cart</Typography>
        </div>
        </> 
    );

    if(!cart) return 'Loading....';

  return (
   <Container>                             
    <div className={ classes.toolbar } />
    { <Typography className={ classes.title}  variant= 'h5'> Subtotal: { (cart) ? cart.subtotal.formatted_with_symbol : ''}</Typography> }
    <div>
   
    {   <Button className={ classes.emptyButton } size="medium" type='button' color="secondary"  variant="contained" onClick={handleEmptyCart}>Empty Cart </Button>}
        <Button className={ classes.checkoutButton } component={Link} to="/checkout" size="medium"  type="button" variant="contained" color="primary" >Checkout</Button>
    </div>
    { !cart.line_items.length ? <EmptyCart /> : <FilledCard /> }
    </Container>
  )
}

export default Cart
