/* ============================================================
   GREEN PAD — cart.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cartItems');
  const emptyState    = document.getElementById('emptyState');
  const summaryBlock  = document.getElementById('summaryBlock');
  if (!cartContainer) return;

  function render() {
    const cart = GP.getCart();
    if (cart.length === 0) {
      cartContainer.innerHTML = '';
      if (emptyState)  emptyState.style.display  = 'block';
      if (summaryBlock) summaryBlock.style.display = 'none';
      return;
    }
    if (emptyState)  emptyState.style.display  = 'none';
    if (summaryBlock) summaryBlock.style.display = 'block';

    cartContainer.innerHTML = cart.map((item, idx) => `
      <div class="cart-item" data-idx="${idx}">
        <div class="cart-item__img">
          <div class="pad-preview ${item.padClass}" style="height:100%;"></div>
        </div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__meta">Taille : ${item.size}</div>
        </div>
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
        </div>
        <div class="cart-item__price">${GP.formatPrice(item.price * item.qty)}</div>
        <button class="cart-item__remove" data-idx="${idx}" title="Remove" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </button>
      </div>
    `).join('');

    /* qty buttons */
    cartContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = GP.getCart();
        const idx  = +btn.dataset.idx;
        if (btn.dataset.action === 'inc') {
          cart[idx].qty++;
        } else {
          cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        GP.saveCart(cart);
        render();
        updateSummary();
      });
    });

    /* remove buttons */
    cartContainer.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const cart = GP.getCart();
        cart.splice(+btn.dataset.idx, 1);
        GP.saveCart(cart);
        render();
        updateSummary();
      });
    });

    updateSummary();
  }

  function updateSummary() {
    const cart     = GP.getCart();
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const totalQty  = cart.reduce((s, i) => s + i.qty, 0);
    const shipping  = subtotal === 0 ? 0 : totalQty >= 3 ? 0 : 3000;
    const total     = subtotal + shipping;
    const el = (id) => document.getElementById(id);
    if (el('sumSubtotal')) el('sumSubtotal').textContent = GP.formatPrice(subtotal);
    if (el('sumShipping')) el('sumShipping').textContent = shipping === 0 ? 'Offert' : GP.formatPrice(shipping);
    if (el('sumTotal'))    el('sumTotal').textContent    = GP.formatPrice(total);
  }

  /* Checkout button */
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = GP.getCart();
      if (cart.length === 0) return;
      GP.showToast('Commande passée ! Merci de faire confiance à Green Pad.');
      GP.saveCart([]);
      render();
    });
  }

  /* Clear cart */
  const clearBtn = document.getElementById('clearCart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      GP.saveCart([]);
      render();
    });
  }

  render();
});
