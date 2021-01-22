import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store';
import Routes from './routes/routes.js'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
