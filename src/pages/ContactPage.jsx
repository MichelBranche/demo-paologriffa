import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    requestType: 'Informazioni generali',
    message: '',
  })
  const [formFeedback, setFormFeedback] = useState('')

  const onChangeField = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormFeedback('Compila nome, email e messaggio per procedere.')
      return
    }

    const body = [
      'Buongiorno,',
      '',
      'desidero inviare una richiesta contatti con i seguenti dati:',
      `- Nome e cognome: ${formData.fullName}`,
      `- Email: ${formData.email}`,
      `- Telefono: ${formData.phone || 'Non indicato'}`,
      `- Tipologia richiesta: ${formData.requestType}`,
      '',
      'Messaggio:',
      formData.message,
    ].join('\n')

    window.location.href = `mailto:contatti@paologriffa.it?subject=${encodeURIComponent(
      'Richiesta contatto - Caffè Nazionale',
    )}&body=${encodeURIComponent(body)}`

    setFormFeedback(
      'Richiesta pronta: il tuo client email si aprirà con il messaggio precompilato.',
    )
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    const nav = document.getElementById('navbar')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)

    const revealNodes = document.querySelectorAll('.contact-reveal')
    gsap.set(revealNodes, { opacity: 0, y: 26 })
    gsap.to(revealNodes, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.05,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="page-shell contact-page">
      <section className="contact-hero">
        <span className="label contact-reveal">Contatti</span>
        <h1 className="contact-reveal">Parliamo del tuo prossimo momento al Caffè Nazionale</h1>
        <p className="contact-reveal">
          Prenotazioni, informazioni sul menu degustazione, richieste speciali ed
          eventi privati: il nostro team è a disposizione.
        </p>
      </section>

      <section className="contact-grid">
        <article className="contact-card contact-reveal">
          <h2>Contatti diretti</h2>
          <p>
            Email: <a href="mailto:contatti@paologriffa.it">contatti@paologriffa.it</a>
          </p>
          <p>
            PEC:{' '}
            <a href="mailto:caffenazionaleaosta@pec.it">caffenazionaleaosta@pec.it</a>
          </p>
          <p>
            Instagram:{' '}
            <a
              href="https://www.instagram.com/paologriffa/"
              target="_blank"
              rel="noreferrer"
            >
              @paologriffa
            </a>
          </p>
        </article>

        <article className="contact-card contact-reveal">
          <h2>Dove siamo</h2>
          <p>Piazza Emile Chanoux, 9</p>
          <p>11100 Aosta (AO), Italia</p>
          <p>
            <a
              href="https://maps.google.com/?q=Piazza%20Emile%20Chanoux%209%20Aosta"
              target="_blank"
              rel="noreferrer"
            >
              Apri su Google Maps
            </a>
          </p>
        </article>

        <article className="contact-card contact-reveal">
          <h2>Orari</h2>
          <p>Pranzo: 12:30 - 14:30</p>
          <p>Cena: 19:30 - 22:00</p>
          <p>Tea Time e cocktail: dalle 16:00</p>
        </article>
      </section>

      <section className="contact-map contact-reveal">
        <h2>Dove trovarci</h2>
        <div className="contact-map-frame">
          <iframe
            title="Mappa Caffè Nazionale Aosta"
            src="https://maps.google.com/maps?q=Piazza%20Emile%20Chanoux%209%20Aosta&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="contact-form-section contact-reveal">
        <h2>Richiesta di contatto</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Nome e cognome
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChangeField}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeField}
              required
            />
          </label>
          <label>
            Telefono
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChangeField}
            />
          </label>
          <label>
            Tipologia richiesta
            <select
              name="requestType"
              value={formData.requestType}
              onChange={onChangeField}
            >
              <option>Informazioni generali</option>
              <option>Prenotazione</option>
              <option>Evento privato</option>
              <option>Richiesta menu degustazione</option>
            </select>
          </label>
          <label className="contact-form-message">
            Messaggio
            <textarea
              name="message"
              value={formData.message}
              onChange={onChangeField}
              rows={5}
              required
            />
          </label>
          <button type="submit">Invia richiesta</button>
          {formFeedback && <p className="contact-form-feedback">{formFeedback}</p>}
        </form>
      </section>

      <section className="contact-image-section contact-reveal">
        <img
          src="/images/ristorante/sale/griffa_007_T7A9784_1.webp"
          alt="Dettaglio sala e mise en place al Caffè Nazionale"
          loading="lazy"
        />
      </section>
    </main>
  )
}

export default ContactPage
