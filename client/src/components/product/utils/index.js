import axios from 'axios';

export const getProductsCatalog = axios.get('http://localhost:3000/products/catalog/?page=4&pageSize=1');

export const getProducts = axios.get('http://localhost:3000/products');
export const getProduct = id => axios.get(`http://localhost:3000/products/${id}`);
//export const getProductCategories = productId => {axios.get(`http://localhost:3000/products/${id}`)}
