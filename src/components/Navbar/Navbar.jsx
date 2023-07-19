import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import commerce from '../../assets/commerce.png';
import useStyles from './style';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography variant="h6" component= { Link } to="/" >
                <img src={ commerce } alt="Commerce.js" height="35px" className= { classes.image } />
                Commerce.js
            </Typography>
            <div className={ classes.grow } />
            { location.pathname === '/' && (
                <div className={ classes.button } >
                    <Link to="/cart"></Link>
                    <IconButton  component= { Link } to="/cart" aria-label="Show Cart Items" color= "inherit" >
                        <Badge badgeContent= {totalItems} color= "secondary">
                         <ShoppingCart />
                        </Badge>
                    </IconButton>
            </div> )}
        </Toolbar>
    </AppBar>
  )
}


export default Navbar
