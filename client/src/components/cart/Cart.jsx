import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

const Cart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsInCart());
    }, []);

    return (
        <Container>
            
        </Container>
    );
};

export default Cart;
