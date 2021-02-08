import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress, Button } from '@material-ui/core';
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
    const userId = JSON.parse(sessionStorage.getItem('id'));

    useEffect(() => {
        userId && dispatch(getProductsInCart(userId));
    }, [dispatch, userId]);

    useEffect(() => {
       setTimeout(() => setLoading(false), 1000);
    }, [products]);

    const handleDeleteCart = () => dispatch(deleteAllCart(userId));

    const cart = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <Container className={styles.cartItemsContainer} >
                        { products?.map(product => <CartItem key={product.id} product={product} />) }
                    </Container>
                    <Container className={styles.totalContainer} >
                        <CartTotal products={products} />
                    </Container>
                </Container>
                <Container className={styles.deleteAllCart} >
                    <Button onClick={handleDeleteCart} className={styles.deleteAllCartButton} >
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
