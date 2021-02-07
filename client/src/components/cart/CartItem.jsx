import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Container, Link, TextField, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { useStylesCartItem } from './styles';
import { changeProductQuantity, deleteProductInCart } from '../../redux/cartReducer/actions';

const CartItem = ({ product }) => {
    const dispatch = useDispatch();
    const styles = useStylesCartItem();
    const [ quantity, setQuantity ] = useState();
    const { id, name, price, discount, image, stock, order_line } = product;

    useEffect(() => {
        setQuantity(order_line.quantity);
    }, []);

    const handleOnChangeQuantity = e => {
        if (quantity >= 1 && quantity <= stock && e.target.value >= 1 && e.target.value <= stock) {
            dispatch(changeProductQuantity(1, {id, quantity: e.target.value})); // userId hard-coded
            setQuantity(e.target.value);
        }
    };

    const handleDelete = () => {
        dispatch(deleteProductInCart(1, id)); // userId hard-coded
    }

    return (
        <Container className={styles.container} >
            <Container className={styles.imageContainer} >
                <img src={image[0]} alt={name} className={styles.image} />
            </Container>
            <Container className={styles.nameContainer} >
                <Link to={`/products/${id}`} >{name}</Link>
                <Typography>${price - (price * (discount / 100))}</Typography>
            </Container>
            <Container className={styles.quantity} >
                <TextField
                    type='number'
                    min={1}
                    max={stock}
                    defaultValue={quantity}
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
