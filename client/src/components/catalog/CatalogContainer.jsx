import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { getProductsCatalog } from '../product/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatedProducts } from '../../redux/CatalogReducer/actions'

const defaultRender = {
    categories: [1,2,3],
    createdAt: "2021-01-27T23:22:06.742Z",
    description: "El sustrato GrowMix",
    discount: 0,
    featured: false,
    id: 1,
    image: "https://firebasestorage.googleapis.com/v0/b/un-jardin-especial.appspot.com/o/products%2Fimages%2FGrow%20Mix%20multiPro%2080%20L%20TERRAFERTIL%2Fsustrato.PNG?alt=media&token=c3c9e401-38a7-4980-bd06-d35273ed31f7",
    name: "Grow Mix multiPro 80 L TERRAFERTIL",
    price: "1600",
    rating: null,
    stock: 10,
    updatedAt: "2021-01-27T23:22:06.742Z"
}

const CatalogContainer = () => {
   
    const [productsRender, setProductsRender] = useState([defaultRender]);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const productList = useSelector(state => state.catalogReducer.products);
    const firstRender = useRef(true);
    const pageSize = 2; //Products by page limit. 
    
    useEffect(() => {
        console.log("PAGE: ", page)
        dispatch(getPaginatedProducts(page, pageSize));
    }, [page])

    useEffect(() => {
        console.log("Product list: ", productList)
        if(firstRender.current){
            firstRender.current = false;
        }
        else{
            var productListWithId = productList.map(product => {
                const onlyCatIds = product.categories.map(category => category.id);
                return {...product, categories: onlyCatIds}
            });
            setProductsRender(productListWithId);
        }
        
    }, [productList])

    return(
        <Catalog testlist={productsRender} setpage={setPage}/>
    )

}
export default CatalogContainer;
