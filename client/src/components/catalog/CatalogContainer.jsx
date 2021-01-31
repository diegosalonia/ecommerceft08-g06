import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts} from '../../redux/CatalogReducer/actions'

const CatalogContainer = () => {
    //ToDo update PAGE in Pagination (not only in store), selectedButtons, NoCategory empty products, price filter.
    const [productsRender, setProductsRender] = useState();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.catalogReducer.products);
    const storeFilterBox = useSelector(state => state.catalogReducer.filterBox)
    const firstRender = useRef(true);
    //Pagination
    const [page, setPage] = useState(1);
    const pageSize = 2; //Products by page limit.
    //Filters
    const [filterBox, setFilterBox] = useState({categories: [], price: {priceFrom: 0, priceTo: 100000}});  

    useEffect(() => {
        console.log("STORE FILTER BOX: ",storeFilterBox)

            dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));    
    
        setPage(1); 
    }, [storeFilterBox])//UP TO STORE, CURRENT: LOCAL

    
    useEffect(() => {
        dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));
    }, [page])

    useEffect(() => {
        console.log("Product list: ", productList)
        if(firstRender.current){
            firstRender.current = false;
        }
        else{
            setProductsRender(productList);
        }
        
    }, [productList])

    return(
        <Catalog products={productsRender} setpage={setPage} filterBox={filterBox} setFilterBox={setFilterBox}  />
    )

}
export default CatalogContainer;
