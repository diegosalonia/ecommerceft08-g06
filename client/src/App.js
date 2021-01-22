import React from 'react';
import CategoryForm from './components/category/CategoryForm'
import './App.css';
import Product from './components/product/Product';
import Catalog from './components/catalog/Catalog'

const obj = {
  description: "lalallla", 
  discount: 0, 
  featured: true, 
  image: '', 
  name: 'Tijera', 
  price: 59, 
  rating: 5, 
  stock: 15, 
  categories: ['Cortacorta', 'Pinchapincha'], 
  quantityInCart: 1,
}

function App() {
  return (
    <div className="App">
      <CategoryForm />
      <Product description={obj.description}
               discount={obj.discount} 
               featured={obj.featured}
               image={obj.image}
               name={obj.name}
               price={obj.price}
               rating={obj.rating}
               stock={obj.stock}
               categories={obj.categories}
               quantityInCart={obj.quantityInCart}
               />
        <Catalog />
    </div>
  );
}

export default App;
