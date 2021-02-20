import _ from 'lodash'
import { products } from '../data'

export default class Product {
  id: String
  name: String
  image: String
  price: Number
  discount: Number
  when: Number // price is 0.65 * 6

  static findProduct(id) {
    return products.find(p => p.id === id)
  }

  toString() {
    return `${this.name} - ${this.price}`
  }
}
 