import React, {useEffect, useState} from 'react';
import Catalog from './Catalog';
import testList from './testList'; //Simulate products array.
import {getProducts, getProductCategories} from '../product/utils';

const CatalogContainer = () => {

    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        getProducts.then(products => {
                const productListWithId = products.data.map(product => {
                    const onlyCatIds = product.categories.map(category => category.id);
                    return {...product, categories: onlyCatIds}
                });
                setProductList(productListWithId)
        })
        .catch(err => {console.log("Fail get products, ", err)});
    }, [])

    useEffect(() => {
       console.log("EL 25 PAPA: ", productList)
    }, [productList])

    
    return(
        <Catalog testlist={productList}/>
    )
}

export default CatalogContainer;
