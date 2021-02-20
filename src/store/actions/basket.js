import store from '../';
import { ACTION } from '../actionTypes';

export function addProductToBasket(product) {
  store.dispatch({
    type: ACTION.ADD_PRODUCT_TO_BASKET,
    product
  });
}

export function removeProductFromBasket(product) {
  store.dispatch({
    type: ACTION.REMOVE_PRODUCT_FROM_BASKET,
    product
  });
}
