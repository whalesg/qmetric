import _ from 'lodash'

import { ACTION } from '../actionTypes'
import initialState from '../states/basket'

export default function basket(state = initialState, action) {
  let products, productId, index;

  switch (action.type) {
    case ACTION.ADD_PRODUCT_TO_BASKET:
      products = [...state.products, action.product];
      products = _.sortBy(products, p => p.name);
      return { ...state, products };

    case ACTION.REMOVE_PRODUCT_FROM_BASKET:
      products = [...state.products];
      productId = action.product.id;
      index = _.findIndex(products, p => p.id === productId);
      if (index !== -1) {
        products.splice(index, 1)
      }
      return { ...state, products };
      
    default:
      return state;
  }
}
