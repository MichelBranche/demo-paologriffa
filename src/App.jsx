import { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import HomePage from './pages/HomePage'
import SectionPage from './pages/SectionPage'
import PaoloGriffaPage from './pages/PaoloGriffaPage'
import ShopPage from './pages/ShopPage'
import PressPage from './pages/PressPage'
import ContactPage from './pages/ContactPage'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/paolo-griffa', label: 'Paolo Griffa' },
  { to: '/ristorante', label: 'Ristorante' },
  { to: '/pasticceria', label: 'Pasticceria' },
  { to: '/shop', label: 'Shop' },
  { to: '/rassegna', label: 'Rassegna' },
  { to: '/contatti', label: 'Contatti' },
]

function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const html = document.documentElement
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      html.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      html.style.overflow = ''
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <>
      <nav className={`navbar${menuOpen ? ' menu-open' : ''}`} id="navbar">
        <div className="brand-block">
          <NavLink to="/" aria-label="Torna alla Home">
            <img
              className="brand-logo"
              src="/images/stella/logo-navbar-new.png"
              alt="Monogramma Paolo Griffa"
            />
          </NavLink>
        </div>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-active' : ''}`}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="primary-nav"
          className={`nav-links${menuOpen ? ' is-open' : ''}`}
        >
          <img
            className="nav-mobile-brand"
            src="/images/stella/logo-navbar-new.png"
            alt="Monogramma Paolo Griffa"
          />
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <button
        type="button"
        className={`nav-backdrop${menuOpen ? ' is-visible' : ''}`}
        aria-label="Chiudi menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/paolo-griffa" element={<PaoloGriffaPage />} />
            <Route
              path="/pasticceria"
              element={<SectionPage section="pastry" />}
            />
            <Route
              path="/ristorante"
              element={<SectionPage section="restaurant" />}
            />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/rassegna" element={<PressPage />} />
            <Route path="/contatti" element={<ContactPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <footer className="footer" id="restaurant">
        <img
          className="brand-logo brand-logo-footer"
          src="/images/stella/logo-footer-white.png"
          alt="Monogramma Paolo Griffa"
        />
        <div className="footer-links">
          <a href="mailto:contatti@paologriffa.it" aria-label="Cellulare">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M6.6 2h3.2l1 4.5-2.1 2.1a14.8 14.8 0 0 0 6.7 6.7l2.1-2.1L22 14.2v3.2A2.6 2.6 0 0 1 19.4 20C10.9 20 4 13.1 4 4.6A2.6 2.6 0 0 1 6.6 2z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a href="mailto:contatti@paologriffa.it" aria-label="Email">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.4l9 5.6 9-5.6V7l-9 5.6L3 7z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/paologriffa/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.7-3.6a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V5a22.8 22.8 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.8v8h2.7z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <div className="footer-policy-link">
          <a
            href="https://www.iubenda.com/privacy-policy/24857001"
            target="_blank"
            rel="noreferrer"
          >
            Cookies e Privacy Policy
          </a>
        </div>
        <div className="footer-legal">
          <p>©2023 Caffè Nazionale Aosta S.r.l. – C.F. e P. IVA 01272450071</p>
          <p>
            Sede legale: Piazza Emile Chanoux 9, 11100 Aosta – PEC:
            caffenazionaleaosta@pec.it – Registro delle Imprese di Aosta – Numero
            R.E.A. AO-81196
          </p>
          <a
            className="footer-design-by"
            href="https://devmichelbranche.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Design by Michel Branche
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
