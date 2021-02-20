import './App.css';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import ProductList from "../product-list";
import Basket from "../basket";

function App() {
  return (
    <Provider store={store}>
      <div className="layout-column align-items-center shop-component">
        <ProductList />
        <Basket />
      </div>
    </Provider>
  );
}

export default App;
