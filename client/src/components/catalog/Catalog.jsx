import React from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';
import ProductCard from '../product/ProductCard';
import Pagination from  './Pagination'
const Catalog = (props) => {

    var renderProducts = () => <></>;
    if(props.products){
        renderProducts = () => props.products.products.map((item, index) => {
            return (<Grid item xs={12} sm={6} md={4} lg={3} key={item.id} >
                    <ProductCard productProps={item} key={index} />
                </Grid>)    
            });
    }
    else{
        console.log("NO PRODUCTS: ", props.products);
    }

   

    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={3}>
                    <FilterCatalog /* updateFilter={updateFilter} *//>
                </Grid>
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    {renderProducts()}    
                </Grid>
                <Pagination setpage={props.setpage}/>
            </Grid>
        </Container>
    )
}

export default Catalog;