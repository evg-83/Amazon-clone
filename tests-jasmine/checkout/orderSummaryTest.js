import { loadFromStorage, cart } from '../../data/cart.js'
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js'

describe('test suite: renderOrderSummary', () => {
	const productId1 = '1';
	const productId2 = '2';
	//hook
	beforeEach(() => {
		spyOn(localStorage, 'setItem')

		document.querySelector('.test-container-js').innerHTML = `
			<div class="order-summary-js"></div>
			<div class="quantity-items-js"></div>
			<div class="payment-summary-js"></div>
		`
		
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: productId1,
					quantity: 2,
					deliveryOptionsId: '1'
				},
				{
					productId: productId2,
					quantity: 3,
					deliveryOptionsId: '2'
				},
			])
		})
				
		loadFromStorage();
		renderOrderSummary();
	})

	it('display the cart', () => {
/* 		document.querySelector('.test-container-js').innerHTML = `
			<div class="order-summary-js"></div>
        	<div class="amazon-quantity-items-js"></div>
		`
 */

		expect(document.querySelector('.quantity-items-js').innerHTML).toBe('5 items')
		// expect(document.querySelector('.amazon-quantity-items-js').innerHTML).toBe('5')
		expect(document.querySelectorAll('.cart-item-container-js').length).toEqual(2);
		expect(document.querySelector(`.product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
		expect(document.querySelector(`.product-quantity-${productId2}`).innerText).toContain('Quantity: 3');

		document.querySelector('.test-container-js').innerHTML = ``
	})

	it('removes a product', () => {
		document.querySelector(`.delete-link-js-${productId1}`).click();

		expect(document.querySelectorAll('.cart-item-container-js').length).toEqual(1);

		expect(document.querySelector(`.cart-item-container-js-${productId1}`)).toEqual(null);
		expect(document.querySelector(`.cart-item-container-js-${productId2}`)).not.toEqual(null);
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual(productId2);

		document.querySelector('.test-container-js').innerHTML = ``
	})
})