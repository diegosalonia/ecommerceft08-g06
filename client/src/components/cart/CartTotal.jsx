import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import { useStylesCartTotal } from './styles';
import { goToCheckout } from '../../redux/cartReducer/actions';
import LoginModal from '../login/LoginModal';

const CartTotal = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartReducer.productsInCart);
    const styles = useStylesCartTotal();
    const [ total, setTotal ] = useState();
    const tax = total * (21 / 100);
    const userId = JSON.parse(localStorage.getItem('id'));
    const shippingAddress = useSelector(state => state.loginReducer.shipping_address);

    useEffect(() => {
        userId && setTotal(products.reduce(
            (acc, el) => acc += (el.price - (el.price * (el.discount / 100))) * el.order_line.quantity,0
        ));
        !userId && setTotal(products.reduce(
            (acc, el) => acc += (el.price - (el.price * (el.discount / 100))) * el.quantity,0
        ));
    }, [products]);

    const handleCheckout = () => {
        dispatch(goToCheckout(1, products));
    };

    return (
        <Container className={styles.bigContainer} >
            <Container className={styles.container} >
                <Container className={styles.containerSubtotal} >
                    <Typography>Subtotal</Typography>
                    <Typography>{`$${total}`}</Typography>
                </Container>
                <Container className={styles.containerShipping} >
                    <Typography>Shipping</Typography>
                    <Typography>-</Typography>
                </Container>
                <Container className={styles.containerTax} >
                    <Typography>Tax(IVA)</Typography>
                    <Typography>{`$${tax.toFixed(2)}`}</Typography>
                </Container>
                <hr />
                <Container className={styles.containerTotal} >
                    <Typography>Total</Typography>
                    <Typography>{`$${(total + tax).toFixed(2)}`}</Typography>
                </Container>
            </Container>
            <Container className={styles.checkoutButton} >
                {userId ? <Button onClick={handleCheckout} >
                              GO TO CHECKOUT
                          </Button>
                        : <LoginModal inCart={true}/>
                }
            </Container>
        </Container>
    );
};

export default CartTotal;
