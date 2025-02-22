import { removeFromCart, calculateCartQuantity } from '../../data/cart.js';
import { renderOrderSummary } from './orderSummary.js';
import { renderPaymentSummary } from './paymentSummary.js'


export function deleteItem() {
	document.querySelectorAll('.delete-link-js').forEach(link => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;

			removeFromCart(productId);

			const container = document.querySelector(
				`.cart-item-container-js-${productId}`
			);

			// container.remove()
			renderOrderSummary();

			calculateCartQuantity();
			renderPaymentSummary();
		});
	});
}

export default deleteItem
