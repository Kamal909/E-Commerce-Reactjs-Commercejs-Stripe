import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './Styles';  


const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    return (
    <Card className={classes.root}>
    <CardMedia className={ classes.media } image={ product.image.url } title={ product.name } />
        <CardContent className={ classes.cardContent }>
            <Typography variant= "h6" >
                {product.name}
            </Typography>
            <Typography variant= "h6">
                {product.price.formatted_with_symbol}
            </Typography>
            <Typography   variant= "h6" dangerouslySetInnerHTML={{__html:product.description}}   color= "textSecondary">
            </Typography>
        </CardContent>
        <CardActions disableSpacing className={ classes.cardActions } >
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
            <AddShoppingCart/>
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product
