import "./index.scss";

import React from "react";
import { addProductToBasket } from '../../store/actions/basket';
import { products } from '../../data';
import { images } from '../../images';

export default function ProductList() {
	return (
		<div className="layout-row wrap justify-content-center product-list">
			{ products.map(p => {
				return (
					<section className="flex w-30" data-testid={'product-item-' + p.id} key={p.id}>
						<div className="flex flex-grow card ma-16">
							<div className='flex justify-content-center align-items-center flex-grow flex-100'>
								<img alt="Your Basket" src={images[p.image]} className="d-inline-block align-top product-image"/>
							</div>
							<div className="card-text pa-4">
								<h5 className="ma-0 text-center">{p.name}</h5>
								<p className="ma-0 mt-8 text-center">£ {p.price}</p>
							</div>

							<div className="card-actions justify-content-center pa-4">
								<button className="x-small outlined" data-testid="btn-item-add" onClick={() => addProductToBasket(p)}>
									Add To Basket
								</button>
							</div>
						</div>
					</section>
				)
			})}
		</div>
	);
}
