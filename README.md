# Green Pad 🖱️

Site e-commerce de tapis de souris premium fabriqués à partir de bouteilles en plastique recyclé.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Accueil |
| `shop.html` | Boutique (16 produits) |
| `custom.html` | Commande sur mesure |
| `about.html` | Notre histoire & durabilité |
| `contact.html` | Contact & FAQ |
| `cart.html` | Panier |

## Structure

```
├── index.html
├── shop.html
├── custom.html
├── about.html
├── contact.html
├── cart.html
├── mentions-legales.html
├── cgv.html
├── cgu.html
├── assets/          # Images produits + logo
├── css/
│   ├── style.css    # Styles globaux
│   └── home.css     # Styles page d'accueil
└── js/
    ├── main.js      # Panier & utilitaires globaux
    ├── shop.js      # Données produits & rendu boutique
    ├── cart.js      # Logique panier
    └── custom.js    # Formulaire sur mesure
```

## Déploiement GitHub Pages

1. Pousser ce dossier sur un dépôt GitHub
2. Aller dans **Settings → Pages**
3. Source : **Deploy from a branch** → branche `main` → dossier `/ (root)`
4. Cliquer **Save** — le site sera disponible sur `https://<username>.github.io/<repo>/`

## Tech

- HTML5 / CSS3 / JavaScript vanilla
- Aucune dépendance externe (pas de npm, pas de build)
- Polices : Playfair Display + DM Sans (Google Fonts)
- Panier : `localStorage` (`gp_cart`)
