/* ============================================================
   GREEN PAD — shop.js
   ============================================================ */

const PRODUCTS = [
  { id:  1, name: 'Lapinou Bulle',        price: 35000, category: 'artistic', padClass: 'pad--organic',   desc: 'Forme libre arrondie en vert anis et bleu pastel avec un adorable personnage kawaii — pour un bureau plein de douceur.',       badge: null,          sizes: ['S (30×25)', 'M (40×30)'],                     img: 'Tapis 1.jpeg' },
  { id:  2, name: 'Take It Easy',         price: 32000, category: 'artistic', padClass: 'pad--neon',      desc: 'Fond corail chaleureux orné d\'un slogan en typographie rétro ondulée — positivité et bonne humeur garanties.',               badge: null,          sizes: ['S (30×25)', 'M (40×30)'],                     img: 'tapis 2.jpeg' },
  { id:  3, name: 'Patte de Chat 3D',     price: 45000, category: 'artistic', padClass: 'pad--twilight',  desc: 'Repose-poignet ergonomique en forme de patte de chat avec coussinets 3D moelleux — confort et mignonnerie réunis.',           badge: 'Populaire',   sizes: ['Unique (avec repose-poignet)'],               img: 'Tapis 3.jpeg' },
  { id:  4, name: 'Coussin Gel Rose',     price: 42000, category: 'minimal',  padClass: 'pad--twilight',  desc: 'Tapis ergonomique en forme libre avec repose-poignet en gel mémoire de forme — douceur et soutien optimal pour vos poignets.', badge: null,          sizes: ['Unique (avec repose-poignet)'],               img: 'Tapis 4.jpeg' },
  { id:  5, name: 'Repos Lilas',          price: 38000, category: 'minimal',  padClass: 'pad--lavender',  desc: 'Tapis ergonomique lilas uni avec repose-poignet intégré — simplicité apaisante pour de longues sessions de travail.',         badge: null,          sizes: ['Unique (avec repose-poignet)'],               img: 'tapis 5.jpeg' },
  { id:  6, name: 'Vichy Festonné',       price: 55000, category: 'artistic', padClass: 'pad--organic',   desc: 'Grand tapis de bureau XXL à motif vichy rose et bords festonnés — une touche cosy et romantique sur votre espace de travail.',  badge: 'Nouveau',     sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'Tapis 6.jpeg' },
  { id:  7, name: 'Magnolia Aquarelle',   price: 58000, category: 'artistic', padClass: 'pad--lavender',  desc: 'Grand tapis illustré de branches de magnolia mauve à l\'aquarelle sur fond gris nacré — poésie florale pour votre bureau.',   badge: 'Best-seller', sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'Tapis 7.jpeg' },
  { id:  8, name: 'Chat Rockeur',         price: 55000, category: 'artistic', padClass: 'pad--stellar',   desc: 'Grand tapis noir avec un chat rock illustré, casque sur les oreilles et guitare en main — pour les bureaux qui ont du caractère.', badge: 'Nouveau',   sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'tapis 8.jpeg' },
  { id:  9, name: 'Dunes Abstraites',     price: 52000, category: 'minimal',  padClass: 'pad--minimal',   desc: 'Grand tapis aux formes organiques sable et caramel avec des tracés blancs épurés — ambiance atelier contemporain et serein.',   badge: null,          sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'tapis 9.jpeg' },
  { id: 10, name: 'Minou Contour',        price: 50000, category: 'artistic', padClass: 'pad--classic',   desc: 'Tapis ovale XL crème avec un simple tracé minimaliste de chat en forme libre — silhouette attachante et bureau épuré.',         badge: null,          sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'tapis 10.jpeg' },
  { id: 11, name: 'Nuage Souriant',       price: 30000, category: 'artistic', padClass: 'pad--twilight',  desc: 'Tapis en forme de nuage avec un joli smiley — disponible en gris cendre ou bleu ciel, pour les esprits légers et créatifs.',    badge: null,          sizes: ['S (30×25)', 'M (40×30)'],                     img: 'tapis 11.jpeg' },
  { id: 12, name: 'Cuir Azur',            price: 58000, category: 'minimal',  padClass: 'pad--geometric', desc: 'Grand tapis en simili-cuir bleu azur double face au format XXL — élégance sobre et protection complète de votre bureau.',       badge: 'Populaire',   sizes: ['M (40×30)', 'L (90×40)', 'XL (120×60)'],      img: 'tapis 12.jpeg' },
  { id: 13, name: 'Sakura Noire',         price: 57000, category: 'artistic', padClass: 'pad--stellar',   desc: 'Grand tapis noir profond orné d\'une branche de cerisier en fleurs — romantisme japonais et élégance nocturne.',               badge: 'Best-seller', sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'tapis 13.jpeg' },
  { id: 14, name: 'Satin Rose XXL',       price: 60000, category: 'minimal',  padClass: 'pad--organic',   desc: 'Tapis de bureau XXL en simili-cuir rose nacré — surface ultra-lisse, bords arrondis et base antidérapante pour un bureau épuré.', badge: null,         sizes: ['L (90×40)', 'XL (120×60)'],                   img: 'tapis 14.jpeg' },
  { id: 15, name: 'Douceur Rose',         price: 52000, category: 'minimal',  padClass: 'pad--lavender',  desc: 'Grand tapis uni rose poudré, surface textile douce et micro-texturée — le choix parfait pour un bureau lumineux et élégant.',   badge: null,          sizes: ['M (40×30)', 'L (90×40)', 'XL (120×60)'],      img: 'tapis 15.jpeg' },
  { id: 16, name: 'Blanc Essentiel',      price: 30000, category: 'minimal',  padClass: 'pad--classic',   desc: 'Le classique indémodable — tapis rectangulaire blanc perle, surface lisse et bords arrondis. L\'essentiel sans compromis.',     badge: null,          sizes: ['S (30×25)', 'M (40×30)'],                     img: 'tapis 16.jpeg' },
];

window.PRODUCTS = PRODUCTS;

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  let active = 'all';

  function render(filter) {
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    const countEl = document.getElementById('shopCount');
    if (countEl) countEl.textContent = `${list.length} produit${list.length !== 1 ? 's' : ''}`;
    grid.innerHTML = list.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card__img">
          <img
            src="assets/${product.img}"
            alt="${product.name}"
            class="product-card__photo"
            loading="lazy"
            onerror="this.style.display='none'"
          />
          ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-card__body">
          <div class="product-card__name">${product.name}</div>
          <div class="product-card__desc">${product.desc}</div>
          <div class="product-card__footer">
            <span class="product-card__price">${GP.formatPrice(product.price)}</span>
            <button class="product-card__btn add-btn" data-id="${product.id}" title="Ajouter au panier" aria-label="Ajouter au panier">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const p = PRODUCTS.find(p => p.id === +btn.dataset.id);
        if (p) GP.addToCart({ id: p.id, name: p.name, price: p.price, padClass: p.padClass, size: p.sizes[1] || p.sizes[0] });
      });
    });
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const p = PRODUCTS.find(p => p.id === +card.dataset.id);
        if (p) openProductModal(p);
      });
    });
  }

  /* Filter buttons */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      active = btn.dataset.filter;
      render(active);
    });
  });

  /* URL param filter */
  const urlFilter = new URLSearchParams(window.location.search).get('filter');
  if (urlFilter) {
    active = urlFilter;
    document.querySelectorAll('.filter-btn, .sidebar-filter').forEach(b => b.classList.toggle('active', b.dataset.filter === urlFilter));
  }

  render(active);
  window.renderProducts = render;

  /* Product Modal */
  function openProductModal(product) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    const padEl = document.getElementById('modal-pad');
    if (padEl) padEl.className = `pad-preview ${product.padClass}`;
    const imgEl = document.getElementById('modal-img');
    if (imgEl) {
      imgEl.src = `assets/${product.img}`;
      imgEl.alt = product.name;
    }
    document.getElementById('modal-name').textContent  = product.name;
    document.getElementById('modal-price').textContent = GP.formatPrice(product.price);
    document.getElementById('modal-desc').textContent  = product.desc;
    const sizeSelect = document.getElementById('modal-size');
    sizeSelect.innerHTML = product.sizes.map(s => `<option>${s}</option>`).join('');
    document.getElementById('modal-add').onclick = () => {
      GP.addToCart({ id: product.id, name: product.name, price: product.price, padClass: product.padClass, size: sizeSelect.value });
      modal.classList.remove('open');
    };
    modal.classList.add('open');
  }

  const modal = document.getElementById('productModal');
  if (modal) {
    document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }
});
