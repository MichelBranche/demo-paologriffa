# Caffe Nazionale - Stella di Paolo Griffa

Sito vetrina/editoriale realizzato con React + Vite per `Caffetteria Pasticceria Stella di Paolo Griffa`, con pagine dedicate, animazioni GSAP, smooth scrolling Lenis, routing client-side e layout responsive desktop/mobile.

## Tech Stack Completo

### Frontend
- `React 19`
- `React DOM 19`
- `React Router DOM 7`
- `Framer Motion` (transizioni pagina)
- `GSAP 3` + `ScrollTrigger` (reveal, parallax, scroll orizzontali, pin)
- `Lenis` (smooth scrolling)

### Tooling & Build
- `Vite 8`
- `@vitejs/plugin-react`
- `ESLint 9` (flat config)
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`

### Styling & Asset
- CSS custom in `src/App.css` (approccio custom, no framework CSS)
- Font custom locali (`The Seasons`, `Brown Sugar`)
- Asset statici locali in `public/` (immagini, video, PDF menu)

## Funzionalita Principali

- Navigazione con menu desktop + menu mobile full-screen
- Routing SPA con pagine dedicate:
  - Home
  - Paolo Griffa
  - Ristorante
  - Pasticceria
  - Shop
  - Rassegna
  - Contatti
- Transizioni tra route con `AnimatePresence` e `motion.div`
- Scroll restoration manuale a ogni cambio pagina
- Hero e sezioni animate con GSAP (reveal, stagger, parallax)
- Sezioni orizzontali animate su desktop + fallback verticale stabile su mobile
- Footer completo con link legali, privacy, icone social/contact
- Pagina Contatti con mappa embedded e form richiesta

## Struttura Progetto

```text
demo-Griffa/
├─ public/
│  ├─ fonts/
│  ├─ images/
│  ├─ videos/
│  └─ docs/
├─ src/
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  ├─ PaoloGriffaPage.jsx
│  │  ├─ SectionPage.jsx
│  │  ├─ ShopPage.jsx
│  │  ├─ PressPage.jsx
│  │  └─ ContactPage.jsx
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ eslint.config.js
```

## Routing

Le route sono definite in `src/App.jsx`:

- `/` -> `HomePage`
- `/paolo-griffa` -> `PaoloGriffaPage`
- `/ristorante` -> `SectionPage` (`section="restaurant"`)
- `/pasticceria` -> `SectionPage` (`section="pastry"`)
- `/shop` -> `ShopPage`
- `/rassegna` -> `PressPage`
- `/contatti` -> `ContactPage`

## Setup Locale

Prerequisiti:
- Node.js 18+ (consigliato LTS)
- npm 9+

Installazione:

```bash
npm install
```

Avvio sviluppo:

```bash
npm run dev
```

Build produzione:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Responsive Strategy

- Mobile-first fallback sulle sezioni complesse
- Comportamenti GSAP differenziati tra desktop e mobile per evitare regressioni touch
- Menu mobile full-screen con lock scroll su `html/body`
- Breakpoint principali gestiti in `App.css` (`1024`, `768`, `480`)

## Note su Animazioni

- Le animazioni sono inizializzate nelle singole page (`useEffect`)
- Cleanup completo di trigger e ticker in unmount
- `ScrollTrigger` usato per:
  - reveal in viewport
  - parallax immagini
  - sezioni orizzontali desktop con `pin` + `scrub`

## Branding / Asset

- Tutti i contenuti visuali sono in `public/`
- Logo navbar e footer separati
- Link privacy: [Iubenda](https://www.iubenda.com/privacy-policy/24857001)
- Font custom caricati da `public/fonts/` tramite `@font-face`

## Deploy

Output produzione in `dist/` tramite:

```bash
npm run build
```

Il progetto e statico (client-side SPA), deployabile su Vercel, Netlify, Cloudflare Pages o hosting statico equivalente.
