import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const editorialSlides = [
  {
    id: 'coffee',
    label: 'dalle 08:00',
    title: 'I Lievitati',
    description:
      'Croissant sfogliati, veneziane e dolci lievitati preparati freschi ogni mattina utilizzando tecniche classiche e ingredienti di altissima qualità.',
    cta: 'Scopri il menù',
    image:
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop',
    alt: 'Lievitati artigianali appena sfornati',
  },
  {
    id: 'pastries',
    label: 'tutto il giorno',
    title: 'Monoporzioni',
    description:
      "Piccole opere d'arte. Le nostre monoporzioni cambiano con le stagioni, unendo geometrie perfette a sapori sorprendenti e giocosi.",
    cta: 'Vedi le creazioni',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop',
    alt: 'Monoporzioni moderne di pasticceria',
  },
  {
    id: 'shop',
    label: 'shop online',
    title: 'La Boutique',
    description:
      "Porta a casa l'eccellenza. Dai nostri celebri panettoni artigianali alle collezioni esclusive di praline e cioccolatini d'autore.",
    cta: 'Visita lo shop',
    image:
      'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1200&auto=format&fit=crop',
    alt: 'Selezione boutique di cioccolateria',
  },
]

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    const nav = document.getElementById('navbar')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)

    gsap.from('.reveal-text', {
      yPercent: 40,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.15,
      delay: 0.05,
      immediateRender: false,
    })

    gsap.fromTo(
      '.hero-img',
      { yPercent: -10, scale: 1.05 },
      {
        yPercent: 15,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    gsap.from('.fade-up-text', {
      y: 24,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.05,
      immediateRender: false,
    })

    const horizontalSection = document.querySelector('.horizontal-section')
    const horizontalItems = gsap.utils.toArray('.horizontal-item')

    const scrollTween = gsap.to(horizontalItems, {
      xPercent: -100 * (horizontalItems.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true,
        scrub: 1,
        snap: 1 / (horizontalItems.length - 1),
        end: () => `+=${horizontalSection.offsetWidth * 1.5}`,
      },
    })

    gsap.utils.toArray('.parallax-img').forEach((img) => {
      gsap.fromTo(
        img,
        { objectPosition: '0% 50%' },
        {
          objectPosition: '100% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    gsap.utils.toArray('.horizontal-item').forEach((item, index) => {
      const revealTargets = item.querySelectorAll('.slide-reveal')
      gsap.set(revealTargets, { y: 28, opacity: 0 })

      const tl = gsap.timeline({ paused: true })
      tl.to(revealTargets, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      })

      ScrollTrigger.create({
        trigger: item,
        containerAnimation: scrollTween,
        start: 'left center+=180',
        end: 'right center-=100',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.pause(0),
      })

      if (index === 0) {
        tl.play(0)
      }
    })

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="logo">Paolo Griffa</div>
        <div className="nav-links">
          <a href="#coffee">Il Caffè</a>
          <a href="#pastries">Pasticceria</a>
          <a href="#restaurant">Ristorante</a>
          <a href="#shop">Boutique</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-titles">
          <div className="mask">
            <h1 className="reveal-text">Caffè</h1>
          </div>
          <div className="mask">
            <h1 className="reveal-text">
              <i>Nazionale</i>
            </h1>
          </div>
          <div className="mask">
            <div className="hero-subtitle reveal-text label">
              <span>coffee & pastries</span>
              <span>•</span>
              <span>1 Stella Michelin</span>
            </div>
          </div>
        </div>

        <div className="hero-img-container">
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop"
            alt="Interni della caffetteria"
          />
        </div>
      </section>

      <section className="intro">
        <div className="intro-container mask">
          <p className="fade-up-text">
            La giornata inizia con la nostra pasticceria appena sfornata e un
            caffè curato nei dettagli. Uno spazio per rituali lenti, incontri
            tranquilli, o qualcosa di dolce per iniziare il mattino nel cuore
            storico di Aosta.
          </p>
        </div>
      </section>

      <section className="horizontal-section">
        <div className="horizontal-container">
          {editorialSlides.map((slide) => (
            <article className="horizontal-item" key={slide.id} id={slide.id}>
              <div className="item-grid">
                <div className="item-text">
                  <span className="label slide-reveal">{slide.label}</span>
                  <div className="mask">
                    <h2 className="slide-reveal">{slide.title}</h2>
                  </div>
                  <p className="fade-up slide-reveal">{slide.description}</p>
                  <a className="slide-reveal" href="#">
                    {slide.cta}
                  </a>
                </div>
                <div className="item-img">
                  <img
                    className="parallax-img"
                    src={slide.image}
                    alt={slide.alt}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="restaurant">
        <div className="logo">Paolo Griffa</div>
        <div className="footer-links">
          <a href="#">Prenota un tavolo</a>
          <a href="#">Instagram</a>
          <a href="#">Contatti</a>
        </div>
        <span className="label">Piazza Emile Chanoux, 9 - Aosta</span>
      </footer>
    </>
  )
}

export default App
