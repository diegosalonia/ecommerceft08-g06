import React from 'react';
import { Card, CardContent, CardActionArea, CardActions, CardMedia, IconButton, Typography, } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import { useStylesProductCard } from './styles';
import { Link } from 'react-router-dom';
import {ProductPrice} from './ProductPrice';

function ProductCard(props) {
             
    const style = useStylesProductCard();
    const {id, name, description, image, discount, price, stock} = props.productProps;
    let exists = ""
    let buttonDisable = false
    let stockStyle = style.hasStock
    if (!stock) {
      buttonDisable = true
      stockStyle = style.outOfStock
      exists = <Typography>Out Of Stock</Typography>
    }
                 
    return (
        <Card className={style.root} component="main" >
            <Link to={{pathname: `/products/${id}`, state: props.productProps}} className={style.noLinkStyle} color="inherit" variant="inherit">
            <CardContent className={ stockStyle } >
            </CardContent>
            <CardActionArea>
              <CardMedia className={style.media} image={image} />
              <CardContent className={style.info}>
                  <Typography gutterBottom className={style.rigthText}>
                    {name}
                  </Typography>
                  <ProductPrice price={price} discount={discount}/>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {description.slice(0, 30)}
                  </Typography>
              </CardContent>
            </CardActionArea>
            </Link> 
            <CardActions>
              <IconButton size="small" className={style.button} color="primary" onClick={() => { alert('clicked') }} disabled={buttonDisable}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton size="small" color="primary">
                <Link to={{pathname: `/products/${id}`, state: props.productProps}} >
                  <InfoIcon />
                </Link>
              </IconButton>
              {exists}
            </CardActions>
        </Card>
    );
};

export default ProductCard
