/* ============================================================
   GREEN PAD — custom.js  (multi-step custom order form)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customForm');
  if (!form) return;

  let currentStep = 1;
  const totalSteps = 4;

  /* State */
  const order = { size: 'M (40×30)', shape: 'rectangle', design: 'solid', color: '#61678B', note: '', name: '', email: '', phone: '' };

  /* Step navigation */
  function goTo(step) {
    document.querySelectorAll('.form-step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
    });
    document.querySelectorAll('.step').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 < step)  el.classList.add('done');
      if (i + 1 === step) el.classList.add('active');
    });
    currentStep = step;
    updatePreview();
    window.scrollTo({ top: form.offsetTop - 120, behavior: 'smooth' });
  }

  /* Next/Prev buttons */
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < totalSteps) goTo(currentStep + 1);
    });
  });
  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) goTo(currentStep - 1);
    });
  });

  /* Size selection */
  document.querySelectorAll('.size-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      order.size = opt.dataset.size;
      updatePreview();
    });
  });

  /* Shape selection */
  document.querySelectorAll('.shape-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.shape-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      order.shape = opt.dataset.shape;
      updatePreview();
    });
  });

  /* Design type */
  document.querySelectorAll('.design-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.design-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      order.design = opt.dataset.design;
      const uploadArea = document.getElementById('uploadArea');
      const colorArea  = document.getElementById('colorArea');
      if (uploadArea) uploadArea.style.display = order.design === 'upload' ? 'block' : 'none';
      if (colorArea)  colorArea.style.display  = order.design === 'solid'  ? 'block' : 'none';
      updatePreview();
    });
  });

  /* Color picker */
  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) {
    colorPicker.addEventListener('input', () => {
      order.color = colorPicker.value;
      updatePreview();
    });
    document.querySelectorAll('.color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        order.color = sw.dataset.color;
        colorPicker.value = sw.dataset.color;
        updatePreview();
      });
    });
  }

  /* Note */
  const noteField = document.getElementById('orderNote');
  if (noteField) noteField.addEventListener('input', () => { order.note = noteField.value; });

  /* Form submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    order.name  = document.getElementById('custName')?.value  || '';
    order.email = document.getElementById('custEmail')?.value || '';
    order.phone = document.getElementById('custPhone')?.value || '';
    if (!order.name || !order.email) {
      GP.showToast('Veuillez renseigner votre nom et votre adresse e-mail.');
      return;
    }
    GP.showToast('Commande personnalisée reçue ! Nous vous contacterons sous 24h.');
    form.reset();
    goTo(1);
    updatePreview();
  });

  /* Live preview */
  function updatePreview() {
    const preview = document.getElementById('padPreview');
    if (!preview) return;
    preview.style.background = '';
    preview.className = 'pad-live-preview';

    if (order.design === 'solid') {
      preview.style.background = order.color;
    } else if (order.design === 'gradient') {
      preview.style.background = `linear-gradient(135deg, ${order.color}, #DEDEEA)`;
    } else if (order.design === 'pattern') {
      preview.style.background = `${order.color}`;
      preview.style.backgroundImage = `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.1) 12px, rgba(255,255,255,0.1) 24px)`;
    } else {
      preview.style.background = 'linear-gradient(135deg, #DEDEEA, #BCB9D8, #8488B5)';
    }

    /* Shape */
    let br = '8px';
    if (order.shape === 'rounded')  br = '24px';
    if (order.shape === 'oval')     br = '50%';
    if (order.shape === 'square')   br = '8px';
    if (order.shape === 'freeform') br = '30% 70% 60% 40% / 40% 50% 50% 60%';
    preview.style.borderRadius = br;

    /* Size ratio */
    const previewWrap = document.getElementById('previewWrap');
    if (previewWrap) {
      if (order.size.includes('S (')) {
        previewWrap.style.aspectRatio = '30/25';
      } else if (order.size.includes('XL')) {
        previewWrap.style.aspectRatio = '2/1';
      } else if (order.size.includes('L (')) {
        previewWrap.style.aspectRatio = '9/4';
      } else {
        previewWrap.style.aspectRatio = '4/3';
      }
    }

    /* Summary text */
    const sumSize   = document.getElementById('sumSize');
    const sumShape  = document.getElementById('sumShape');
    const sumDesign = document.getElementById('sumDesign');
    if (sumSize)   sumSize.textContent   = order.size;
    const shapeLabels  = { rectangle: 'Rectangle', square: 'Carré', rounded: 'Arrondi', oval: 'Ovale', freeform: 'Forme libre' };
    const designLabels = { solid: 'Couleur unie', gradient: 'Dégradé', pattern: 'Motif', upload: 'Fichier importé' };
    if (sumShape)  sumShape.textContent  = shapeLabels[order.shape]  || order.shape;
    if (sumDesign) sumDesign.textContent = designLabels[order.design] || order.design;
  }

  goTo(1);
});
