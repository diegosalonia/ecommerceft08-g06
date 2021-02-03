import React from 'react';
import './App.css';
import Routes from './routes/Routes'
import { BrowserRouter } from 'react-router-dom'
import CssBaseLine from '@material-ui/core/CssBaseline';

function App() {
  return (
    <BrowserRouter>
      <CssBaseLine />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
