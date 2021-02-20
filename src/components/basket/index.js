import "./index.scss";

import React, {Component} from "react";
import { connect } from 'react-redux'

class Basket extends Component {

	render() {
		const { products } = this.props;

		return (
				<div className="card outlined basket my-30 mx-50">
					<section className="layout-row align-items-center justify-content-center px-16">
						<h4>Your Basket</h4>
					</section>
					<div className="divider"/>
					<table>
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
									<td className="numeric" data-testid="cart-item-price">{p.price}</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				{/* <ul className="bordered inset ma-0 px-8 mt-30">
					<li className="layout-row justify-content-between py-12 caption font-weight-light">
						<span>Subtotal</span>
						<span data-testid="cart-subtotal">${cart.subTotal}</span>
					</li>
					<li className="layout-row justify-content-between py-12 caption font-weight-light">
						<span>Discount (-)</span>
						<span className="discount" data-testid="cart-discount">{`${cart.discount}`}</span>
					</li>
					<li className="layout-row justify-content-between py-12 font-weight-bold">
						<span>Total</span>
						<span data-testid="cart-total">{`$${totalPrice}`}</span>
					</li>
				</ul> */}
			</div>
		);
	}
}

const mapState = (state) => ({
  products: state.basket.products
})

export default connect(mapState)(Basket)
