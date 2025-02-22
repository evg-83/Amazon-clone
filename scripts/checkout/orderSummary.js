import {
	cart,
	calculateCartQuantity,
	updateQuantity,
	updateDeliveryOptions,
} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js'
import deleteItem from './deleteItem.js';


export function renderOrderSummary() {
  calculateCartQuantity()

  let cartSummaryHTML = ''

  cart.forEach(cartItem => {
    const productId = cartItem.productId

    const matchingProduct = getProduct(productId);
  
    const deliveryOptionId = cartItem.deliveryOptionsId

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption)

    cartSummaryHTML += `
		<div class="cart-item-container cart-item-container-js-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span class="product-quantity-link">
                    Quantity: <span class="quantity-label">${cartItem.quantity
      }</span>
                  </span>
                  <span class="update-quantity-link link-primary update-link-js"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input quantity-input-id-${matchingProduct.id
      }">
                  <span class="save-quantity-link link-primary"
                  data-product-id="${matchingProduct.id}">Сохранить</span>
                  <span class="delete-quantity-link link-primary delete-link-js"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
	`
  })

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = ''

    deliveryOptions.forEach(deliveryOption => {
      const dateString = calculateDeliveryDate(deliveryOption)

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`
    
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId
    
      html +=
        `
        <div class="delivery-option delivery-option-js"
          data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
        </div>
    `
    })
    return html
  }

  document.querySelector('.order-summary-js').innerHTML = cartSummaryHTML

  document.querySelectorAll('.update-link-js').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId

      const container = link.closest('.cart-item-container')

      container.classList.toggle('is-editing-quantity')
    })
  })

  document.querySelectorAll('.save-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId

      const container = link.closest('.cart-item-container')

      container.classList.toggle('is-editing-quantity')

      const inputSelector = document.querySelector(
        `.quantity-input-id-${productId}`
      )

      const inputValue = Number(inputSelector.value)

      if (inputValue >= 0 && inputValue < 1000) {
        updateQuantity(productId, inputValue)
        updateQuantityInDOM(productId, inputValue)
        inputSelector.value = ''
        calculateCartQuantity()
      } else {
        alert('Кол-во должно быть от 0 до 999')
      }

      renderPaymentSummary()
    })
  })

  function updateQuantityInDOM(productId, newQuantity) {
    const quantityLabel = document.querySelector(
      `.cart-item-container-js-${productId} .quantity-label`
    )

    if (quantityLabel) {
      quantityLabel.textContent = newQuantity
    }
  }

  document.querySelectorAll('.delivery-option-js').forEach((el) => {
    el.addEventListener('click', () => {
      const { productId, deliveryOptionId } = el.dataset
    
      updateDeliveryOptions(productId, deliveryOptionId)
      renderOrderSummary() //рекурсия
      renderPaymentSummary()
    })
  })

  deleteItem()
}
