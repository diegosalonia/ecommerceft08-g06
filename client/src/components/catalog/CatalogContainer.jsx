import React, {useEffect, useState} from 'react';
import Catalog from './Catalog';
import { getProducts } from '../product/utils';

const CatalogContainer = ({products, setSearch}) => {

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
        console.log("Product list: ", productList)
    }, [productList])

    
    return(
        <Catalog testlist={productList} products={products} setSearch={setSearch}/>
    )
}

export default CatalogContainer;
