import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress, Button, Link } from '@material-ui/core';
import { getProductsInCart, deleteAllCart } from '../../redux/cartReducer/actions';
import { useStylesCart } from './styles';
import  FadeIn  from 'react-fade-in';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const Cart = () => {
    const styles = useStylesCart();
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartReducer.productsInCart);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        dispatch(getProductsInCart(1)); // userId hard-coded
    }, []);

    useEffect(() => {
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
                        { products?.map(product => <CartItem key={product.id} product={product} />) }
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

    const emptyCart = () => {
        return (
            <FadeIn transitionDuration={1000} >
                <Container className={styles.emptyCartContainer} >
                    <Typography>Your shopping cart is empty</Typography>
                        <Button className={styles.buttonToCatalog} href='/products' >
                            Catalog
                        </Button>
                </Container>
            </FadeIn>
        );
    };

    return loading ? <CircularProgress disableShrink className={styles.isLoading} /> : Array.isArray(products) && products.length > 0 ? cart() : emptyCart();
};

export default Cart;
