import _ from 'lodash';
import { Product } from '../models'

export function getDiscounts(items) {
  if (!items) return {}

  let savings = 
    _.uniq(items.map(p => p.id))
    .map(id => {
      const product = Product.findProduct(id);
      const subItems = items.filter(p => p.id === id);
      const totalPrice = subItems.length * product.price;

      let price = 0;
      if (!!product.discountWhen) {
        const count = _.floor(totalPrice / product.discountWhen);
        price = _.round(count * product.discountPrice, 2).toFixed(2);
      }

      const name = _.compact([
        product.name,
        product.discountDescription
      ]).join(' ');

      return { id, name, price }
    })
    .filter(m => !!Number(m.price))

  return savings;
}
