import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts, updatePage} from '../../redux/CatalogReducer/actions'

const CatalogContainer = () => {
    const dispatch = useDispatch();
    //ToDo update PAGE in Pagination (not only in store), selectedButtons, NoCategory empty products, price filter.
    //Products
    const [productsRender, setProductsRender] = useState();
    const productList = useSelector(state => state.catalogReducer.products);
    const firstRender = useRef(true);
    //Pagination
    const page = useSelector(state => state.catalogReducer.page);
    const pageSize = 1; //Products by page limit.
    //Filters
    const storeFilterBox = useSelector(state => state.catalogReducer.filterBox);
    const [filterBox, setFilterBox] = useState({categories: [], price: {priceFrom: 0, priceTo: 100000}});  

    useEffect(() => {
        console.log("STORE FILTER BOX: ",storeFilterBox)
        dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));    
        dispatch(updatePage(page));
    }, [storeFilterBox, page])//UP TO STORE, CURRENT: LOCAL

    
  /*   useEffect(() => {
        dispatch(getPaginatedProducts(page, pageSize, storeFilterBox));
    }, [page])
 */
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
        <Catalog products={productsRender} /* setpage={setPage} */ filterBox={filterBox} setFilterBox={setFilterBox}  />
    )

}
export default CatalogContainer;
