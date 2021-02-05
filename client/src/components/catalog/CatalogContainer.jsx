import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts, updatePage} from '../../redux/CatalogReducer/actions'

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

    useEffect(() => {
        dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));    
        dispatch(updatePage(page));
    }, [storeFilterBox, page, pageSize, dispatch])//UP TO STORE, CURRENT: LOCAL

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
