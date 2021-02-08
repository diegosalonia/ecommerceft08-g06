import React from 'react';
import {Container, Grid} from '@material-ui/core';
import ProductCard from '../product/ProductCard';
// import Pagination from './Pagination'
const CatalogFilterByKeyword = (props) => {

    const renderProducts = () => props.testlist.map((item, index) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} >
                    <ProductCard productProps={item} key={index} />
                </Grid>
            )    
    });

    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    {renderProducts()}             
                </Grid>
                {/* <Pagination setpage={props.setPage}/>  */}
           </Grid>
        </Container>
    )
}

export default CatalogFilterByKeyword;
