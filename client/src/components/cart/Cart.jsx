import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress, Button } from '@material-ui/core';
import { getProductsInCart, deleteAllCart } from '../../redux/cartReducer/actions';
import CartItem from './CartItem';
import { useStylesCart } from './styles';
import CartTotal from './CartTotal';

const Cart = () => {
    const styles = useStylesCart();
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartReducer.productsInCart);
    const [ productsInCart, setProductsInCart ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        dispatch(getProductsInCart(1));
    }, []);

    useEffect(() => {
        setProductsInCart(products);
        setTimeout(() => setLoading(false), 1000);
    }, [products]);

    const handleDeleteCart = () => {
        dispatch(deleteAllCart(1)); // userId hard-coded
    }

    const cart = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <Container className={styles.cartItemsContainer} >
                        { productsInCart.map(product => <CartItem key={product.id} product={product} />) }
                    </Container>
                    <Container>
                        <CartTotal products={products} />
                    </Container>
                </Container>
                <Container>
                    <Button onClick={handleDeleteCart} >
                        Remove All Cart
                    </Button>
                </Container>
            </Container>
        );
    }

    return loading ? <CircularProgress disableShrink className={styles.isLoading} /> : cart();
};

export default Cart;
