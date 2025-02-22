export function renderCheckoutHeader() {
	const checkoutHeaderHTML = `
		Checkout (<a class="return-to-home-link quantity-items-js"
            href="amazon.html"></a>)
	`

	return document.querySelector('.checkout-header-middle-section-js').innerHTML = checkoutHeaderHTML
}

export default renderCheckoutHeader