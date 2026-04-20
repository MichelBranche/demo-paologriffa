import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const bookingEmail = 'contatti@paologriffa.it'
const bookingWeekdays = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do']

const normalizeDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

const sameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

const monthLabelFormatter = new Intl.DateTimeFormat('it-IT', {
  month: 'long',
  year: 'numeric',
})

const fullDateFormatter = new Intl.DateTimeFormat('it-IT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const buildCalendarCells = (viewDate) => {
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate()
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstWeekday + 1
    if (day < 1 || day > daysInMonth) return null
    return new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
  })
}

const sectionContent = {
  coffee: {
    label: 'Il Caffè',
    title: 'Rituali di colazione e specialty coffee',
    description:
      'Espressi, cappuccini e signature coffee accompagnano una proposta di lievitati e dolci da forno che cambia durante la giornata.',
    image: '/images/stella/colazione-portici.png',
    alt: 'Colazione sotto i portici con croissant e caffe',
    stats: ['08:00-19:00 servizio continuo', 'Single-origin e blend custom'],
    manifesto:
      'Un banco colazioni che incontra il linguaggio del fine dining: precisione estrattiva, texture nitide, gusto immediato.',
    blocks: [
      {
        title: 'Selezione Caffetteria',
        text: 'Espresso classico, filtro, signature iced coffee e pairing con viennoiserie artigianale.',
      },
      {
        title: 'Ritmo Editoriale',
        text: 'Sequenze di servizio scandite in momenti: mattino, brunch, pomeriggio gourmand.',
      },
    ],
    gallery: [
      {
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop',
        alt: 'Coffee station contemporanea',
      },
      {
        image:
          'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=1400&auto=format&fit=crop',
        alt: 'Selezione di pasticceria artigianale',
      },
      {
        image:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop',
        alt: 'Servizio caffetteria al tavolo',
      },
    ],
  },
  pastry: {
    label: 'Pasticceria',
    title: 'Pasticceria contemporanea firmata Paolo Griffa',
    description:
      "Monoporzioni, dessert al piatto e creazioni stagionali: equilibrio tra tecnica, estetica e gusto in ogni servizio.",
    image: '/images/stella/hero-sala.png',
    alt: "Assaggi di pasticceria d'autore in sala",
    stats: ['Monoporzioni stagionali', 'Laboratorio in evoluzione continua'],
    manifesto:
      "Linee pulite, dolcezza controllata, contrasti netti. La pasticceria diventa un racconto visivo con un'identita precisa.",
    blocks: [
      {
        title: 'Dessert Architecture',
        text: 'Volumi geometrici, tagli netti e bilanciamento aromatico su agrumi, cacao e frutta secca.',
      },
      {
        title: 'Signature Collection',
        text: 'Classici reinterpretati con tecniche moderne, servizio al tavolo e finiture minute.',
      },
    ],
    gallery: [
      {
        image:
          'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1400&auto=format&fit=crop',
        alt: 'Dessert al piatto contemporaneo',
      },
      {
        image:
          'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=1400&auto=format&fit=crop',
        alt: 'Composizione di dessert stagionali',
      },
      {
        image:
          'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1400&auto=format&fit=crop',
        alt: 'Monoporzioni moderne',
      },
    ],
  },
  restaurant: {
    label: 'Ristorante',
    title: 'PAOLO GRIFFA',
    subtitle: 'AL CAFFÈ NAZIONALE',
    description:
      'Sulla piazza principale di Aosta, nel cuore della Valle d’Aosta, il Caffè Nazionale è un luogo dove l’alta cucina e la grande pasticceria incontrano la cura, la passione e la visione di Paolo Griffa, chef stellato e pasticcere.',
    logo: '/images/stella/michelin-2023-transparent.png',
    image: '/images/stella/sala-archi.png',
    alt: 'Sala del ristorante con archi e tavoli',
    stats: ['Menu degustazione guidato', 'Abbinamenti vino su misura'],
    manifesto:
      'Larchitettura della sala e quella del piatto dialogano: profondita, verticalita, equilibrio tra classicismo e ricerca.',
    heritage: [
      'Ogni singolo elemento del Caffè Nazionale è stato studiato nel rispetto di una struttura ricca di storia e personalità. Con l’aiuto delle Belle Arti è stato possibile riportare il locale, i suoi fregi e colori allo stato originario, dando nuova luce ai suoi preziosi interni. Un’opera di recupero e rinnovamento, dove antico e moderno si fondono con inedita forza per risultati inaspettati.',
      'Uno spazio aperto a tutti che arricchisce la splendida piazza, cuore storico della città che ci accoglie, un rendez-vous per ospiti e gourmet della Valle d’Aosta e del mondo intero',
    ],
    blocks: [
      {
        title: 'Percorso Degustazione',
        text: 'Sequenza di piatti con ritmi calibrati, ingredienti del territorio e tecniche contemporanee.',
      },
      {
        title: 'Service Direction',
        text: 'Accoglienza sartoriale, mise en place essenziale, attenzione al dettaglio in ogni passaggio.',
      },
    ],
    gallery: [
      {
        image: '/images/ristorante/sale/sala-panoramica-paolo-Griffa.jpg',
        alt: 'Sala panoramica del ristorante',
      },
      {
        image: '/images/ristorante/sale/Sala-archeologica-1536x1025.jpg',
        alt: 'Sala archeologica del ristorante',
      },
      {
        image: '/images/ristorante/sale/sala-ristorante-Paolo-griffa-1536x1024.jpg',
        alt: 'Interno sala ristorante Paolo Griffa',
      },
      {
        image:
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop',
        alt: 'Interni fine dining',
      },
      {
        image:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop',
        alt: 'Mise en place elegante',
      },
      {
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop',
        alt: 'Atmosfera della sala ristorante',
      },
    ],
    roomSlides: [
      {
        id: 'sala-archeologica',
        label: 'Sala archeologica',
        title: 'Storia riportata alla luce',
        description:
          'Un esclusivo privè, tornato in vita grazie alla collaborazione con la Sovraintendenza dei Beni Culturali, vi accoglierà per un’esperienza indimenticabile: un menù appositamente dedicato, servito dallo Chef in persona, sospesi su una lastra di vetro con vista una vasca ittica di una domus dell’antica città romana di Augusta Praetoria.',
        image: '/images/ristorante/sale/Sala-archeologica-1536x1025.jpg',
        alt: 'Sala archeologica del Caffe Nazionale',
      },
      {
        id: 'sala-principale',
        label: 'Sala principale',
        title: 'Accoglienza e rituale del servizio',
        description:
          'Un equilibrio tra privacy e scena: tavoli distanziati, percorso di sala fluido e una mise en place pensata per valorizzare ogni passaggio del menu.',
        image: '/images/ristorante/sale/sala-ristorante-Paolo-griffa-1536x1024.jpg',
        alt: 'Sala principale del ristorante Paolo Griffa',
      },
      {
        id: 'sala-panoramica',
        label: 'Sala panoramica',
        title: 'Tecnologia e comfort in dialogo',
        description:
          'Materiali nobili e soluzioni tecniche invisibili convivono in uno spazio progettato per accompagnare l’esperienza gastronomica in modo elegante e discreto.',
        image: '/images/ristorante/sale/unnamed (2).webp',
        alt: 'Interno del ristorante con tavoli apparecchiati',
      },
      {
        id: 'sala-atmosfera',
        label: 'Atmosfera di sala',
        title: 'Un’eleganza che accoglie',
        description:
          'Dettagli, luci e proporzioni costruiscono un ambiente intimo e raffinato, pensato per accompagnare il ritmo della degustazione con naturalezza.',
        image: '/images/ristorante/sale/unnamed (5).webp',
        alt: 'Dettaglio della sala del ristorante',
      },
    ],
  },
  boutique: {
    label: 'Boutique',
    title: 'Selezione esclusiva da portare a casa',
    description:
      'Dalle etichette pregiate ai prodotti della casa, una boutique curata per acquisti gourmet e regali.',
    image: '/images/stella/cantina-boutique.png',
    alt: 'Boutique e cantina con selezione di vini',
    stats: ['Limited edition e gift box', 'Consulenza acquisto dedicata'],
    manifesto:
      'Uno spazio retail con estetica museale: scaffali ordinati, luce calda, collezioni curate come pezzi da collezione.',
    blocks: [
      {
        title: 'Wine & Pantry',
        text: 'Etichette selezionate, conserve, cioccolati e prodotti iconici del progetto Stella.',
      },
      {
        title: 'Regali Editoriali',
        text: 'Packaging minimale e componibile per occasioni private e corporate.',
      },
    ],
    gallery: [
      {
        image:
          'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop',
        alt: 'Scaffali boutique gourmet',
      },
      {
        image:
          'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=1400&auto=format&fit=crop',
        alt: 'Selezione curata di prodotti',
      },
      {
        image:
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1400&auto=format&fit=crop',
        alt: 'Spazio retail premium',
      },
    ],
  },
  shop: {
    label: 'Shop',
    title: 'Acquista online le collezioni Stella',
    description:
      "Una vetrina digitale per ordinare prodotti iconici, gift box e novita stagionali con consegna dedicata.",
    image: '/images/stella/cantina-boutique.png',
    alt: 'Shop online con selezione boutique',
    stats: ['Spedizione in 24/48h', 'Collezioni stagionali in anteprima'],
    manifesto:
      'Lecosistema digitale riflette la boutique fisica: navigazione pulita, schede prodotto essenziali, forte identita visiva.',
    blocks: [
      {
        title: 'Capsule Drop',
        text: 'Uscite periodiche con disponibilita limitata e notifiche dedicate ai clienti registrati.',
      },
      {
        title: 'Client Experience',
        text: 'Checkout rapido, supporto diretto e tracciamento ordine in tempo reale.',
      },
    ],
    gallery: [
      {
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop',
        alt: 'Prodotto in vetrina online',
      },
      {
        image:
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1400&auto=format&fit=crop',
        alt: 'Catalogo boutique online',
      },
      {
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop',
        alt: 'Packaging e spedizione',
      },
    ],
  },
}

function SectionPage({ section }) {
  const content = sectionContent[section] ?? sectionContent.coffee
  const isRestaurant = section === 'restaurant'
  const today = useMemo(() => normalizeDate(new Date()), [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [partySize, setPartySize] = useState('2')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingFeedback, setBookingFeedback] = useState('')

  const monthLabel = useMemo(
    () => monthLabelFormatter.format(viewDate),
    [viewDate],
  )
  const calendarCells = useMemo(() => buildCalendarCells(viewDate), [viewDate])
  const timeSlots = useMemo(() => {
    const day = selectedDate.getDay()
    const isWeekend = day === 5 || day === 6
    return isWeekend
      ? ['19:15', '19:45', '20:15', '20:45', '21:15']
      : ['19:30', '20:00', '20:30', '21:00']
  }, [selectedDate])

  useEffect(() => {
    if (selectedTime && !timeSlots.includes(selectedTime)) {
      setSelectedTime('')
    }
  }, [selectedTime, timeSlots])

  const changeMonth = (offset) => {
    setViewDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1),
    )
  }

  const selectDay = (day) => {
    if (!day || normalizeDate(day) < today) return
    setSelectedDate(day)
    setBookingFeedback('')
  }

  const openMail = (subject, bodyLines) => {
    const subjectEncoded = encodeURIComponent(subject)
    const bodyEncoded = encodeURIComponent(bodyLines.join('\n'))
    window.location.href = `mailto:${bookingEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`
  }

  const handleBookingSubmit = (event) => {
    event.preventDefault()
    if (!selectedTime) {
      setBookingFeedback('Seleziona un orario per completare la prenotazione.')
      return
    }

    const dateLabel = fullDateFormatter.format(selectedDate)
    openMail('Richiesta prenotazione - Caffè Nazionale', [
      'Buongiorno,',
      '',
      'vorrei prenotare un tavolo con i seguenti dettagli:',
      `- Data: ${dateLabel}`,
      `- Ora: ${selectedTime}`,
      `- Numero di persone: ${partySize}`,
      '',
      'Grazie.',
    ])
    setBookingFeedback('Richiesta pronta: si apre il tuo client email per inviarla.')
  }

  const handleWaitlist = () => {
    const dateLabel = fullDateFormatter.format(selectedDate)
    openMail('Lista d’attesa - Caffè Nazionale', [
      'Buongiorno,',
      '',
      'desidero inserirmi in lista d’attesa:',
      `- Data preferita: ${dateLabel}`,
      `- Numero di persone: ${partySize}`,
      '',
      'Grazie.',
    ])
  }

  const handleGroupRequest = () => {
    const dateLabel = fullDateFormatter.format(selectedDate)
    openMail('Richiesta gruppo - Caffè Nazionale', [
      'Buongiorno,',
      '',
      'vorrei richiedere una prenotazione per gruppo:',
      `- Data preferita: ${dateLabel}`,
      `- Numero di persone: ${partySize}`,
      '',
      'Resto in attesa di un vostro riscontro.',
    ])
  }

  const handleVoucherRequest = () => {
    openMail('Richiesta voucher regalo - Caffè Nazionale', [
      'Buongiorno,',
      '',
      'vorrei acquistare un voucher regalo per il Caffè Nazionale.',
      '',
      'Attendo informazioni su importi e modalità di acquisto.',
      '',
      'Grazie.',
    ])
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

    gsap.utils.toArray('.editor-reveal').forEach((item, index) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        delay: index * 0.04,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      })
    })

    if (isRestaurant) {
      const bookingCard = document.querySelector('.restaurant-booking-card')
      const bookingPanels = gsap.utils.toArray(
        '.restaurant-booking-calendar, .restaurant-booking-fields',
      )

      if (bookingCard) {
        gsap.set(bookingCard, { opacity: 0, y: 30, scale: 0.985 })
        gsap.to(bookingCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bookingCard,
            start: 'top 82%',
          },
        })
      }

      if (bookingPanels.length) {
        gsap.set(bookingPanels, { opacity: 0, y: 18 })
        gsap.to(bookingPanels, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.restaurant-booking',
            start: 'top 80%',
          },
        })
      }

      const roomSection = document.querySelector('.restaurant-room-scroll')
      const roomSlides = gsap.utils.toArray('.restaurant-room-slide')

      if (roomSection && roomSlides.length > 0 && window.innerWidth > 900) {
        const roomTween = gsap.to(roomSlides, {
          xPercent: -100 * (roomSlides.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: roomSection,
            pin: true,
            scrub: true,
            end: () => `+=${roomSection.offsetWidth * (roomSlides.length - 1)}`,
            invalidateOnRefresh: true,
          },
        })

        roomSlides.forEach((slide, index) => {
          const textNodes = slide.querySelectorAll('.restaurant-room-text > *')
          const imageNode = slide.querySelector('.restaurant-room-image')

          gsap.set(textNodes, { opacity: 0, y: 36 })
          gsap.set(imageNode, { opacity: 0, scale: 1.06 })

          const tl = gsap.timeline({ paused: true })
          tl.to(textNodes, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
          }).to(
            imageNode,
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
            },
            0.1,
          )

          if (index === 0) {
            tl.play(0)
          } else {
            ScrollTrigger.create({
              trigger: slide,
              containerAnimation: roomTween,
              start: 'left center',
              onEnter: () => tl.play(),
              onEnterBack: () => tl.play(),
              onLeaveBack: () => tl.pause(0),
            })
          }
        })
      }

      const cocktailsSection = document.querySelector('.restaurant-cocktails')
      if (cocktailsSection) {
        const cocktailNodes = cocktailsSection.querySelectorAll('.cocktail-reveal')
        gsap.set(cocktailNodes, { opacity: 0, y: 32 })

        gsap.to(cocktailNodes, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: cocktailsSection,
            start: 'top 78%',
          },
        })

        const cocktailImg = cocktailsSection.querySelector('.restaurant-cocktails-media img')
        if (cocktailImg) {
          gsap.fromTo(
            cocktailImg,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cocktailsSection,
                start: 'top 78%',
              },
            },
          )
        }
      }
    }

    gsap.to('.page-media img', {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.page-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [section])

  return (
    <main className="page-shell">
      <section
        className={`page-hero${isRestaurant ? ' page-hero-restaurant' : ''}`}
      >
        {isRestaurant ? (
          <div className="page-copy restaurant-hero-copy editorial-frame">
            <img
              className="restaurant-hero-logo editor-reveal"
              src={content.logo}
              alt="Michelin 2023"
            />
            <h1 className="restaurant-hero-title editor-reveal">{content.title}</h1>
            <h2 className="restaurant-hero-subtitle editor-reveal">
              AL <span className="restaurant-hero-caffe">CAFFÈ</span> NAZIONALE
            </h2>
            <p className="restaurant-hero-description editor-reveal">
              {content.description}
            </p>
          </div>
        ) : (
          <>
            <div className="page-copy editorial-frame">
              <span className="label editor-reveal">{content.label}</span>
              <h1 className="editor-reveal">{content.title}</h1>
              <p className="editor-reveal">{content.description}</p>
              <div className="page-stats">
                {content.stats.map((entry) => (
                  <span className="editor-reveal" key={entry}>
                    {entry}
                  </span>
                ))}
              </div>
            </div>
            <div className="page-media editorial-frame editor-reveal">
              <img src={content.image} alt={content.alt} />
            </div>
          </>
        )}
      </section>

      {isRestaurant && (
        <section className="curated-gallery restaurant-room-gallery">
          <article className="gallery-card editor-reveal" key={content.gallery[0].image}>
            <img
              src={content.gallery[0].image}
              alt={content.gallery[0].alt}
              loading="lazy"
            />
          </article>
        </section>
      )}

      <section className="editorial-manifesto editorial-frame editor-reveal">
        <p>{content.manifesto}</p>
      </section>

      {isRestaurant && (
        <section className="restaurant-heritage editorial-frame editor-reveal">
          {content.heritage.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-booking editor-reveal">
          <h2>Prenota</h2>
          <form className="restaurant-booking-card" onSubmit={handleBookingSubmit}>
            <div className="restaurant-booking-calendar">
              <div className="restaurant-booking-month-row">
                <button
                  type="button"
                  className="restaurant-booking-month-nav"
                  onClick={() => changeMonth(-1)}
                  aria-label="Mese precedente"
                >
                  ←
                </button>
                <div className="restaurant-booking-month">{monthLabel}</div>
                <button
                  type="button"
                  className="restaurant-booking-month-nav"
                  onClick={() => changeMonth(1)}
                  aria-label="Mese successivo"
                >
                  →
                </button>
              </div>
              <div className="restaurant-booking-weekdays">
                {bookingWeekdays.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>
              <div className="restaurant-booking-days">
                {calendarCells.map((day, index) => {
                  if (!day) {
                    return <span className="is-empty" key={`empty-${index}`}></span>
                  }
                  const normalizedDay = normalizeDate(day)
                  const isPast = normalizedDay < today
                  const isActive = sameDay(normalizedDay, selectedDate)

                  return (
                    <button
                      type="button"
                      key={day.toISOString()}
                      className={`${isPast ? 'is-muted' : ''}${isActive ? ' is-active' : ''}`}
                      onClick={() => selectDay(day)}
                      disabled={isPast}
                      aria-label={fullDateFormatter.format(day)}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>
              <p>
                Per gruppi superiori alle 6 persone, chiediamo di contattarci via
                email.
              </p>
            </div>

            <div className="restaurant-booking-fields">
              <label>
                Numero di persone
                <select
                  value={partySize}
                  onChange={(event) => setPartySize(event.target.value)}
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 persone</option>
                  <option value="3">3 persone</option>
                  <option value="4">4 persone</option>
                  <option value="5">5 persone</option>
                  <option value="6">6 persone</option>
                </select>
              </label>
              <label>
                Ora
                <select
                  value={selectedTime}
                  onChange={(event) => setSelectedTime(event.target.value)}
                >
                  <option value="" disabled>
                    Seleziona
                  </option>
                  {timeSlots.map((slot) => (
                    <option value={slot} key={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Prenota</button>
              <button type="button" className="ghost" onClick={handleWaitlist}>
                Lista d&apos;attesa
              </button>
              <button type="button" className="ghost" onClick={handleGroupRequest}>
                Richiesta di gruppo
              </button>
              <button
                type="button"
                className="voucher"
                onClick={handleVoucherRequest}
              >
                Regala un voucher
              </button>
              {bookingFeedback && (
                <p className="restaurant-booking-feedback">{bookingFeedback}</p>
              )}
            </div>
          </form>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-space editor-reveal">
          <h2>Uno spazio per ogni gusto</h2>
          <p>
            Un ristorante altamente tecnologico allestito in un locale storico
            della Valle d’Aosta. Al Caffè Nazionale ogni stanza è un’esperienza
            diversa e complementare dove ogni spazio ha una funzione e
            un’anima. Un percorso ideale tra patrimonio salvaguardato,
            tecnologia e il sapore dell’alta cucina stellata di Paolo Griffa.
          </p>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-room-scroll">
          <div className="restaurant-room-track">
            {content.roomSlides.map((slide) => (
              <article className="restaurant-room-slide" key={slide.id}>
                <div className="restaurant-room-content">
                  <div className="restaurant-room-text">
                    <span className="label">{slide.label}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                  <div className="restaurant-room-image">
                    <img src={slide.image} alt={slide.alt} loading="lazy" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-poliedrica editor-reveal">
          <h2>Una mente poliedrica per menù indimenticabili</h2>
          <p>
            Alta cucina creativa, identità valdostana e un forte senso di
            condivisione. Al Caffè Nazionale Paolo Griffa sperimenta
            continuamente per donare nuovo significato al concetto di
            accoglienza e degustazione.
          </p>
          <div className="restaurant-poliedrica-grid">
            <article className="gallery-card">
              <img
                src="/images/ristorante/mente-poliedrica/mente-poliedrica-1.png"
                alt="Creazione gastronomica di Paolo Griffa"
                loading="lazy"
              />
            </article>
            <article className="gallery-card">
              <img
                src="/images/ristorante/mente-poliedrica/mente-poliedrica-2.png"
                alt="Piatto creativo con atmosfera autunnale"
                loading="lazy"
              />
            </article>
            <article className="gallery-card">
              <img
                src="/images/ristorante/mente-poliedrica/mente-poliedrica-3.png"
                alt="Ritratto di Paolo Griffa"
                loading="lazy"
              />
            </article>
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-menu-offer editor-reveal">
          <div className="restaurant-menu-offer-hero">
            <img
              src="/images/ristorante/piatti/Cucina-creativa-1536x864.jpg"
              alt="Piatto di cucina creativa firmato Paolo Griffa"
              loading="lazy"
            />
          </div>
          <div className="restaurant-menu-offer-grid">
            <div className="restaurant-menu-offer-lead">
              <h2>Offerta menù</h2>
              <p>
                La nostra proposta gastronomica vi accompagnerà sia per pranzo che
                per cena, tra un momento intimo, un incontro di lavoro o
                un’esperienza di alta cucina tra amici.
              </p>
              <p>
                I commensali possono scegliere differenti percorsi degustazione,
                da 3 a 7 portate.
              </p>
              <p>
                Così come ogni persona è diversa per esigenze e richieste, lo sarà
                anche ogni menù. Sentitevi liberi di raccontarci le vostre
                preferenze, sapremo trovare il percorso giusto da proporvi.
              </p>
              <a
                className="restaurant-menu-offer-btn"
                href="/docs/menu-winter-2025-26-sito.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Apri il PDF del menù
              </a>
            </div>

            <div className="restaurant-menu-offer-detail">
              <h3>Cucina creativa per riaccendere i sensi</h3>
              <p>
                Lo stile di Paolo Griffa è inconfondibile: cucina ironica e
                creativa, precisione e grande preparazione, si uniscono al
                desiderio di interagire e sorprendere i propri ospiti.
              </p>
              <p>
                Poi erbe, fiori, essenze e tecniche di cottura e marinatura, per
                declinare con fantasia i sapori della Valle d’Aosta in ogni
                piatto, stagione dopo stagione. Una sinfonia di sapori, forme e
                colori da cui nascono opere d’arte intrise di gusto.
              </p>
              <Link className="restaurant-menu-offer-btn ghost" to="/paolo-griffa">
                Scopri Paolo Griffa
              </Link>
            </div>
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-cantina editor-reveal">
          <div className="restaurant-cantina-copy">
            <h2>
              La Cantina,
              <br />
              un caveau a
              <br />
              prova di gusto
            </h2>
            <p>
              Disegnata da Paolo Griffa e realizzata interamente da artigiani
              valdostani in legno di rovere antico naturale, la cantina conta
              oltre 1000 etichette e 3000 bottiglie. Dalle più importanti
              denominazioni d’Italia e di Francia ad una selezione di vini
              valdostani, produttori di nicchia locali e grandi maisons
              autoctone.
            </p>
          </div>
          <div className="restaurant-cantina-media">
            <img
              src="/images/ristorante/cantina/la-cantina-1536x1024.jpg"
              alt="La cantina del Caffè Nazionale"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-cantina restaurant-cucina-futuro editor-reveal">
          <div className="restaurant-cantina-media">
            <img
              src="/images/ristorante/personale/astronave-cucina-1536x1024.jpg"
              alt="Cucina professionale del Caffè Nazionale"
              loading="lazy"
            />
          </div>
          <div className="restaurant-cantina-copy">
            <h2>
              Un’astronave?
              <br />
              No, una cucina
              <br />
              a prova di futuro
            </h2>
            <p>
              Il cuore pulsante del Caffè Nazionale. Costruita interamente su
              misura con materiali avveniristici e superfici in Neolith, è
              completamente elettrica e dotata di tecnologie 4.0 per il
              controllo da remoto e la riduzione dei consumi energetici. Lo
              spazio è strutturato per zone di preparazione, come voluto dallo
              chef, così da creare un flusso di lavoro ottimizzato ed
              efficiente.
            </p>
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-coccola editor-reveal">
          <h2>
            Ogni ora
            <br />
            vuole la sua coccola
          </h2>
          <p>
            Dall’alba fino a sera, le migliori tisane e caffè da ogni angolo del
            mondo, sapranno regalarvi sorprese di gusto assieme ad una vasta
            selezione di pasticceria. Non solo torte, cioccolati e croissants,
            ma anche specials pensati per ogni ricorrenza dell’anno, come i
            nostri panettoni.
          </p>
          <div className="restaurant-coccola-media-grid">
            <article className="gallery-card">
              <img
                src="/images/ristorante/aperitivi/coccola-1.jpg"
                alt="Selezione di coccole dolci e caffetteria"
                loading="lazy"
              />
            </article>
            <article className="gallery-card">
              <img
                src="/images/ristorante/aperitivi/coccola-3.jpg"
                alt="Dessert creativo della proposta aperitivi"
                loading="lazy"
              />
            </article>
            <article className="gallery-card">
              <img
                src="/images/ristorante/aperitivi/unnamed (1).webp"
                alt="Dettaglio di proposta dolce e beverage"
                loading="lazy"
              />
            </article>
            <article className="gallery-card">
              <img
                src="/images/ristorante/aperitivi/coccola-2-1024x1024.jpg"
                alt="Selezione pasticceria gourmet del Caffè Nazionale"
                loading="lazy"
              />
            </article>
          </div>
          <div className="restaurant-coccola-actions">
            <Link className="restaurant-menu-offer-btn" to="/pasticceria">
              Scopri la Pasticceria
            </Link>
            <Link className="restaurant-menu-offer-btn ghost" to="/shop">
              Vai allo Shop
            </Link>
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-cocktails editor-reveal">
          <div className="restaurant-cocktails-copy">
            <h2 className="cocktail-reveal">
              Cocktails
              <br />
              da far girare
              <br />
              la testa
            </h2>
            <p className="cocktail-reveal">
              Già vincitore della più alta qualifica del settore – Tre Chicchi e
              Tre tazze del Gambero Rosso – il cocktail bar del Caffè Nazionale
              offre una drink list inedita, una carte di Champagne e di bevande
              di altissima qualità oltre ad una proposta completa di Tea Time e
              Royal Tea Time.
            </p>
          </div>
          <div className="restaurant-cocktails-media cocktail-reveal">
            <img
              src="/images/ristorante/aperitivi/cocktail-signature.png"
              alt="Cocktail signature del Caffè Nazionale"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {isRestaurant && (
        <section className="restaurant-loghi editor-reveal">
          <img
            src="/images/ristorante/loghi/gambero-rosso-1.png"
            alt="Riconoscimento Tre Chicchi e Tre Tazze del Gambero Rosso"
            loading="lazy"
          />
        </section>
      )}

      {!isRestaurant && (
        <section className="brutal-grid">
          {content.blocks.map((block) => (
            <article
              className="brutal-card editorial-frame editor-reveal"
              key={block.title}
            >
              <span className="label">focus</span>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
            </article>
          ))}
        </section>
      )}

      {!isRestaurant && (
        <section className="curated-gallery">
          {content.gallery.map((photo) => (
            <article className="gallery-card editor-reveal" key={photo.image}>
              <img src={photo.image} alt={photo.alt} loading="lazy" />
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default SectionPage
