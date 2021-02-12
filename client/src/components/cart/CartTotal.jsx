import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, Modal, Backdrop, Fade, TextField } from '@material-ui/core';
import { useStylesCartTotal } from './styles';
import { goToCheckout } from '../../redux/cartReducer/actions';
import { addNewAddress } from '../../redux/loginReducer/actions';
import LoginModal from '../login/LoginModal';

const CartTotal = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cartReducer.productsInCart);
    const styles = useStylesCartTotal();
    const [ total, setTotal ] = useState();
    const userId = JSON.parse(sessionStorage.getItem('id'));
    const shippingAddress = useSelector(state => state.loginReducer.shipping_address);
    const [ open, setOpen ] = useState(false);
    const [ newAddress, setNewAddress ] = useState('');
    const [ noAddress, setNoAddress ] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
 
    useEffect(() => {
        !shippingAddress && setNoAddress(true);
    }, [shippingAddress]);

    useEffect(() => {
        userId && setTotal(products.reduce(
            (acc, el) => acc += (el.price - (el.price * (el.discount / 100))) * el.order_line.quantity,0
        ));
        !userId && setTotal(products.reduce(
            (acc, el) => acc += (el.price - (el.price * (el.discount / 100))) * el.quantity,0
        ));
    }, [products, userId]);

    const handleCheckout = () => dispatch(goToCheckout(userId, products));

    const handleNewAddress = () => {
        dispatch(addNewAddress(userId, newAddress));
        setNoAddress(false);
    }

    const handleNewAddressValue = e => setNewAddress(e.target.value);

    const addShippingAddress = () => {
        return (
            <Container className={styles.containerModal} >
                <Button onClick={handleOpen} className={styles.buttonConfirmAddress} >Ingresar dirección de envío</Button>
                <Modal
                    className={styles.modalContainer}  
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    disableAutoFocus
                    disableEnforceFocus
                    BackdropComponent={Backdrop}
                    BackdropProps={{timeout: 2000,}}
                >
                    <Fade in={open} className={styles.fadeComponent} >
                        <Container>
                            <TextField  
                                name='address'
                                label='Address'
                                value={newAddress}
                                onChange={handleNewAddressValue}
                            />
                            <Button onClick={handleNewAddress} className={styles.buttonConfirmAddress} >Add shipping address</Button>
                        </Container>
                    </Fade>
                </Modal>
            </Container>
        )
    }

    return (
        <Container className={styles.bigContainer} >
            <Container className={styles.container} >
                <Container className={styles.containerSubtotal} >
                    <Typography>Subtotal</Typography>
                    <Typography>{`$${total}`}</Typography>
                </Container>
                <Container className={styles.containerShipping} >
                    <Typography>Envío</Typography>
                    <Typography>-</Typography>
                </Container>
                <hr />
                <Container className={styles.containerTotal} >
                    <Typography>Total</Typography>
                    <Typography>{`$${total?.toFixed(2)}`}</Typography>
                </Container>
            </Container>
            <Container className={styles.checkoutButton} >
                {
                    userId && noAddress ? addShippingAddress()
                    : userId ? <Button onClick={handleCheckout} >
                                    Pagar
                               </Button>
                    : <LoginModal inCart={true} />
                }
            </Container>
        </Container>
    );
};

export default CartTotal;
