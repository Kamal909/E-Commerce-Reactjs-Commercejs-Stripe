"use client";
import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './Styles';
const CardItem = ({ item, handleUpdateCartQty, onRemoveFromCart }) => {
    
const classes = useStyles();
  return (
   <Card>
        <CardMedia image={item.image.url} alt={item.name} className={classes.image}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">
                    {item.name}
                </Typography>
                <Typography variant='h5' >
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons }>
                    <Button size='small' type='button' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1 )}> - </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size='small' type='button' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1 )}> + </Button>
                </div>
                <Button type='button' color="secondary" variant='contained' onClick={() => onRemoveFromCart(item.id)}> Remove </Button>
            </CardActions>
        </CardMedia>
   </Card>
  )
}

export default CardItem
