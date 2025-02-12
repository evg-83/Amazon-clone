export const cart = [
	{
		productId: '1',
		quantity: 2,
	},
	{
		productId: '2',
		quantity: 3,
	},
];

export function addToCart(productId) {
	let matchingItem;

	cart.forEach(cartItem => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});

	const quantitySelector = document.querySelector(
		`.js-quantity-selector-${productId}`
	);

	const quantity = Number(quantitySelector.value);

	if (matchingItem) {
		matchingItem.quantity += quantity;
	} else {
		cart.push({
			productId,
			quantity,
		});
	}
}
