import React, {useEffect, useState} from 'react';
import Catalog from './Catalog';
import testList from './testList'; //Simulate products array.
import {getProducts, getProductCategories} from '../product/utils';

const CatalogContainer = () => {

    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        getProducts.then(products => {
            setProductList(products.data)
        })
        .catch(err => {console.log("Fail get products, ", err)});
    }, [])

    useEffect(() => {
        console.log("Product list: ", productList.length)
    }, [productList])

    
    return(
        <Catalog testlist={productList}/>
    )
}

export default CatalogContainer;
