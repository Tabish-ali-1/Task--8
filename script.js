/**
 * Animated Product Card Grid — Keyboard & touch support
 * Toggle reveal on Enter/Space, tap; maintains ARIA-expanded and focus.
 */

(function () {
  'use strict';

  const cards = document.querySelectorAll('.product-card');

  function toggleExpanded(card) {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    updateAriaLabel(card, !expanded);
  }

  function updateAriaLabel(card, expanded) {
    const title = card.querySelector('.card-title');
    const price = card.querySelector('.card-front .card-price, .card-price');
    const titleText = title ? title.textContent.trim() : 'Product';
    const priceText = price ? price.textContent.trim() : '';
    const action = expanded ? 'Hide details.' : 'View details.';
    card.setAttribute('aria-label', "Product: " + titleText + ". Price: " + priceText + ". " + action);
  }

  function handleKeydown(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded(card);
    }
  }

  function handleClick(e) {
    const card = e.target.closest('.product-card');
    if (!card) return;
    /* Don't toggle when clicking the Add to cart button */
    if (e.target.closest('.btn-add-cart')) return;
    toggleExpanded(card);
  }

  cards.forEach(function (card) {
    card.addEventListener('keydown', handleKeydown);
    card.addEventListener('click', handleClick);
  });
})();
