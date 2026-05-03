/* ============================================================
   GREEN PAD — main.js  (shared across all pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll effect --- */
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* --- Mobile hamburger --- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* --- Active nav link --- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('?')[0] === page) link.classList.add('active');
  });

  /* --- Cart count badge --- */
  updateCartBadge();
});

/* ---- Cart helpers (used by multiple pages) ---- */
function getCart() {
  return JSON.parse(localStorage.getItem('gp_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('gp_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}
function addToCart(product) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id && i.size === product.size);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`« ${product.name} » ajouté au panier !`);
  const badge = document.querySelector('.nav__cart-count');
  if (badge) { badge.classList.add('bump'); setTimeout(() => badge.classList.remove('bump'), 300); }
}
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function formatPrice(p) {
  return p.toLocaleString('fr-FR') + ' Ar';
}

/* expose globally */
window.GP = { getCart, saveCart, addToCart, showToast, updateCartBadge, formatPrice };
