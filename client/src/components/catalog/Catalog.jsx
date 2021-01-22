import React, {useState, useEffect} from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';

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
            <Grid>
                <FilterCatalog updateFilter={updateFilter}/>
            </Grid>
        </Container>
    )
}

export default Catalog;