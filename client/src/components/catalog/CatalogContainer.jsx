import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts, updatePage} from '../../redux/CatalogReducer/actions';
import {useLocation} from 'react-router-dom';

const CatalogContainer = () => {
    const dispatch = useDispatch();
    //Products
    const [productsRender, setProductsRender] = useState();
    const productList = useSelector(state => state.catalogReducer.products);
    const firstRender = useRef(true);
    //Pagination
    const page = useSelector(state => state.catalogReducer.page);
    const pageSize = 5; //Products by page limit.
    //Filters
    const storeFilterBox = useSelector(state => state.catalogReducer.filterBox);
    const [filterBox, setFilterBox] = useState({categories: [], price: {priceFrom: 0, priceTo: 100000}});  
    //Url Query
    const useQuery  = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    useEffect(() => {
        if(firstRender.current){
            console.log("query: ", query.get("catId"), storeFilterBox)
            if (query.get("catId")){
                dispatch(getPaginatedProducts(page, 100, {...storeFilterBox, categories: [query.get("catId")]}));    
            }
            else{
                dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));    
            }  
        }
        else{
            dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));    
        }  
        dispatch(updatePage(page));
    }, [storeFilterBox, page, pageSize, dispatch, query]);

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false;
        }
        else{
            setProductsRender(productList);
            if (productList.products.length === 0){
                dispatch(updatePage(1))
            }
        }
    }, [productList, dispatch])

    return(
        <Catalog products={productsRender} filterBox={filterBox} setFilterBox={setFilterBox}  />
    )

}
export default CatalogContainer;
