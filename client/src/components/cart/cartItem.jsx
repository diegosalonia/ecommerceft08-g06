import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStyles } from './styles';
import { removeProductToCart, incrementCartItem, decrementCartItem } from '../redux/CartReducer/actions.js';
import { Product } from '../product/product.jsx';


const CartItem = () => {
    const[itemQuantity, setItemQuantity] = useState(quantity);
    const product = useSelector(state => state.cartReducer.productList);
    const dispatch = useDispatch();
    const removeItem = () => {
        dispatch(removeProductToCart(id));
    };

    const incOrDecItem = (e, type) => {
        const value = itemQuantity;

        if(type === incrementCartItem && value < Product.props.stock) {
            setItemQuantity(itemQuantity + 1);
            distpach(incrementCartItem(id));
        }

        if(type === decrementCartItem && value > 1) {
            setItemQuantity(itemQuantity - 1);
            distpach(decrementCartItem(id));
        }
    };

    
};

export default CartItem;