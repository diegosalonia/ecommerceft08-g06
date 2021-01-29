import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, showLoader, hideLoader } from '../../redux/productReducer/actions';
import image from '../../resources/growing-tree-svg-animation-recut.gif';
import axios from 'axios';

import { Button, Container, Typography, CircularProgress, Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';

function Product(props) {
    const dispatch = useDispatch();
    const { match: { params: { id }}} = props;
    const isLoading = useSelector(state => state.productReducer.isLoading);
    const product = useSelector(state => state.productReducer.product);
    const styles = useStylesProduct();
    const [ quantity, setQuantity ] = useState(null);
    

    useEffect(() => {
        dispatch(showLoader());
        dispatch(getProduct(id));
    }, []);

    useEffect(() => {
        dispatch(hideLoader());
        console.log("PRODUCT: ",product);
        console.log("QUANTITY: ", quantity);
        // setQuantity(product.orders[0].order_line.quantity);
    }, [product]);

    const handleAddToCart = () => {

    }

    // const handleIncreaseQuantity = () => {

    // }
    
    // const handleDecreaseQuantity = () => {

    // }

    const productLoaded = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <img src={ product.image } alt={ product.name } className={styles.image} ></img>
                    <Container className={styles.detailContainer} >
                        <Typography variant='h6' align='center' >{ product.name }</Typography>
                        <Container className={styles.categories} >
                            { product.categories?.slice(0, 3).map(category => <Typography key={category.id} className={styles.category} >{category.name}</Typography>) }
                        </Container>
                        { product.discount !== 0 ? 
                                        <Container className={styles.price} >
                                            <Typography className={styles.lineThrough}>${ product.price }</Typography>
                                            <Typography className={styles.actualPrice} >{ `$${ product.price - ((product.discount / 100) * product.price)}` }</Typography>
                                        </Container> 
                                        :<Typography>${ product.price }</Typography>
                        }
                        <Container className={styles.rating} >
                            <Rating
                                name="product-rating"
                                defaultValue={3}
                                disabled
                            />
                            <Typography className={styles.ratingReviews} >(0) Reviews</Typography>
                        </Container>
                        {/* <Typography>
                            <Button>-</Button>
                            <Typography>{ quantityInCart }</Typography>
                            <Button >+</Button>
                        </Typography> */}
                        <Typography className={styles.stock} >Stock: { product.stock }</Typography>
                        <Button className={styles.addToCart} onClick={() => handleAddToCart()} ><ShoppingCartIcon /><Typography className={styles.textCart} >ADD TO CART</Typography></Button>
                    </Container>
                </Container>
                <Container className={styles.description} >
                    <Typography variant='h4' >Description</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
                </Container>
            </Container>
        );
    };
    
    return isLoading ? <CircularProgress disableShrink className={styles.isLoading} /> : productLoaded();
};

export default Product;

/* TODO:
    - Rating Stars
    - Default image
*/