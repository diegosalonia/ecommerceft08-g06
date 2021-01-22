import React from 'react';
import logo from './logo.svg';
import CategoryForm from './components/category/CategoryForm'
import './App.css';
import Product from './components/product/Product';
import Routes from './routes/routes.js'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
