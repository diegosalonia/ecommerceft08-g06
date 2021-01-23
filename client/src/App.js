import React from 'react';
import './App.css';
import Routes from './routes/routes.js'
import { BrowserRouter } from 'react-router-dom'
import CssBaseLine from '@material-ui/core/CssBaseline';

import Routes from './routes/routes.js'

function App() {
  return (
    <BrowserRouter>
      <CssBaseLine />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
