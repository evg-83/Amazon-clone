export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
	cart = [
		{
			productId: '1',
			quantity: 2,
			deliveryOptionsId: '1'
		},
		{
			productId: '2',
			quantity: 3,
			deliveryOptionsId: '2'
		},
	];
	saveToStorage()
}

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

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
			deliveryOptionsId,
		});
	}

	saveToStorage();
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach(cartItem => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;
	saveToStorage();
}

export function calculateCartQuantity() {
	let cartQuantity = 0;

	cart.forEach(cartItem => {
		cartQuantity += cartItem.quantity;
	});

	document.querySelector('.quantity-items-js').innerHTML = cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
	if (newQuantity) {
		cart.forEach(cartItem => {
			if (cartItem.productId === productId) {
				cartItem.quantity = newQuantity;
			}
		})
	}
	saveToStorage();
}