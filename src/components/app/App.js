import './App.css';

import React from 'react';
import ProductList from "../product-list";
import Basket from "../basket";

function App() {
  return (
    <div className="layout-column align-items-center shop-component">
      <ProductList />
      <Basket />
    </div>
  );
}

export default App;
