import React, { useEffect, useState } from 'react';
import CatalogFilterByKeyword from './CatalogFilterByKeyword';
import { useSelector, useDispatch } from 'react-redux';
import { getPaginatedProducts } from '../../redux/CatalogReducer/actions'
import { Typography } from '@material-ui/core';

export default function CatalogContainerSearch (props){
    // const [page, setPage] = useState(1);
    // const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const search = useSelector(state => state.searchBarReducer.products)
    const keyword = useSelector(state => state.searchBarReducer.keyword)

    // const pageSize = 2; //Products by page limit. 

    useEffect(() => {
        setProducts(search)
        console.log(products)
    })

    // useEffect(() => {
    //     console.log("PAGE: ", page)
    //     dispatch(getPaginatedProducts(page, pageSize));
    // }, [page])
    // setPage={setPage}
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

