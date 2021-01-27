import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/productReducer/actions';
import image from '../../resources/growing-tree-svg-animation-recut.gif';

import { Button, Container, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';

function Product(props) {
    const dispatch = useDispatch();
    const { match: { params: { id }}} = props;
    const [product, setProduct] = useState(useSelector(state => state.productReducer.product));
    const styles = useStylesProduct();
    

    useEffect(() => {
        dispatch(getProduct(id));
    }, []);

    useEffect(() => {
        console.log("asdasd: ", product);
    }, [product]);
    // console.log("USESELECTOR: ", name);

    const productLoaded = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <img src={ product.image } alt={ product.name } className={styles.image} ></img>
                    <Container className={styles.detailContainer} >
                        <Typography variant='h6' align='center' >{ product.name }</Typography>
                        <Container className={styles.categories} >
                            { product.categories?.slice(0, 4).map(category => <Typography key={category} >{category}</Typography>) }
                        </Container>
                        { product.discount !== 0 ? 
                                        <Container className={styles.price} >
                                            <Typography className={styles.lineThrough}>${ product.price }</Typography>
                                            <Typography variant='h5' >{ `\xa0\xa0\xa0 $${ product.price - ((product.discount / 100) * product.price)}` }</Typography>
                                        </Container> 
                                        :<Typography>${ product.price }</Typography>
                        }
                        <Typography>{ product.rating }</Typography>
                        {/* <Typography>
                            <Button>-</Button>
                            <Typography>{ quantityInCart }</Typography>
                            <Button >+</Button>
                        </Typography> */}
                        <Typography className={styles.stock} >In Stock: { product.stock }</Typography>
                        <Button className={styles.addToCart} ><ShoppingCartIcon /><Typography className={styles.textCart} >ADD TO CART</Typography></Button>
                    </Container>
                </Container>
                <Container className={styles.description} >
                    <Typography variant='h4' >Description</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
                </Container>
            </Container>
        )
    }
    
    return product ? productLoaded : <img src={ image } alt="loading..." ></img>
};

export default Product

/* TODO:
    - Rating Stars
    - Default image
*/