import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const IDMAPS = {
  PRODUCT_ITEMS: ['product-item-1', 'product-item-2', 'product-item-3'],
  BASKET_ITEMS: ['basket-item-1', 'basket-item-2', 'basket-item-3'],
  ADD_TO_BASKET_BTN: 'btn-item-add',
  REMOVE_FROM_BASKET_BTN: 'btn-item-remove',
  BASKET_SUBTOTAL: 'basket-subtotal',
  BASKET_TOTAL_SAVINGS: 'basket-total-savings',
  BASKET_TOTAL: 'basket-total'
};

const renderApp = () => render(<App/>);

afterEach(() => {
  cleanup()
});

const addToBasket = (item) => {
  const utils = within(item);
  const addToBasketButton = utils.getByTestId(IDMAPS.ADD_TO_BASKET_BTN);
  fireEvent.click(addToBasketButton);
}

const removeFromBasket = (item) => {
  const utils = within(item);
  const removeFromBasketButton = utils.getByTestId(IDMAPS.REMOVE_FROM_BASKET_BTN);
  fireEvent.click(removeFromBasketButton);
}

const getBasketDetails = (getByTestId) => {
  return {
    subTotal: parseFloat(getByTestId(IDMAPS.BASKET_SUBTOTAL).innerHTML.replace('£', '')),
    totalSavings: parseFloat(getByTestId(IDMAPS.BASKET_TOTAL_SAVINGS).innerHTML.replace('£', '')),
    total: parseFloat(getByTestId(IDMAPS.BASKET_TOTAL).innerHTML.replace('£', '')),
  };
}

test('Should calculate prices correctly when items are added to basket.', async () => {
  let item, basketDetails;
  
  const { queryByTestId, getByTestId } = renderApp();

  // 2 Face Masks
  item = queryByTestId(IDMAPS.PRODUCT_ITEMS[0]);
  addToBasket(item);
  addToBasket(item);

  // 6 Toilet Paper
  item = queryByTestId(IDMAPS.PRODUCT_ITEMS[1]);
  for (let i = 0; i < 6; i ++) {
    addToBasket(item);
  }

  // 1 Hand Sanitizer
  item = queryByTestId(IDMAPS.PRODUCT_ITEMS[2]);
  addToBasket(item);
  
  // basket result
  basketDetails = getBasketDetails(getByTestId);
  expect(basketDetails.subTotal).toEqual(28.89);
  expect(basketDetails.totalSavings).toEqual(1.65);
  expect(basketDetails.total).toEqual(27.24);
});

test('Should recalculate prices when item is removed from basket', () => {
  let items, basketDetails;

  const { queryAllByTestId, getByTestId } = renderApp();

  // 2 Toilet Paper
  items = queryAllByTestId(IDMAPS.BASKET_ITEMS[1]);
  removeFromBasket(items[0]);
  removeFromBasket(items[1]);

  // 1 Hand Sanitizer
  items = queryAllByTestId(IDMAPS.BASKET_ITEMS[2]);
  removeFromBasket(items[0]);

  // basket result
  basketDetails = getBasketDetails(getByTestId);
  expect(basketDetails.subTotal).toEqual(7.60);
  expect(basketDetails.totalSavings).toEqual(1.00);
  expect(basketDetails.total).toEqual(6.60);
})

