import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts } from '../../redux/CatalogReducer/actions'

const CatalogContainer = () => {
   
    const [productsRender, setProductsRender] = useState();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.catalogReducer.products);
    const firstRender = useRef(true);
    //Pagination
    const [page, setPage] = useState(1);
    const pageSize = 1; //Products by page limit.
    //Filters
    const [filterBox, setFilterBox] = useState({categories: [1,2,3,4,5], price: {priceFrom: 0, priceTo: 100000}});  

    useEffect(() => {
        console.log("filterBox: ", filterBox)
        setPage(1); 
    }, [filterBox])

    
    useEffect(() => {
        dispatch(getPaginatedProducts(page, pageSize, filterBox));
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
