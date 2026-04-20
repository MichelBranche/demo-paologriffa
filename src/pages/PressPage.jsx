import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const categories = [
  { id: 'all', label: 'Tutti' },
  { id: 'video', label: 'Video' },
  { id: 'article', label: 'Articoli' },
  { id: 'book', label: 'Libri' },
]

const videos = [
  {
    id: 'V7oe9w2vDIE',
    type: 'video',
    date: '2026-04-18',
    dateLabel: '18 aprile 2026',
    kind: 'Video - Masterclass',
    title: 'Italian Cuisine with Chef Paolo Griffa',
    description:
      'Presentazione della masterclass \u201CThe Art of Italian Cooking\u201D con Paolo Griffa, ospite del GTCO Food and Drink Festival 2026 a Lagos.',
    source: 'GTBank',
    url: 'https://www.youtube.com/watch?v=V7oe9w2vDIE',
    views: '80.4K',
  },
  {
    id: 'nCacg0KBeDU',
    type: 'video',
    date: '2026-03-18',
    dateLabel: '18 marzo 2026',
    kind: 'Podcast - Intervista',
    title: '\u201CLa cultura sta alla base del successo\u201D - Paolo Griffa',
    description:
      'Episodio di Foodminds girato ad Aosta, in collaborazione con Fine Dining Lovers by S.Pellegrino: un ritratto approfondito del pensiero e della filosofia dello chef.',
    source: 'Foodminds - Il Sapore del Successo',
    url: 'https://www.youtube.com/watch?v=nCacg0KBeDU',
    views: '9.8K',
  },
  {
    id: 'cTxEn0SFzU4',
    type: 'video',
    date: '2024-10-27',
    dateLabel: '27 ottobre 2024',
    kind: 'Videoricetta',
    title: 'Girelle di barbabietola: lezioni di cucina artistica',
    description:
      'Un corso interamente dedicato all\u2019estetica e alla tecnica, dove Paolo Griffa compone un piatto-scrigno tra barbabietole al forno, sott\u2019aceto e stracchino alle erbe.',
    source: 'Acad\u00e8miaTV',
    url: 'https://www.youtube.com/watch?v=cTxEn0SFzU4',
    views: '1.7K',
  },
  {
    id: 'vEOJM9AWc5U',
    type: 'video',
    date: '2023-09-05',
    dateLabel: '5 settembre 2023',
    kind: 'Talk - TEDx',
    title: 'Tra geometrie culinarie e sogno',
    description:
      'TEDxCourmayeur: Paolo Griffa racconta il processo di scomposizione e ricomposizione dei piatti, tra tradizione, territorio e identit\u00e0 contemporanea.',
    source: 'TEDx Talks',
    url: 'https://www.youtube.com/watch?v=vEOJM9AWc5U',
    views: '119',
  },
  {
    id: 'gsuDvzfmEjo',
    type: 'video',
    date: '2021-01-01',
    dateLabel: '2021 (ca.)',
    kind: 'Masterclass',
    title: 'Masterclass \u201CIl men\u00f9 con Chef Paolo Griffa\u201D',
    description:
      'Alla Scuola Tessieri, una giornata intera a fianco dello chef del Petit Royal di Courmayeur, tra creazioni celebri, novit\u00e0 e la sua visione ludica della cucina.',
    source: 'Scuola Tessieri',
    url: 'https://www.youtube.com/watch?v=gsuDvzfmEjo',
    views: '21K',
  },
  {
    id: 'b_kqPRF_xYY',
    type: 'video',
    date: '2020-01-01',
    dateLabel: '2020 (ca.)',
    kind: 'Videoricetta',
    title: 'La Ratatouille di frutta dello chef Paolo Griffa',
    description:
      'Una firma dolce e giocosa: una ratatouille completamente rivisitata in chiave di frutta, tra tecnica e sorpresa visiva.',
    source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=b_kqPRF_xYY',
    views: null,
  },
  {
    id: 'TEsfmSUc0Qk',
    type: 'video',
    date: '2019-11-26',
    dateLabel: '26 novembre 2019',
    kind: 'TV - Sky',
    title: 'Paolo Griffa e i suoi giocosi piatti - Antonino Chef Academy',
    description:
      'Puntata 3: il giovane chef mostra i suoi dolci-gioco tra \u201Cpignatte\u201D di cioccolato, \u201Cbanana splash\u201D e boule de neige, firma della sua cucina ludica.',
    source: 'Antonino Chef Academy',
    url: 'https://www.youtube.com/watch?v=TEsfmSUc0Qk',
    views: '40.4K',
  },
  {
    id: 'ECi4_O8h0v8',
    type: 'video',
    date: '2019-09-20',
    dateLabel: '20 settembre 2019',
    kind: 'Collaborazione',
    title: 'Pavoni Italia - Gourmand moulds by Paolo Griffa',
    description:
      'Dalla collaborazione con Pavoni Italia nasce Gourmand: una linea di stampi in silicone pensati per antipasti, secondi e dessert firmata dallo chef.',
    source: 'Pavoni Italia',
    url: 'https://www.youtube.com/watch?v=ECi4_O8h0v8',
    views: '21K',
  },
  {
    id: 'lOEkO0xdj-A',
    type: 'video',
    date: '2018-01-01',
    dateLabel: '2018 (ca.)',
    kind: 'Videoricetta',
    title: 'Croissant sfogliati fatti in casa',
    description:
      'GialloZafferano in cucina con Paolo Griffa: i segreti della sfoglia, del burro e della lievitazione per croissant come quelli del bar.',
    source: 'GialloZafferano',
    url: 'https://www.youtube.com/watch?v=lOEkO0xdj-A',
    views: '1.5M',
  },
]

const articles = [
  {
    id: 'art-repubblica-chiostri',
    type: 'article',
    date: '2026-04-17',
    dateLabel: '17 aprile 2026',
    kind: 'Reportage',
    title: 'Mangiare in un chiostro: dieci mete da Aosta a Lecce',
    description:
      'Tra le dieci tavole scelte da Maria Luisa Basile per sospendere il tempo tra arte e gusto, il Caffè Nazionale di Paolo Griffa \u2013 con la sua cappella decagonale del 1300 \u2013 rappresenta la tappa valdostana.',
    source: 'la Repubblica \u2013 Il Gusto',
    url: 'https://www.repubblica.it/il-gusto/2026/04/17/news/mangiare_chiostro_10_posti_consigliati-425281742/',
  },
  {
    id: 'art-buonissima-torino',
    type: 'article',
    date: '2026-01-15',
    dateLabel: '2026',
    kind: 'Evento',
    title: 'Paolo Griffa ospite di Buonissima Torino',
    description:
      'Cena pop-up a quattro mani da Opera Ristorante, nell\u2019ambito della sesta edizione del festival torinese dedicato a cibo, arte e bellezza.',
    source: 'Buonissima Torino',
    url: 'https://buonissimatorino.it/Ospiti/paolo-griffa/',
  },
  {
    id: 'art-identita-golose-3anni',
    type: 'article',
    date: '2025-08-28',
    dateLabel: '28 agosto 2025',
    kind: 'Racconto',
    title: 'Il Caffè Nazionale di Aosta compie tre anni: Griffa racconta l\u2019evoluzione del suo progetto poliedrico',
    description:
      'Un\u2019intervista sulla crescita del locale, tra cucina stellata, pasticceria, cocktail bar e una brigata cresciuta attorno alla visione dello chef.',
    source: 'Identit\u00e0 Golose',
    url: 'https://www.identitagolose.it/sito/it/44/39941/dallitalia/il-caffe-nazionale-di-aosta-compie-tre-anni-griffa-racconta-levoluzione-del-suo-progetto-poliedrico.html',
  },
  {
    id: 'art-james-magazine-3anni',
    type: 'article',
    date: '2025-08-28',
    dateLabel: '28 agosto 2025',
    kind: 'Cronaca',
    title: 'Paolo Griffa, tre anni al Caffè Nazionale',
    description:
      'Erika Mantovan racconta la cena anniversario a quattro mani con Riccardo Forapani e Mattia Pastori: un menu di contrasti e armonie tra radici piemontesi e Valle d\u2019Aosta.',
    source: 'James Magazine',
    url: 'https://www.jamesmagazine.it/food/paolo-griffa-tre-anni-al-caffe-nazionale/',
  },
  {
    id: 'art-pasticceria-int-valle',
    type: 'article',
    date: '2025-07-28',
    dateLabel: '28 luglio 2025',
    kind: 'Approfondimento',
    title: 'L\u2019amore di Paolo Griffa per la Valle d\u2019Aosta',
    description:
      'Sarah Scaparone presenta \u201CNoi e la Valle\u201D, il menu che declina in tre varianti una storia d\u2019amore con il territorio: dal salmerino alpino marinato al pino fino al dessert Spiga.',
    source: 'Pasticceria Internazionale',
    url: 'https://www.pasticceriainternazionale.it/2025/07/28/lamore-di-paolo-griffa-per-la-valle-daosta/',
  },
  {
    id: 'art-italian-gourmet',
    type: 'article',
    date: '2024-10-15',
    dateLabel: '2024',
    kind: 'Profilo',
    title: 'Paolo Griffa \u2013 Chef e membro AMPI',
    description:
      'La biografia ufficiale dello chef e la presentazione di \u201CDessert al Ristorante\u201D, il suo libro pubblicato nel 2024 con Italian Gourmet.',
    source: 'Italian Gourmet',
    url: 'https://www.italiangourmet.it/protagonisti/paolo-griffa/',
  },
  {
    id: 'art-the-blender',
    type: 'article',
    date: '2024-04-24',
    dateLabel: '24 aprile 2024',
    kind: 'Intervista',
    title: 'A colazione con: Paolo Griffa',
    description:
      'Claudia Concas ascolta la sua filosofia di colazione: doppio espresso, brioche gianduia, pasticceria come rituale di condivisione con la brigata.',
    source: 'The Blender',
    url: 'https://theblendermagazine.com/article/a-colazione-con-paolo-griffa/',
  },
  {
    id: 'art-guida-michelin',
    type: 'article',
    date: '2024-03-13',
    dateLabel: '13 marzo 2024',
    kind: 'Editoriale',
    title: '\u201CLa creatività può trasformare un tronco di pino in un dessert\u201D',
    description:
      'Annalisa Cavaleri racconta la filosofia green e tecnologica del Caffè Nazionale e i piatti signature di Griffa, dal Raviolo alla mugnaia ad Al_Pino.',
    source: 'Guida MICHELIN',
    url: 'https://guide.michelin.com/it/it/notizia/dining-out/paolo-griffa-la-creativita-puo-trasformare-un-tronco-di-pino-in-un-dessert',
  },
  {
    id: 'art-aostasera',
    type: 'article',
    date: '2023-01-25',
    dateLabel: '25 gennaio 2023',
    kind: 'Podcast',
    title: 'Paolo Griffa racconta come si diventa uno chef stellato',
    description:
      'Episodio di \u201CIllumina Aosta\u201D: Griffa racconta gli anni di gavetta, il percorso fino alla Stella e la giornata tipo dietro le quinte del Caffè Nazionale.',
    source: 'AostaSera',
    url: 'https://aostasera.it/notizie/societa/paolo-griffa-racconta-come-si-diventa-uno-chef-stellato/',
  },
  {
    id: 'art-identita-golose-profilo',
    type: 'article',
    date: '2022-09-01',
    dateLabel: '2022',
    kind: 'Profilo',
    title: 'Paolo Griffa \u2013 le stimmate del predestinato',
    description:
      'Il ritratto firmato Carlo Passera: dal diploma al Giolitti alle cucine di Combal.Zero, Chateaubriand e Studio, fino alla Stella al Petit Royal e al nuovo capitolo ad Aosta.',
    source: 'Identit\u00e0 Golose \u2013 Chef e Protagonisti',
    url: 'https://www.identitagolose.it/sito/it/6/21547/chef-e-protagonisti/paolo.html',
  },
  {
    id: 'art-reporter-gourmet',
    type: 'article',
    date: '2021-11-08',
    dateLabel: '8 novembre 2021',
    kind: 'Recensione',
    title: 'La cucina visual di Paolo Griffa al Petit Royal',
    description:
      'Marco Colognese racconta l\u2019esperienza a Courmayeur, tra i menu \u201CDeclinazioni\u201D, il cannellone omaggio a Missoni e i Risi e bisi \u201Cin chiave Chagall\u201D.',
    source: 'Reporter Gourmet',
    url: 'https://reportergourmet.com/it/dove-dormire/73-perfezione-maniacale-che-coniuga-estetica-e-gusto-nei-piatti-la-cucina-visual-di-paolo-griffa-al-petit-royal',
  },
  {
    id: 'art-calendario-cibo',
    type: 'article',
    date: '2018-02-22',
    dateLabel: '22 febbraio 2018',
    kind: 'Intervista',
    title: 'Il giovane chef Paolo Griffa si racconta',
    description:
      'Lunga intervista di Anna Calabrese e Laura Bertolini: gli esordi al Piccolo Lago, i piatti-gioco come Boomb-Bolone e Boule de Neige, e la ricetta \u201COh mia bella cipollina\u201D.',
    source: 'Il calendario del cibo italiano',
    url: 'https://www.calendariodelciboitaliano.it/2018/02/22/chef-paolo-griffa/',
  },
  {
    id: 'art-ricette-in-tv',
    type: 'article',
    date: '2015-10-26',
    dateLabel: '2015 \u2013 2019',
    kind: 'Archivio TV',
    title: 'Tutte le ricette di Paolo Griffa a \u201CDetto Fatto\u201D',
    description:
      'La raccolta delle ricette portate in televisione da Paolo Griffa come tutor del programma di Rai 2: dal \u201CBoomb-Bolone\u201D al minestrone in crosta.',
    source: 'Ricette in TV',
    url: 'https://www.ricetteintv.com/tag/ricetta-paolo-griffa-di-oggi/',
  },
  {
    id: 'art-ambasciatori-gusto',
    type: 'article',
    date: '2017-11-01',
    dateLabel: '2017',
    kind: 'Profilo',
    title: 'Paolo Griffa \u2013 Ambasciatore del Gusto',
    description:
      'Profilo ufficiale dello chef all\u2019interno dell\u2019Associazione Italiana Ambasciatori del Gusto: tappe formative, viaggi, premi e la filosofia del long life learning.',
    source: 'Ambasciatori del Gusto',
    url: 'https://ambasciatoridelgusto.it/portfolio/paolo-griffa/',
  },
  {
    id: 'art-san-pellegrino',
    type: 'article',
    date: '2015-06-01',
    dateLabel: '2015',
    kind: 'Intervista',
    title: 'Paolo Griffa, vincitore S.Pellegrino Young Chef Italia 2015',
    description:
      'L\u2019intervista al vincitore della selezione italiana del contest S.Pellegrino Young Chef: la cucina come racconto e la visione contemporanea dell\u2019Italia del gusto.',
    source: 'Sanpellegrino',
    url: 'https://www.sanpellegrino.com/it/news/intervista-paolo-griffa-vincitore-young-chef-italia-2015-4303',
  },
]

const books = [
  {
    id: 'book-dessert-al-ristorante',
    type: 'book',
    date: '2024-06-17',
    dateLabel: '17 giugno 2024',
    kind: 'Libro \u2013 Italian Gourmet',
    title: 'Dessert al ristorante',
    subtitle: 'Tecniche, strumenti e ricette di un pastry chef',
    description:
      '240 pagine in cui Paolo Griffa traccia la differenza tra dolce e dessert: tecniche, ingredienti, strumenti e trenta ricette \u00e0 la carte divise in Interazioni, Full Immersion, Trompe-l\u2019oeil, Architetture e Virtuosismi.',
    source: 'Italian Gourmet',
    url: 'https://www.amazon.it/Dessert-ristorante-Tecniche-strumenti-ricette/dp/8832143739',
  },
  {
    id: 'book-cioccolami-le',
    type: 'book',
    date: '2020-11-01',
    dateLabel: '1 novembre 2020',
    kind: 'Libro \u2013 Limited Edition',
    title: 'Cioccolami',
    subtitle: 'Limited Edition \u2013 con tovagliette firmate Il Grembiale',
    description:
      'Un prezioso ricettario di prelibatezze al cioccolato, accompagnato da un set di tovagliette coordinato. Edizione speciale per condividere pomeriggi golosi in compagnia.',
    source: 'Trenta Editore',
    url: 'https://www.amazon.it/Cioccolami-Prodotti-vari-Paolo-Griffa/dp/8899528632',
  },
  {
    id: 'book-petit-royal',
    type: 'book',
    date: '2019-12-31',
    dateLabel: '31 dicembre 2019',
    kind: 'Libro \u2013 Ediz. a colori',
    title: 'Petit Royal',
    subtitle: 'Edizione illustrata \u2013 288 pagine',
    description:
      'Il racconto per immagini dell\u2019esperienza al Petit Royal di Courmayeur: ricette, piatti-signature e la cornice del Grand Hotel Royal e Golf ai piedi del Monte Bianco.',
    source: 'Tipografia Valdostana',
    url: 'https://www.amazon.it/Petit-Royal-Ediz-illustrata-Griffa/dp/8897765785',
  },
  {
    id: 'book-cioccolami-2018',
    type: 'book',
    date: '2018-11-22',
    dateLabel: '22 novembre 2018',
    kind: 'Libro',
    title: 'Cioccolami',
    subtitle: 'Cioccolatini per sedurre',
    description:
      'Il primo volume Trenta Editore dedicato al cioccolato: 112 pagine di cioccolatini, praline e abbinamenti pensati come piccole seduzioni golose.',
    source: 'Trenta Editore',
    url: 'https://www.amazon.it/Cioccolami-Paolo-Griffa/dp/889952839X',
  },
]

const typePriority = {
  video: 0,
  article: 1,
  book: 1,
}

const contents = [...videos, ...articles, ...books].sort((a, b) => {
  const priorityDiff = typePriority[a.type] - typePriority[b.type]
  if (priorityDiff !== 0) return priorityDiff
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

function PressPage() {
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

    const heroItems = document.querySelectorAll('.press-hero .press-reveal')
    gsap.set(heroItems, { opacity: 0, y: 40 })
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.1,
    })

    const filterChips = document.querySelectorAll('.press-filter-chip')
    gsap.set(filterChips, { opacity: 0, y: 20 })
    gsap.to(filterChips, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.4,
    })

    const cards = gsap.utils.toArray('.press-card')
    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 60, scale: 0.97 })
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: (index % 3) * 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        },
      })

      const img = card.querySelector('img')
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleFilter = (id) => {
    const chips = document.querySelectorAll('.press-filter-chip')
    chips.forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.filter === id)
    })
    const cards = document.querySelectorAll('.press-card')
    cards.forEach((card) => {
      const match = id === 'all' || card.dataset.type === id
      card.classList.toggle('is-hidden', !match)
    })
  }

  return (
    <main className="page-shell press-page">
      <section className="press-hero">
        <span className="label press-reveal">Rassegna</span>
        <h1 className="press-reveal">
          Paolo Griffa in scena: televisione, stampa, libri ed eventi
        </h1>
        <p className="press-reveal">
          Una raccolta curata dei contenuti a cui ha partecipato Paolo Griffa:
          programmi televisivi, interviste, copertine, libri e grandi eventi
          del mondo gastronomico.
        </p>
      </section>

      <section className="press-filters" aria-label="Filtra per categoria">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`press-filter-chip${
              category.id === 'all' ? ' is-active' : ''
            }`}
            data-filter={category.id}
            onClick={() => handleFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </section>

      <section className="press-grid">
        {contents.map((item) => {
          const isVideo = item.type === 'video'

          return (
            <a
              key={item.id}
              className="press-card"
              data-type={item.type}
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {isVideo && (
                <figure className="press-card-media">
                  <img
                    src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                    alt={item.title}
                    loading="lazy"
                  />
                  {item.views && (
                    <span
                      className="press-card-views"
                      aria-label={`${item.views} visualizzazioni`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="11"
                        height="11"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 5C7 5 2.7 8.1 1 12c1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                          fill="currentColor"
                        />
                      </svg>
                      {item.views}
                    </span>
                  )}
                  <span className="press-card-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                </figure>
              )}

              <div className="press-card-body">
                <div className="press-card-meta">
                  <span className="label">{item.kind}</span>
                  <span className="press-card-year">{item.dateLabel}</span>
                </div>
                <h3>{item.title}</h3>
                {item.subtitle && (
                  <p className="press-card-subtitle">{item.subtitle}</p>
                )}
                <p>{item.description}</p>
                <span className="press-card-source">{item.source}</span>
              </div>
            </a>
          )
        })}
      </section>
    </main>
  )
}

export default PressPage
