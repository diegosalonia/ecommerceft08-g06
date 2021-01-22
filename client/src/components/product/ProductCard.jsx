import React from 'react';
import { Card, CardContent, CardActionArea, CardActions, CardMedia, CssBaseline, IconButton, Typography, } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';
import { useStylesProductCard } from './styles';
import { Link } from 'react-router-dom'

function ProductCard({ productId, discount, featured, image, 
                   name, price, stock, description}) {
             
    const style = useStylesProductCard();
                 
    return (
        
        <Card className={style.root} component="main" maxWidth="xs">
            <Link to={`/products/${productId}`} >
            <CssBaseline />
            <CardActionArea>
        <CardMedia
          className={style.media}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={style.rigthText}>
            {name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className={style.rigthText} >
                { discount !== 0 ? // ToDo sacar esto afuera. Y usarlo en todos los lugares donde lo necesitemos.
                             <span > <span className={style.lineThrough}>$ { price } </span>
                                <span >$ {  price - ((discount / 100) * price) }</span>
                             </span> 
                             : <span >${ price }</span>
                }
          </Typography>
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