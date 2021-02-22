import "./index.scss";

import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import { removeProductFromBasket } from '../../store/actions/basket';
import { getDiscounts } from '../../utils/discounts';

class Basket extends Component {

	render() {
		const { products } = this.props;

		let subTotal = 0, totalSavings = 0, total = 0;

		products.forEach(m => subTotal += Number(m.price));
		subTotal = _.round(subTotal, 2).toFixed(2);

		
		const savings = getDiscounts(products);
		savings.forEach(m => totalSavings += Number(m.price));
		totalSavings = _.round(totalSavings, 2).toFixed(2);
		
		total = _.round(subTotal - totalSavings, 2).toFixed(2);

		return (
				<div className="card outlined basket my-50 mx-20">
					<section className="layout-column justify-content-center">
						<h4 className='text-center'>Your Basket</h4>
						<div className="divider"/>

						<div className='layout-row'>
							<table className='w-50'>
								<thead>
									<tr>
										<th className='w-60'>Product</th>
										<th className="w-30 text-end">Price</th>
										<th className="w-10"></th>
									</tr>
								</thead>
								<tbody>
								{	products.map((p, idx) => {
									return (
										<tr key={idx + 1} data-testid={`basket-item-${p.id}`} className="slide-up-fade-in">
											<td className="name" data-testid="basket-item-name">{p.name}</td>
											<td className="numeric" data-testid="basket-item-price">£ {p.price}</td>
											<td className='basket-item-remove' data-testid="btn-item-remove" onClick={() => removeProductFromBasket(p)}>X</td>
										</tr>
									)
								})}
							</tbody>
						</table>

						<ul className="bordered w-50 ma-0 px-8 ml-50">
							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Subtotal</span>
								<span data-testid="basket-subtotal">£ {subTotal}</span>
							</li>
							
							{ !!savings.length && (
								<li className="layout-column font-weight-bold">
									<Fragment>
										<span>Savings</span>
										<div className='layout-column'>
											{ savings.map(m => {
												return (
													<div
														key={m.id} data-testid={`saving-item-${m.id}`}
														className='layout-row justify-content-between py-12 caption font-weight-light'
													>
														<span>{ m.name }</span>
														<span className="discount">{`£ ${m.price}`}</span>
													</div>
												)
											})}
										</div>
									</Fragment>
								</li>
							)}

							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Total savings</span>
								<span data-testid="basket-total-savings">{`£ ${totalSavings}`}</span>
							</li>
	
							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Total</span>
								<span data-testid="basket-total">£ {total}</span>
							</li>
						</ul>
					</div>
				</section>
			</div>
		);
	}
}

const mapState = (state) => ({
  products: state.basket.products
})

export default connect(mapState)(Basket)
