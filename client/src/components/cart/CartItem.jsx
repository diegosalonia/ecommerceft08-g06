import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Container, TextField, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { useStylesCartItem } from './styles';
import { changeProductQuantity, deleteProductInCart } from '../../redux/cartReducer/actions';
import Swal from 'sweetalert2';

const CartItem = ({ product }) => {
    const dispatch = useDispatch();
    const styles = useStylesCartItem();
    const [ quantity, setQuantity ] = useState();
    const { id, name, price, discount, image, stock } = product;
    const userId = JSON.parse(sessionStorage.getItem('id'));

    useEffect(() => {
        userId && setQuantity(product.order_line.quantity);
        !userId && setQuantity(product.quantity);
    }, [product.order_line?.quantity, product.quantity, userId]);

    const handleOnChangeQuantity = e => {
        if (quantity >= 1 && quantity <= stock && e.target.value >= 1 && e.target.value <= stock) {
            dispatch(changeProductQuantity(userId, {id, quantity: e.target.value}));
            setQuantity(e.target.value);
        }
    };

    const handleDelete = () => {
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
                dispatch(deleteProductInCart(userId, id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your product won't be deleted`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    return (
        <Container className={styles.container} >
            <Container className={styles.imageContainer} >
                <img src={image[0]} alt={name} className={styles.image} />
            </Container>
            <Container className={styles.nameContainer} >
                <Link className={styles.link} to={`/products/${id}`} >{name.length > 20 ? `${name.slice(0, 20)}...` : name}</Link>
                <Typography>${price - (price * (discount / 100))}</Typography>
            </Container>
            <Container className={styles.quantity} >
                <TextField
                    type='number'
                    min={1}
                    max={stock}
                    value={quantity}
                    onChange={handleOnChangeQuantity}
                />
            </Container>
            <Container className={styles.total} >
                <Typography>{`Total: $${(price - (price * (discount / 100))) * quantity}`}</Typography>
            </Container>
            <Container className={styles.buttonContainer} >
                <IconButton className={styles.button} onClick={handleDelete} >
                    <DeleteForever />
                </IconButton>
            </Container>
        </Container>
    );
};

export default CartItem;
