import React, { useState, useEffect } from 'react';
import { Container, Link, Typography } from '@material-ui/core';
import { useStylesCartItem } from './styles';

const CartItem = ({ product }) => {
    const styles = useStylesCartItem();
    const [ quantity, setQuantity ] = useState();
    const { id, name, price, discount, image, stock, order_line } = product;

    useEffect(() => {
        setQuantity(order_line.quantity);
    }, []);

    return (
        <Container className={styles.container} >
            <Container className={styles.imageContainer} >
                <img src={image[0]} alt={name} className={styles.image} />
            </Container>
            <Container className={styles.nameContainer} >
                <Link to={`/products/${id}`} >{name}</Link>
                <Typography>${price}</Typography>
            </Container>
        </Container>
    );
};

export default CartItem;
