import React, {useState, useEffect} from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';
import ProductCard from '../product/ProductCard'

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

    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={3}>
                    <FilterCatalog updateFilter={updateFilter}/>
                </Grid>
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <ProductCard productId={1} name="Vamp guano" discount={0} image="https://tabugrowshop.com.ar/wp-content/uploads/2018/06/VAMP-Guano-de-murcielago-Flora-1-10047.jpg" price={680}/>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Container>
    )
}

export default Catalog;