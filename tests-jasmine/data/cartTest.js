import { addToCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test suite: addToCart', () => {
	it('adds an existing product to the cart', () => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'bc2847e9-5323-403f-b7cf-57fde044a955',
				quantity: 1,
				deliveryOptionsId: '1'
			}])
		})
		
		loadFromStorage();

		addToCart('bc2847e9-5323-403f-b7cf-57fde044a955', 2)
		expect(cart.length).toEqual(1)
		expect(cart[0].productId).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
		expect(cart[0].quantity).toEqual(3);
		expect(cart[0].deliveryOptionsId).toEqual('1');
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
	})

	it('adds a new product to the cart', () => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([])
		})
		
		loadFromStorage();

		addToCart('2', 1)
		expect(cart.length).toEqual(1)
		expect(cart[0].productId).toEqual('2');
		expect(cart[0].quantity).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
	})
})