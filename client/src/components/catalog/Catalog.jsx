import React, {useState, useEffect} from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';
import ProductCard from '../product/ProductCard'
import testList from './testList'; //Simulate products array.


const Catalog = (props) => {

    const [filter, setFilter] = useState(false)

    const updateFilter = (catId) => {
        setFilter(catId)
    }

    useEffect(() => {
        if(filter){
            console.log("Yeaaaaa now rendring from parent: ", filter)
        }
    }, [filter])

    const renderProducts = () => testList.map((item, inx) => {
        if (item.categories.includes(filter)){
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <ProductCard productProps={item} key={inx} />
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