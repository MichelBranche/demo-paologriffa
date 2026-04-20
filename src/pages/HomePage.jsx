import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const editorialSlides = [
  {
    id: 'pastries',
    label: 'tutto il giorno',
    title: 'Pasticceria',
    description:
      "Mise en place e piccoli assaggi d'autore in sala, con tecnica contemporanea e stile Paolo Griffa.",
    cta: 'Apri pagina',
    to: '/pasticceria',
    image: '/images/pasticceria/dolci/pasticceria-1.jpg',
    alt: "Dessert e piccola pasticceria d'autore",
  },
  {
    id: 'restaurant',
    label: 'firma gastronomica',
    title: 'Ristorante',
    description:
      "Un percorso di alta cucina dove tecnica, ironia e territorio si incontrano in un'esperienza contemporanea.",
    cta: 'Scopri il ristorante',
    to: '/ristorante',
    image: '/images/ristorante/sale/unnamed%20(2).webp',
    alt: 'Sala del ristorante al Caffe Nazionale',
  },
  {
    id: 'paolo',
    label: 'visione creativa',
    title: 'Paolo Griffa',
    description:
      'Il tratto personale dello chef: estetica, ritmo e ricerca continua tra cucina, pasticceria e ospitalita.',
    cta: 'Vai alla pagina',
    to: '/paolo-griffa',
    image: '/images/ristorante/sale/unnamed%20(5).webp',
    alt: 'Dettaglio della sala firmata Paolo Griffa',
  },
]

function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768)

    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: isTouchDevice ? 1 : 1.1,
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

    gsap.fromTo(
      '.reveal-text',
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.05,
        clearProps: 'transform',
      },
    )

    gsap.fromTo(
      '.hero-img',
      { yPercent: -2, scale: 1.002 },
      {
        yPercent: 2.8,
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

    gsap.to('.fade-up-text', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.15,
    })

    gsap.utils.toArray('.home-story-reveal').forEach((node, index) => {
      gsap.to(node, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.1 + index * 0.08,
        scrollTrigger: {
          trigger: '.home-story',
          start: 'top 82%',
        },
      })
    })

    const horizontalSection = document.querySelector('.horizontal-section')
    const horizontalItems = gsap.utils.toArray('.horizontal-item')

    const isDesktop = window.innerWidth > 768
    const canUseHorizontalScroll =
      isDesktop && horizontalSection && horizontalItems.length > 1
    const scrollTween = canUseHorizontalScroll
      ? gsap.to(horizontalItems, {
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
      : null

    if (scrollTween) {
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
    } else if (isDesktop) {
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.horizontal-item'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }

    gsap.utils.toArray('.horizontal-item').forEach((item, index) => {
      const revealTargets = item.querySelectorAll('.slide-reveal')
      const tl = gsap.timeline({ paused: true })
      tl.to(revealTargets, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
      })

      if (scrollTween) {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: scrollTween,
          start: 'left center+=160',
          end: 'right center-=80',
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(0),
        })
      } else if (isDesktop) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(0),
        })
      } else {
        gsap.set(revealTargets, { y: 0, opacity: 1, clearProps: 'transform' })
      }

      if (index === 0) {
        tl.play(0)
      }
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-titles">
          <div className="mask">
            <h1 className="reveal-text">Caffetteria</h1>
          </div>
          <div className="mask">
            <h1 className="reveal-text">
              Stella di <i>Paolo Griffa</i>
            </h1>
          </div>
          <div className="mask">
            <div className="hero-subtitle reveal-text label">
              <span>coffee & pastries</span>
              <span>•</span>
              <span>esperienza gourmet</span>
            </div>
          </div>
        </div>

        <div className="hero-img-container">
          <img
            className="hero-img"
            src="/images/stella/sala-archi.png"
            alt="Sala con archi e volte decorate"
          />
        </div>
      </section>

      <section className="home-story">
        <div className="home-story-grid">
          <div>
            <span className="label home-story-reveal">Identità</span>
            <h2 className="home-story-title home-story-reveal">
              Un luogo storico, ma anticonvenzionale
            </h2>
            <p className="home-story-text home-story-reveal">
              Un caffè leggendario nel cuore di Aosta rinasce come ristorante
              stellato, pasticceria, salon de tè e cocktail bar. Spiate dietro
              le quinte di un&apos;antica cappella decagonale rinata come
              cattedrale del gusto.
            </p>
          </div>
          <div className="home-story-badge-wrap home-story-reveal">
            <img
              className="home-story-badge"
              src="/images/stella/michelin-2023-transparent.png"
              alt="Riconoscimento Michelin 2023"
            />
          </div>
        </div>
      </section>

      <section className="horizontal-section">
        <div
          className="horizontal-container"
          style={{ '--slide-count': editorialSlides.length }}
        >
          {editorialSlides.map((slide) => (
            <article className="horizontal-item" key={slide.id} id={slide.id}>
              <div className="item-grid">
                <div className="item-text">
                  <span className="label slide-reveal">{slide.label}</span>
                  <div className="mask">
                    <h2 className="slide-reveal">{slide.title}</h2>
                  </div>
                  <p className="slide-reveal">{slide.description}</p>
                  <Link className="slide-reveal" to={slide.to}>
                    {slide.cta}
                  </Link>
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
    </>
  )
}

export default HomePage
