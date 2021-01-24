import React from 'react';
import { Card, CardContent, CardActionArea, CardActions, CardMedia, IconButton, Typography, } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import { useStylesProductCard } from './styles';
import { Link } from 'react-router-dom';
import {ProductPrice} from './ProductPrice';

function ProductCard(props) {
             
    const style = useStylesProductCard();
    const {productId, name, stock, description, image, featured, discount, categories, price} = props.productProps;
                 
    return (
        <Card className={style.root} component="main" disabled={true}>
            <Link to={`/products/${productId}`} className={style.noLinkStyle} color="inherit" variant="inherit">
            <CardActionArea>
              <CardMedia className={style.media} image={image[0]} />
              <CardContent className={style.info}>
                  <Typography gutterBottom variant="h5" component="h2" className={style.rigthText}>
                    {name}
                  </Typography>
                  <ProductPrice price={price} discount={discount}/>
                  <Typography   variant="body2" color="textSecondary" component="p">
                    {description}
                  </Typography>
              </CardContent>
            </CardActionArea>
            </Link> 
            <CardActions>
              <IconButton size="small" className={style.button} color="primary" onClick={() => { alert('clicked') }}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <Link to={`/products/${productId}`} >
                  <InfoIcon />
                </Link>
              </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard
