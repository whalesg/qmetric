import "./index.scss";

import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
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
										<th>Product</th>
										<th className="numeric">Price</th>
									</tr>
								</thead>
								<tbody>
								{	products.map((p, idx) => {
									return (
										<tr data-testid={'cart-item-' + idx} key={idx + 1} className="slide-up-fade-in">
											<td className="name" data-testid="cart-item-name">{p.name}</td>
											<td className="numeric" data-testid="cart-item-price">£ {p.price}</td>
										</tr>
									)
								})}
							</tbody>
						</table>

						<ul className="bordered w-50 ma-0 px-8 ml-50">
							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Subtotal</span>
								<span data-testid="cart-subtotal">£ {subTotal}</span>
							</li>
							
							{ !!savings.length && (
								<li className="layout-column font-weight-bold">
									<Fragment>
										<span>Savings</span>
										<div className='layout-column'>
											{ savings.map(m => {
												return (
													<div className='layout-row justify-content-between py-12 caption font-weight-light' key={m.id}>
														<span>{ m.name }</span>
														<span className="discount" data-testid={`cart-discount-${m.id}`}>{`£ ${m.price}`}</span>
													</div>
												)
											})}
										</div>
									</Fragment>
								</li>
							)}

							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Total savings</span>
								<span data-testid="cart-total-savings">{`£ ${totalSavings}`}</span>
							</li>
	
							<li className="layout-row justify-content-between py-12 font-weight-bold">
								<span>Total</span>
								<span data-testid="cart-total">£ {total}</span>
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
