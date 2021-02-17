import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress, Button } from '@material-ui/core';
import { getProductsInCart, deleteAllCart } from '../../redux/cartReducer/actions';
import { useStylesCart } from './styles';
import  FadeIn  from 'react-fade-in';
import Swal from 'sweetalert2';
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

    const handleDeleteCart = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: styles.confirmButton,
              cancelButton: styles.cancelButton
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YES, DELETE IT!',
            cancelButtonText: 'NO, CANCEL!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your product has been deleted from cart',
                'success'
                );
                dispatch(deleteAllCart(userId));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your product won't be deleted`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    }

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
                        Vaciar carrito
                    </Button>
                </Container>
            </Container>
        );
    }

    const emptyCart = () => {
        return (
            <FadeIn transitionDuration={1000} >
                <Container className={styles.emptyCartContainer} >
                    <Typography>Tu carrito está vacío</Typography>
                        <Button className={styles.buttonToCatalog} href='/products' >
                            Catálogo
                        </Button>
                </Container>
            </FadeIn>
        );
    };

    return loading ? <CircularProgress disableShrink className={styles.isLoading} /> : Array.isArray(products) && products.length > 0 ? cart() : emptyCart();
};

export default Cart;
