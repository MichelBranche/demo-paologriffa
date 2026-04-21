import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    title: 'Dalla semplicità, nascono grandi idee di gusto',
    description: [
      'Creare un dolce è una magica e ragionata alchimia, un delicato rapporto tra gli ingredienti, che permette ai sapori di avventurarsi verso territori inaspettati.',
      "Magia e scienza si mescolano alla voglia di giocare di Paolo Griffa, tecnica e divertimento al servizio dell'arte pasticcera. Al Caffè Nazionale potrete gustare i nostri dolci nel dehors, ma anche portarli a casa o regalarli, ordinandoli dal nostro negozio con consegne in tutto il mondo.",
    ],
    image: '/images/pasticceria/dolci/solo-per-voi-2-1536x1020.jpg',
    alt: 'Monoporzioni Solo per voi',
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
        image: '/images/pasticceria/dolci/semplicta-2.jpg',
        alt: 'Creazioni pasticceria Semplicità',
      },
      {
        image: '/images/pasticceria/dolci/semplicita-1-1536x1025.jpg',
        alt: 'Dessert di pasticceria contemporanea',
      },
      {
        image: '/images/pasticceria/dolci/semplicita-3-1536x1025.jpg',
        alt: 'Dolci di pasticceria contemporanea',
      },
    ],
    dolceAmore: {
      titleLine1: 'Un dolce amore',
      titleLine2: 'non si scorda mai',
      body: 'Paolo Griffa ha iniziato la sua carriera nel mondo della cucina proprio dai dolci. Ne conosce le regole e come scomporle per innovare. La sua è una ricerca costante di tecnica, bontà e creatività, con una grande attenzione per i dettagli. Così si instaura un intreccio di contaminazioni che innalzano le sue creazioni, una matematica costanza, condita con un pizzico di voglia di giocare, tipica di chi guarda al mondo con meraviglia.',
      image: '/images/pasticceria/griffa/dolce-amore.jpg',
      imageAlt: 'Creazioni dolci di Paolo Griffa',
    },
    herMajestyCake: {
      title: 'Her Majesty: The Cake',
      paragraphs: [
        'Una torta è sempre una torta, ma a volte può essere davvero altro.',
        "Un dolce classico che reinterpretiamo ogni volta per mantenere tutte quelle sensazioni che ci riportano ad essere bambini e poi stupirci con note inaspettate che non sapremmo codificare. Un misto di conosciuto e voglia di scoprire da portare a casa e condividere con chi amiamo. D'altronde i dolci sono un gesto d'amore, un monumento alle ricorrenze importanti da celebrare.",
      ],
      image: '/images/pasticceria/dolci/torta-cioccolato.jpg',
      imageAlt: 'Torta al cioccolato',
    },
    playfulDessert: {
      title: 'Non si gioca col cibo, tranne che da noi',
      body: "Ce lo dicono fin da piccoli. Ma ora siamo cresciuti e non vediamo l'ora di vedervi sfidare a casa o nel nostro dehors, con un dolce realizzato in collaborazione con i grandi artigiani della Valle d'Aosta. Qualcuno chiede il Bis, noi serviamo il Tris, una sfida ludica ed una ancor più grande alle regole della tavola e della pasticceria, per provare un nuovo modo di concepire il dolce in compagnia. Un manufatto creato con amore e tutta la voglia di sperimentare una cucina ludica di cui Paolo Griffa è da sempre portabandiera.",
      image: '/images/pasticceria/stuff/xoxo-2046x2048.png',
      imageAlt: 'Dolce e gioco: collaborazione con artigiani valdostani',
      afterImageTitle:
        'Quando il gioco si fa duro, i duri cominciano a mangiare',
      trisSlides: [
        {
          id: 'tris-1',
          label: 'Passo 1',
          body: 'Aprite la confezione e scegliete le vostre pedine. Disponetele su un tavolo. Resistete all’impulso di mangiarle.',
          image: '/images/pasticceria/dolci/paolo-griffa-tris-1.jpg',
          alt: 'Tris Paolo Griffa: pedine e confezione',
        },
        {
          id: 'tris-2',
          label: 'Passo 2',
          body: 'A turno tentate di creare una fila di tre “X” o di “O” in orizzontale, verticale e diagonale. Resistete e continuate a non mangiarle.',
          image: '/images/pasticceria/dolci/paolo-griffa-tris-2.jpg',
          alt: 'Tris Paolo Griffa: gioco in corso',
        },
        {
          id: 'tris-3',
          label: 'Passo 3',
          body: 'Chi vince facendo “Tris”, potrà godere dell’agognata vittoria e mangiare per primo. Chi perde dovrà ancora attendere per mangiare.',
          image: '/images/pasticceria/dolci/paolo-griffa-tris-3.jpg',
          alt: 'Tris Paolo Griffa: vittoria',
        },
      ],
    },
    monoporzioniShowcase: {
      title: 'Monoporzioni, piccole fuori, giganti nel gusto',
      paragraphs: [
        'Tutto il sapore di un dolce di alta pasticceria in un formato così piccolo da essere portato ovunque. Una monoporzione è come un raro gioiello, perfetto nel suo insieme e contenuto in uno scrigno facile da trasportare. Al Caffè Nazionale ne creiamo sempre di diversi, seguendo la voglia di sperimentare dello chef.',
        'Così ogni giorno si può scoprire qualcosa di nuovo e lasciarsi stupire dai multigusti delle nostre monoporzioni.',
      ],
      image: '/images/pasticceria/pasticcini/collage-prodotti-scaled.jpg',
      imageAlt: 'Collage monoporzioni e prodotti della pasticceria',
    },
    cioccolatiniShowcase: {
      title: 'Cioccolatini, piccole pillole di felicità',
      body: 'Il cioccolatino è la forma più piccola di piacere che possa esistere. Un mondo in miniatura attorno al quale orbitano galassie di gusti differenti. Un cioccolatino può alleviare il peso di una giornata pesante, donare felicità agli amici o far sbocciare un amore. Per qualunque occasione abbiamo la giusta pillola, una serie di gusti appositamente studiati per curare ogni stato d’animo e arrivare al cuore, oltre che al palato, senza bisogno di alcuna prescrizione.',
    },
    chocolateLetter: {
      title: 'Una lettera d’amore, al cioccolato',
      paragraphs: [
        'Tutti amano qualcuno e tutti amano la cioccolata. Per celebrare questo assunto abbiamo trasformato le nostre barrette in lettere da personalizzare e donare.',
        'Sei varianti, provenienti da ogni angolo del globo, ognuna con proprie qualità organolettiche, arricchite dall’arte pasticcera dello chef.',
        'Per provarle tutte, abbiamo creato uno scrigno multiorigine, così da scoprire ogni più piccola sfumatura di un dolce da riscoprire e reinventare.',
        'From us, from you, to all…with chocolove.',
      ],
      gallery: [
        {
          image: '/images/pasticceria/cioccolato/barra-cioccolato.jpg',
          alt: 'Barretta di cioccolato',
        },
        {
          image: '/images/pasticceria/stuff/lettera-varias.jpg',
          alt: 'Lettere di cioccolato, varianti',
        },
        {
          image: '/images/pasticceria/stuff/lettera-singola.jpg',
          alt: 'Lettera di cioccolato singola',
        },
      ],
    },
    soloPerVoiDaily: {
      title: 'Preparati ogni giorno solo per voi',
      body: 'Ogni mattina selezioniamo i migliori ingredienti, come il burro e la frutta più fresca, per sfornare dolci creazioni preparate sul momento. I prodotti del forno lievitano tutta la notte, per essere non solo più buoni ma anche digeribili. Seguiamo il ciclo della natura e il meglio che offrono le stagioni e sperimentiamo sempre nuovi gusti e forme particolari. Così nascono i nostri Specials che affianchiamo ai grandi classici.',
      gallery: [
        {
          image: '/images/pasticceria/pasticcini/solo-per-voi-1.jpg',
          alt: 'Creazioni Solo per voi',
        },
        {
          image: '/images/pasticceria/dolci/coccola-1.jpg',
          alt: 'Dolci da forno Coccola',
        },
        {
          image: '/images/pasticceria/pasticcini/solo-per-voi-3.jpg',
          alt: 'Selezione Solo per voi',
        },
      ],
      gamberoBadge: {
        image: '/images/pasticceria/logo/gambero-rosso-2.png',
        alt: 'Riconoscimento Gambero Rosso',
      },
    },
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
  const showHeroShopCta = !isRestaurant && section !== 'shop'
  const lenisRef = useRef(null)
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

  const refreshScrollMetrics = useCallback(() => {
    requestAnimationFrame(() => {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    })
  }, [])

  useEffect(() => {
    if (section !== 'pastry') return undefined
    const id = window.setTimeout(refreshScrollMetrics, 400)
    return () => window.clearTimeout(id)
  }, [section, refreshScrollMetrics])

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
    lenisRef.current = lenis

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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (section === 'pastry' && !prefersReducedMotion) {
      gsap.utils.toArray('[data-pastry-animate]').forEach((block) => {
        const targets = block.querySelectorAll('.pastry-reveal')
        if (!targets.length) return
        gsap.fromTo(
          targets,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.88,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: block,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    } else if (section === 'pastry' && prefersReducedMotion) {
      gsap.set('.pastry-reveal', { clearProps: 'all' })
    }

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

    const trisSection = document.querySelector('.pastry-tris-horizontal')
    const trisItems = trisSection
      ? gsap.utils.toArray(trisSection.querySelectorAll('.horizontal-item'))
      : []
    const isDesktopWidth = window.innerWidth > 768
    const canUseTrisHorizontal =
      isDesktopWidth && trisSection && trisItems.length > 1
    const trisScrollTween = canUseTrisHorizontal
      ? gsap.to(trisItems, {
          xPercent: -100 * (trisItems.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: trisSection,
            pin: true,
            scrub: 1,
            snap: 1 / (trisItems.length - 1),
            end: () => `+=${trisSection.offsetWidth * 1.5}`,
          },
        })
      : null

    if (trisScrollTween) {
      gsap.utils.toArray('.pastry-tris-horizontal .parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { objectPosition: '0% 50%' },
          {
            objectPosition: '100% 50%',
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: trisScrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    } else if (trisItems.length && isDesktopWidth) {
      gsap.utils.toArray('.pastry-tris-horizontal .parallax-img').forEach((img) => {
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

    trisItems.forEach((item, index) => {
      const revealTargets = item.querySelectorAll('.slide-reveal')
      const tl = gsap.timeline({ paused: true })
      tl.to(revealTargets, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
      })

      if (trisScrollTween) {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: trisScrollTween,
          start: 'left center+=160',
          end: 'right center-=80',
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(0),
        })
      } else if (isDesktopWidth) {
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

    ScrollTrigger.refresh()

    if (section === 'pastry') {
      lenis.resize()
    }

    const ctaArrowTweens = []
    const startCtaArrowLoops = () => {
      gsap.utils.toArray('.cta-bounce-arrow').forEach((el) => {
        gsap.set(el, { x: 0 })
        ctaArrowTweens.push(
          gsap.to(el, {
            x: 7,
            duration: 0.85,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            overwrite: 'auto',
          }),
        )
      })
    }

    const ctaArrowsTimer = window.setTimeout(startCtaArrowLoops, 0)

    return () => {
      window.clearTimeout(ctaArrowsTimer)
      window.removeEventListener('scroll', onScroll)
      ctaArrowTweens.forEach((tw) => tw.kill())
      lenisRef.current = null
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
              {Array.isArray(content.description) ? (
                content.description.map((paragraph, index) => (
                  <p key={index} className="editor-reveal">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="editor-reveal">{content.description}</p>
              )}
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
            {showHeroShopCta && (
              <Link className="page-hero-shop-cta" to="/shop">
                <span className="page-hero-shop-cta-label">Shop</span>
                <span className="page-hero-shop-arrow cta-bounce-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.65"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12H19M14 7l5 5-5 5"
                    />
                  </svg>
                </span>
              </Link>
            )}
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

      {section === 'pastry' && content.dolceAmore && (
        <section
          className="pastry-dolce-amore editorial-frame"
          data-pastry-animate
        >
          <div className="pastry-dolce-amore-copy">
            <h2 className="pastry-dolce-amore-title pastry-reveal">
              {content.dolceAmore.titleLine1}
              <br />
              {content.dolceAmore.titleLine2}
            </h2>
            <p className="pastry-reveal">{content.dolceAmore.body}</p>
            <Link className="pastry-dolce-amore-cta pastry-reveal" to="/paolo-griffa">
              <span className="pastry-dolce-amore-cta-label">Paolo Griffa</span>
              <span className="pastry-dolce-amore-arrow cta-bounce-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12H19M14 7l5 5-5 5"
                  />
                </svg>
              </span>
            </Link>
          </div>
          <div className="pastry-dolce-amore-media pastry-reveal">
            <img
              src={content.dolceAmore.image}
              alt={content.dolceAmore.imageAlt}
              loading="lazy"
            />
          </div>
        </section>
      )}

      {section === 'pastry' && content.herMajestyCake && (
        <section className="pastry-her-majesty editorial-frame" data-pastry-animate>
          <div className="pastry-her-majesty-copy">
            <h2 className="pastry-her-majesty-title pastry-reveal">{content.herMajestyCake.title}</h2>
            {content.herMajestyCake.paragraphs.map((paragraph, index) => (
              <p key={index} className="pastry-reveal">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="pastry-her-majesty-media pastry-reveal">
            <img
              src={content.herMajestyCake.image}
              alt={content.herMajestyCake.imageAlt}
              loading="lazy"
            />
          </div>
        </section>
      )}

      {section === 'pastry' && content.playfulDessert && (
        <section className="pastry-playful-dessert editorial-frame" data-pastry-animate>
          <div className="pastry-playful-dessert-copy">
            <h2 className="pastry-playful-dessert-title pastry-reveal">{content.playfulDessert.title}</h2>
            <p className="pastry-reveal">{content.playfulDessert.body}</p>
          </div>
          <div className="pastry-playful-dessert-media pastry-reveal">
            <img
              src={content.playfulDessert.image}
              alt={content.playfulDessert.imageAlt}
              loading="lazy"
            />
          </div>
          {content.playfulDessert.afterImageTitle && (
            <h3 className="pastry-playful-dessert-tagline pastry-reveal">
              {content.playfulDessert.afterImageTitle}
            </h3>
          )}
        </section>
      )}

      {section === 'pastry' &&
        content.playfulDessert?.trisSlides &&
        content.playfulDessert.trisSlides.length > 0 && (
          <section
            className="pastry-tris-horizontal horizontal-section"
            aria-label="Istruzioni per il Tris dolce"
          >
            <div
              className="horizontal-container"
              style={{ '--slide-count': content.playfulDessert.trisSlides.length }}
            >
              {content.playfulDessert.trisSlides.map((slide) => (
                <article className="horizontal-item" key={slide.id} id={slide.id}>
                  <div className="item-grid">
                    <div className="item-text">
                      <span className="label slide-reveal">{slide.label}</span>
                      <p className="slide-reveal pastry-tris-slide-body">{slide.body}</p>
                    </div>
                    <div className="item-img">
                      <img
                        className="parallax-img"
                        src={slide.image}
                        alt={slide.alt}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      {section === 'pastry' && content.monoporzioniShowcase && (
        <section className="pastry-monoporzioni editorial-frame" data-pastry-animate>
          <div className="pastry-monoporzioni-copy">
            <h2 className="pastry-monoporzioni-title pastry-reveal">{content.monoporzioniShowcase.title}</h2>
            {content.monoporzioniShowcase.paragraphs.map((paragraph, index) => (
              <p key={index} className="pastry-reveal">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="pastry-monoporzioni-hero pastry-reveal">
            <img
              src={content.monoporzioniShowcase.image}
              alt={content.monoporzioniShowcase.imageAlt}
              loading="lazy"
              onLoad={refreshScrollMetrics}
            />
          </div>
        </section>
      )}

      {section === 'pastry' && content.cioccolatiniShowcase && (
        <section className="pastry-cioccolatini editorial-frame" data-pastry-animate>
          <div className="pastry-cioccolatini-copy">
            <h2 className="pastry-cioccolatini-title pastry-reveal">{content.cioccolatiniShowcase.title}</h2>
            <p className="pastry-reveal">{content.cioccolatiniShowcase.body}</p>
          </div>
        </section>
      )}

      {section === 'pastry' && content.chocolateLetter && (
        <section className="pastry-chocolate-letter editorial-frame" data-pastry-animate>
          <div className="pastry-chocolate-letter-copy">
            <h2 className="pastry-chocolate-letter-title pastry-reveal">{content.chocolateLetter.title}</h2>
            {content.chocolateLetter.paragraphs.map((paragraph, index) => (
              <p key={index} className="pastry-reveal">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="pastry-chocolate-letter-gallery">
            {content.chocolateLetter.gallery.map((photo) => (
              <figure className="pastry-chocolate-letter-figure pastry-reveal" key={photo.image}>
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  onLoad={refreshScrollMetrics}
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {section === 'pastry' && content.soloPerVoiDaily && (
        <section className="pastry-solo-per-voi editorial-frame" data-pastry-animate>
          <div className="pastry-solo-per-voi-copy">
            <h2 className="pastry-solo-per-voi-title pastry-reveal">{content.soloPerVoiDaily.title}</h2>
            <p className="pastry-reveal">{content.soloPerVoiDaily.body}</p>
          </div>
          <div className="pastry-solo-per-voi-gallery">
            {content.soloPerVoiDaily.gallery.map((photo) => (
              <figure className="pastry-solo-per-voi-figure pastry-reveal" key={photo.image}>
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  onLoad={refreshScrollMetrics}
                />
              </figure>
            ))}
          </div>
          {content.soloPerVoiDaily.gamberoBadge && (
            <div className="pastry-solo-per-voi-badge pastry-reveal">
              <img
                src={content.soloPerVoiDaily.gamberoBadge.image}
                alt={content.soloPerVoiDaily.gamberoBadge.alt}
                loading="lazy"
                onLoad={refreshScrollMetrics}
              />
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default SectionPage
