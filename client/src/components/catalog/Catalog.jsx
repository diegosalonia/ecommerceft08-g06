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
    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={3}>
                    <FilterCatalog filterBox={props.filterBox} setFilterBox={props.setFilterBox}/>
                </Grid>
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    {props.products?.length ? renderProducts() : <div>No hay productos!</div>}
                </Grid>
                <Pagination />
            </Grid>
        </Container>
    )
}
export default Catalog;
