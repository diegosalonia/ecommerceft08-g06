import React from 'react';
import logo from './logo.svg';
import CategoryForm from './components/category/CategoryForm';
import ProductForm from './components/product/ProductForm';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ProductForm />
      <CategoryForm />
    </Provider>
  );
};

export default App;
