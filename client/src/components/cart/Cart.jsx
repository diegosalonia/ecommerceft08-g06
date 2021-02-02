import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { getProductsInCart } from '../../redux/cartReducer/actions';
import CartItem from './CartItem';
import { useStylesCart } from './styles';

const Cart = () => {
    const styles = useStylesCart();
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartReducer.productsInCart);
    const [ productsInCart, setProductsInCart ] = useState([]);

    useEffect(() => {
        dispatch(getProductsInCart(1));
    }, []);

    useEffect(() => {
        setProductsInCart(products);
    }, [products]);

    return (
        <Container className={styles.container} >
            <Container className={styles.cartItemsContainer} >
                { productsInCart.map(product => <CartItem product={product} />) }
            </Container>
            <Container>

            </Container>
        </Container>
    );
};

export default Cart;
