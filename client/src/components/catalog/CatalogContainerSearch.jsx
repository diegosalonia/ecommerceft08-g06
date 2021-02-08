import React, { useEffect } from 'react';
import CatalogFilterByKeyword from './CatalogFilterByKeyword';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

export default function CatalogContainerSearch (props){
    const search = useSelector(state => state.searchBarReducer.products)
    const keyword = useSelector(state => state.searchBarReducer.keyword)

    useEffect(() => {
    }, [search])

    if(!keyword){
        return (
            <Typography variant="h5">No se ha detectado ningun filtro para buscar por favor digite algo</Typography>
            )
    }
    if(!search.length){
        return(
            <Typography variant="h5">No se ha encontrado ningun producto con "{keyword}"</Typography>
        )
    }
    return (
        <CatalogFilterByKeyword testlist={search}/>
    )
}

