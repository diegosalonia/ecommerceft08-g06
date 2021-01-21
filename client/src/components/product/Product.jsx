import React from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core';
import {useStylesProduct} from './styles';

function Product({ description, discount, featured, 
                   image, name, price, rating, stock, 
                   categories, quantityInCart }) {
    const style = useStylesProduct();
    return (
        <Container>
            <Grid container >
                <Grid item lg={1} />
                <Grid item lg={6} >
                    <img src={ image } alt={ name }></img>
                </Grid>
                <Grid item lg={1} />
                <Grid item lg={3} className={style.productDescription} >
                    <h2>{ name }</h2>
                    { categories.slice(0, 3).map(category => <span key={category} >{category}</span>) }
                    { discount !== 0 ? 
                                    <span> <span className={"lineThrough"}>${ price }</span>
                                        ${ price - (discount * price) }
                                    </span> 
                                    : <span>{ price }</span>
                    }
                    <span>{ rating }</span>
                    <span>{ description }</span>
                    <span>
                        <button>-</button>
                        <span>{ quantityInCart }</span>
                        <button>+</button>
                    </span>
                    <span>{ stock }</span>
                    <button>ADD TO CART</button>
                </Grid>
                <Grid item lg={1} />
            </Grid>
        </Container>
    );
};

export default Product

/* TODO:
    - Rating Stars
    - Default image
*/