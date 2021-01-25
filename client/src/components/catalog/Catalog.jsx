import React, { useState } from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';
import ProductCard from '../product/ProductCard';


const Catalog = (props) => {

    const [filter, setFilter] = useState(false)

    const updateFilter = (catId) => {
        setFilter(catId)
    }
/* ToDo Tiene que renderizar todos los productos, y luego filtrar por categoría */
    const renderProducts = () => props.testlist.map((item, index) => {
        if (item.categories && item.categories.includes(filter)){
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} >
                    <ProductCard productProps={item} key={index} />
                </Grid>   
            ) 
        }
    });

    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={3}>
                    <FilterCatalog updateFilter={updateFilter}/>
                </Grid>
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    {renderProducts()}              
                </Grid>
            </Grid>
        </Container>
    )
}

export default Catalog;