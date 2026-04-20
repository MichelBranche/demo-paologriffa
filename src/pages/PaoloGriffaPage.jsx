import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

const gourmetSlides = [
  {
    id: 'gourmet-1',
    label: 'Percorso degustazione',
    title: 'Dettaglio, gioco, sorpresa',
    description:
      'Ogni piatto bilancia tecnica e istinto: precisione, ironia e memoria si incontrano in una narrazione sensoriale contemporanea.',
    image: '/images/paolo-griffa/piatti gourmet/plato-1.jpg',
    alt: 'Piatto gourmet 1',
  },
  {
    id: 'gourmet-2',
    label: 'Ricerca materie prime',
    title: 'Stagionalita e identita',
    description:
      'La selezione delle materie prime segue il ritmo della valle: equilibrio dei sapori, leggerezza e profondita in ogni servizio.',
    image: '/images/paolo-griffa/piatti gourmet/plato-2.jpg',
    alt: 'Piatto gourmet 2',
  },
  {
    id: 'gourmet-3',
    label: 'Esperienza al tavolo',
    title: 'Una cucina che emoziona',
    description:
      "Creativita e parte ludica lavorano all'unisono per trasformare la cena in una sequenza di sorprese memorabili.",
    image: '/images/paolo-griffa/piatti gourmet/plato-3.jpg',
    alt: 'Piatto gourmet 3',
  },
]

function PaoloGriffaPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.3,
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

    const heroSection = document.querySelector('.paolo-v2-hero')
    const heroMediaImg = document.querySelector('.paolo-v2-media img')
    const heroItems = document.querySelectorAll('.paolo-hero-anim')

    if (heroSection) {
      if (heroMediaImg) {
        gsap.set(heroMediaImg, { scale: 1.18, opacity: 0 })
      }
      gsap.set(heroItems, { opacity: 0, y: 40 })
      const heroLabel = heroSection.querySelector('.label.paolo-hero-anim')
      if (heroLabel) {
        gsap.set(heroLabel, { letterSpacing: '0.4em' })
      }

      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      })

      if (heroMediaImg) {
        heroTl.to(heroMediaImg, {
          opacity: 1,
          scale: 1,
          duration: 1.6,
        })
      }

      if (heroLabel) {
        heroTl.to(
          heroLabel,
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.22em',
            duration: 1,
          },
          '-=1.1',
        )
      }

      const heroOthers = heroSection.querySelectorAll(
        '.paolo-hero-anim:not(.label)',
      )
      heroTl.to(
        heroOthers,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
        },
        '-=0.7',
      )

      if (heroMediaImg) {
        gsap.to(heroMediaImg, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    gsap.utils.toArray('.paolo-v2-reveal').forEach((node, index) => {
      gsap.to(node, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.06,
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
        },
      })
    })

    const gourmetSection = document.querySelector('.gourmet-scroll')
    const gourmetItems = gsap.utils.toArray('.gourmet-slide')

    if (gourmetSection && gourmetItems.length > 0 && window.innerWidth > 768) {
      const gourmetTween = gsap.to(gourmetItems, {
        xPercent: -100 * (gourmetItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: gourmetSection,
          pin: true,
          scrub: true,
          end: () => `+=${gourmetSection.offsetWidth * (gourmetItems.length - 1)}`,
          invalidateOnRefresh: true,
        },
      })

      gourmetItems.forEach((item, index) => {
        const textTargets = item.querySelectorAll('.gourmet-text > *')
        const imageTarget = item.querySelector('.gourmet-image')

        gsap.set(textTargets, { opacity: 0, y: 40 })
        gsap.set(imageTarget, { opacity: 0, scale: 1.08 })

        const tl = gsap.timeline({ paused: true })
        tl.to(textTargets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        }).to(
          imageTarget,
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
          },
          0.15,
        )

        if (index === 0) {
          tl.play(0)
        } else {
          ScrollTrigger.create({
            trigger: item,
            containerAnimation: gourmetTween,
            start: 'left center',
            onEnter: () => tl.play(),
            onEnterBack: () => tl.play(),
            onLeaveBack: () => tl.pause(0),
          })
        }
      })
    }

    const greenSection = document.querySelector('.paolo-v2-green')
    const greenCopy = document.querySelector('.paolo-v2-green-copy')
    const greenCards = document.querySelectorAll('.paolo-v2-green-grid .gallery-card')

    if (greenSection && greenCopy) {
      const greenLabel = greenCopy.querySelector('.label')
      const greenTitle = greenCopy.querySelector('h2')
      const greenParagraph = greenCopy.querySelector('p')

      gsap.set(greenLabel, { opacity: 0, y: 30, letterSpacing: '0.4em' })
      gsap.set(greenTitle, { opacity: 0, y: 40 })
      gsap.set(greenParagraph, { opacity: 0, y: 30 })
      gsap.set(greenCards, { opacity: 0, y: 60, scale: 0.96 })

      const greenTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: greenSection,
          start: 'top 75%',
        },
      })

      greenTl
        .to(greenLabel, {
          opacity: 1,
          y: 0,
          letterSpacing: '0.22em',
          duration: 0.9,
        })
        .to(
          greenTitle,
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.55',
        )
        .to(
          greenParagraph,
          { opacity: 1, y: 0, duration: 1 },
          '-=0.7',
        )
        .to(
          greenCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.14,
          },
          '-=0.5',
        )

      greenCards.forEach((card, index) => {
        const img = card.querySelector('img')
        if (!img) return
        const direction = index % 2 === 0 ? -6 : 6
        gsap.fromTo(
          img,
          { yPercent: direction },
          {
            yPercent: -direction,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }

    const valleSection = document.querySelector('.paolo-valle')
    const valleCopy = document.querySelector('.paolo-valle-copy')
    const valleVideo = document.querySelector('.paolo-valle-bg')

    if (valleSection && valleCopy) {
      const valleLabel = valleCopy.querySelector('.label')
      const valleTitle = valleCopy.querySelector('h2')
      const valleParagraphs = valleCopy.querySelectorAll('p')

      gsap.set(valleLabel, { opacity: 0, y: 30, letterSpacing: '0.4em' })
      gsap.set(valleTitle, { opacity: 0, y: 40 })
      gsap.set(valleParagraphs, { opacity: 0, y: 30 })

      const valleTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: valleSection,
          start: 'top 70%',
        },
      })

      valleTl
        .to(valleLabel, {
          opacity: 1,
          y: 0,
          letterSpacing: '0.22em',
          duration: 0.9,
        })
        .to(
          valleTitle,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          '-=0.55',
        )
        .to(
          valleParagraphs,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
          },
          '-=0.7',
        )

      if (valleVideo) {
        gsap.to(valleVideo, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: valleSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }

    const brigataSection = document.querySelector('.paolo-brigata')
    const brigataImage = document.querySelector('.paolo-brigata-media img')
    const brigataQuote = document.querySelector('.paolo-brigata-quote')

    if (brigataSection && brigataImage && brigataQuote) {
      gsap.set(brigataImage, { scale: 1.2, opacity: 0 })
      gsap.set(brigataQuote, { opacity: 0, y: 30 })

      gsap.to(brigataImage, {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: brigataSection,
          start: 'top 80%',
        },
      })

      gsap.to(brigataQuote, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.35,
        scrollTrigger: {
          trigger: brigataSection,
          start: 'top 80%',
        },
      })

      gsap.to(brigataImage, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: brigataSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="page-shell paolo-v2">
      <section className="paolo-v2-hero">
        <div className="paolo-v2-copy">
          <span className="label paolo-hero-anim">Paolo Griffa</span>
          <h1 className="paolo-hero-anim">
            Una nuova casa per Paolo Griffa e il suo team
          </h1>
          <p className="paolo-hero-anim">
            Il Caffe Nazionale e un laboratorio dove sperimentare una forma di
            accoglienza completa e totalizzante. Un grande sogno nel cuore
            della Valle d&apos;Aosta, guidato da passione, tecnologia e cultura
            del servizio.
          </p>
          <div className="paolo-v2-stats">
            <span className="paolo-hero-anim">Chef e direzione creativa</span>
            <span className="paolo-hero-anim">1 Stella Michelin</span>
            <span className="paolo-hero-anim">Aosta, Piazza Emile Chanoux 9</span>
          </div>
          <div className="paolo-v2-cta paolo-hero-anim">
            <Link to="/ristorante">Scopri il ristorante</Link>
            <Link to="/shop">Prenota o acquista</Link>
          </div>
        </div>
        <div className="paolo-v2-media">
          <img
            src="/images/paolo-griffa/icone-e-hero/paolo-griffa-hero.jpg"
            alt="Ritratto di Paolo Griffa"
          />
        </div>
      </section>

      <section className="editorial-manifesto paolo-v2-reveal">
        <blockquote className="paolo-quote" cite="https://paologriffa.com/paolo-griffa/">
          <p>
            “Sono Piemontese, viaggiatore, amante del design e del mangiare
            bene. Cerco di infondere gusto e bonta in una narrazione dove
            ricordi, tenerezza e umorismo creano storie ricche di sorprese.”
          </p>
          <footer>
            <cite>Paolo Griffa</cite>
          </footer>
        </blockquote>
      </section>

      <section className="paolo-ludica-section paolo-v2-reveal">
        <span className="label">Alta cucina ludica</span>
        <h2>Alta cucina ludica, su questo non si scherza</h2>
        <p>
          La cucina di Paolo Griffa e un insieme di attenzione ai dettagli,
          creativita e gioco.
        </p>
        <p>
          Cosi si ritorna bambini; come in un&apos;epifania giungono alla
          memoria ricordi incontrollabili misti a sensazioni indescrivibili. La
          cura e lo studio delle materie prime, la ricerca dell&apos;equilibrio
          e la parte ludica e creativa, giocano all&apos;unisono per creare una
          nuova e folgorante esperienza dei sensi.
        </p>
        <p>
          Da Paolo Griffa Al Caffe Nazionale le sorprese vi aspettano.
        </p>
      </section>

      <section className="gourmet-scroll">
        <div className="gourmet-track">
          {gourmetSlides.map((slide) => (
            <article className="gourmet-slide" key={slide.id}>
              <div className="gourmet-content">
                <div className="gourmet-text">
                  <span className="label">{slide.label}</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
                <div className="gourmet-image">
                  <img src={slide.image} alt={slide.alt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="paolo-v2-green">
        <div className="paolo-v2-green-copy">
          <span className="label">Sostenibilita</span>
          <h2>Il &ldquo;Green&rdquo; qui ha radici profonde</h2>
          <p>
            Per noi &ldquo;sostenibilita&rdquo; e &ldquo;Green&rdquo; non sono
            solo parole. Fanno parte del nostro background territoriale e
            mentale; d&apos;altronde ci troviamo in una zona dove l&apos;ambiente
            e tutelato ed offre qualsiasi tipologia merceologica a chilometro
            zero. Utilizziamo fornitori certificati che operano nella
            &ldquo;Valle&rdquo; e lo stesso vale per le carni, i vini e i
            formaggi. Raccogliamo erbe, verdure e fiori da alcune delle zone
            piu incontaminate delle montagne, favorendo la conoscenza dei suoi
            meravigliosi prodotti, sempre meno utilizzati. Per noi
            sostenibilita e cultura, radici familiari e un intrinseco ed
            armonioso rapporto quotidiano col territorio e chi lo abita.
          </p>
        </div>
        <div className="paolo-v2-green-grid">
          <article className="gallery-card">
            <img src="/images/paolo-griffa/paolo in giardino/green-1.jpg" alt="Paolo Griffa in giardino 1" />
          </article>
          <article className="gallery-card">
            <img src="/images/paolo-griffa/paolo in giardino/green2.jpg" alt="Paolo Griffa in giardino 2" />
          </article>
          <article className="gallery-card">
            <img src="/images/paolo-griffa/paolo in giardino/green-3.jpg" alt="Paolo Griffa in giardino 3" />
          </article>
        </div>
      </section>

      <section className="paolo-valle">
        <video
          className="paolo-valle-bg"
          src="/videos/paolo-valle.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="paolo-valle-overlay" aria-hidden="true" />
        <div className="paolo-valle-copy">
          <span className="label">Valle d&apos;Aosta</span>
          <h2>Una valle con montagne di ispirazioni</h2>
          <p>
            E quasi leggendaria la cura di Paolo Griffa per la ricerca delle
            essenze ed erbe piu rare e genuine. L&apos;alba lo sorprende
            spesso per foreste e prati, chino a terra con la sua brigata,
            all&apos;infaticabile ricerca della radice o dell&apos;essenza piu
            fresca appena sbocciata. Ma anche il pomeriggio, quando il sole e
            alto e la luce cruda rivela ogni dettaglio del terreno: il momento
            perfetto per un &ldquo;foraging&rdquo; estremo, ovvero il raccolto
            di prossimita di piante spontanee. Consapevole di avere a portata
            di mano grandi eccellenze territoriali e mosso dal desiderio di
            interagire il piu possibile con il territorio, Paolo ha avviato
            una partnership con due tra le strutture storiche piu autorevoli
            della Valle: l&apos;Institut Agricole Regional di Aosta e la
            Fondazione Sistema Ollignan Onlus.
          </p>
          <p>
            D&apos;estate la brigata lavora assieme agli studenti delle
            associazioni per la cura e la raccolta di erbe, frutta e ortaggi.
            Studenti e cuochi ricercano il burro d&apos;alpeggio migliore, il
            latte piu ricco e, tra orti e serre, si scambiano conoscenze nuove
            e antiche di cucina e di orticoltura. La brigata lavora poi i
            prodotti raccolti con estrema attenzione cosi da rispettarne le
            caratteristiche e intrappolarne i sapori nel tempo. Cosi nella
            stagione invernale burri, salse e oli essenziali restano pregni
            dei sapori vividi e pungenti dell&apos;estate in montagna,
            eccezionalmente valorizzati da tecniche di estrazione, pressatura
            e marinatura altamente raffinate.
          </p>
        </div>
      </section>

      <section className="paolo-routine">
        <header className="paolo-routine-head paolo-v2-reveal">
          <span className="label">Il nostro impegno per l&apos;ambiente</span>
          <h2>Una routine ferrea, tra territorio e ricerca</h2>
        </header>
        <div className="paolo-routine-grid">
          <div className="paolo-routine-col paolo-v2-reveal">
            <p>
              Paolo ha adottato anni fa una routine ferrea, che ruota quasi
              esclusivamente attorno a sperimentazioni e ricerche, allo studio
              e l&apos;apprendimento, dalle passeggiate per raccogliere erbe
              ed essenze in montagna alle visite a fornitori e produttori
              locali, alla ricerca delle migliori materie prime e delle
              tradizioni del territorio.
            </p>
          </div>
          <article className="paolo-routine-media gallery-card paolo-v2-reveal">
            <img
              src="/images/paolo-griffa/paolo-foto/paolo-griffa-1024x1536.jpg"
              alt="Ritratto verticale Paolo Griffa"
            />
          </article>
          <div className="paolo-routine-col paolo-v2-reveal">
            <p>
              Nei suoi menu, i prodotti appena raccolti vengono sbollentati o
              lasciati crudi per esaltarne pienamente i sapori nelle portate
              del servizio serale, altri sono conservati attraverso
              essiccamento, fermentazioni e distillati &mdash; ogni essenza ha
              la sua preparazione, ogni fiore la sua utilita, ogni frutto il
              suo distillato. Il risultato? Un attento equilibrio con il
              territorio verso il quale il Caffe Nazionale ha un impegno
              costante, per garantire un utilizzo consapevole delle risorse e
              la loro promozione.
            </p>
          </div>
        </div>
      </section>

      <section className="paolo-servizio">
        <header className="paolo-servizio-head paolo-v2-reveal">
          <span className="label">Servizio</span>
          <h2>Il servizio: passione da condividere</h2>
          <p>
            Inizia lo spettacolo, il servizio. Per noi un copione recitato
            giorno dopo giorno, ogni volta pero con differenze dettate dal
            cliente, numero di persone, abitudini, allergie, orari. Tutte
            queste sono varianti alle quali ci adattiamo per portare a termine
            ogni servizio, che non e altro che il tempo durante il quale il
            cliente si affida a noi: e tempo prezioso che egli si sta e ci sta
            concedendo. Tutto deve essere studiato e nulla lasciato al caso
            per premiare ed esaltare questo momento.
          </p>
        </header>
        <div className="paolo-servizio-grid">
          <figure className="paolo-servizio-media paolo-v2-reveal">
            <img
              src="/images/paolo-griffa/servizio/condividere-1-1024x683.jpg"
              alt="Servizio in sala al Caffe Nazionale"
            />
          </figure>
          <figure className="paolo-servizio-media paolo-v2-reveal">
            <img
              src="/images/paolo-griffa/servizio/condividere-2-1024x683.jpg"
              alt="Dettaglio del servizio al tavolo"
            />
          </figure>
          <figure className="paolo-servizio-media paolo-v2-reveal">
            <img
              src="/images/paolo-griffa/servizio/condividere-3-1024x683.jpg"
              alt="Momento di condivisione in sala"
            />
          </figure>
        </div>
      </section>

      <section className="paolo-teamwork">
        <div className="paolo-teamwork-block">
          <header className="paolo-teamwork-head paolo-v2-reveal">
            <span className="label">Teamwork</span>
            <h2>
              Teamwork: un meccanismo
              <br />
              ben oliato, ed imburrato
            </h2>
          </header>
          <div className="paolo-teamwork-grid">
            <figure className="paolo-teamwork-media paolo-v2-reveal">
              <img
                src="/images/paolo-griffa/paolo-foto/equipo-x-2.jpg"
                alt="La brigata del Caffe Nazionale al lavoro"
              />
            </figure>
            <div className="paolo-teamwork-copy paolo-v2-reveal">
              <p>
                Piu che una squadra, ci sentiamo come una famiglia. Sala,
                cucina, pasticceria e cantina agiscono sincronizzati,
                conoscendo alla perfezione pregi e ritmi di ciascuno, come note
                in uno spartito musicale. La nostra ritmica deve essere sempre
                al tempo, per permetterci di funzionare come un solo perfetto
                strumento e anticipare qualunque necessita dei nostri clienti
                e della sala, cosi da mettere in scena lo &ldquo;spettacolo&rdquo;
                che proponiamo ogni giorno.
              </p>
            </div>
          </div>
        </div>

        <div className="paolo-teamwork-block paolo-teamwork-block--alt">
          <header className="paolo-teamwork-head paolo-v2-reveal">
            <span className="label">La cucina</span>
            <h2>
              La cucina,
              <br />
              dove nasce la magia
            </h2>
          </header>
          <div className="paolo-teamwork-grid paolo-teamwork-grid--reverse">
            <figure className="paolo-teamwork-media paolo-v2-reveal">
              <img
                src="/images/paolo-griffa/paolo-foto/equipo-x-1-1536x1024.jpg"
                alt="La cucina del Caffe Nazionale"
              />
            </figure>
            <div className="paolo-teamwork-copy paolo-v2-reveal">
              <blockquote className="paolo-teamwork-quote">
                <p>
                  &ldquo;Ho disegnato la cucina del Caffe Nazionale nel
                  rispetto del locale storico che ci accoglie e con
                  l&apos;obiettivo di ripensare flussi, spostamenti, gestione
                  delle eccedenze e delle spese energetiche. La cucina e il
                  luogo dove trascorriamo un&apos;importante parte del nostro
                  tempo, quindi deve essere sostenibile, pratica e fruibile.
                  Accogliente come una seconda casa, la nostra casa.&rdquo;
                </p>
                <footer>
                  <cite>Paolo Griffa</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="paolo-brigata">
        <figure className="paolo-brigata-media">
          <img
            src="/images/paolo-griffa/paolo-foto/equipo-x-5.jpg"
            alt="La brigata e la sala del Caffe Nazionale al completo"
          />
          <div className="paolo-brigata-overlay" aria-hidden="true" />
          <blockquote className="paolo-brigata-quote">
            <p>
              &ldquo;Brigata e sala compongono un team di persone
              straordinarie, sempre pronte a rilevare sfide che affrontiamo
              insieme, reagendo all&apos;unisono come un unico organismo.
              Guardiamo nella stessa direzione e ci completiamo, ognuno con le
              sue abilita e le sue responsabilita.&rdquo;
            </p>
            <footer>
              <cite>Paolo Griffa</cite>
            </footer>
          </blockquote>
        </figure>
      </section>

    </main>
  )
}

export default PaoloGriffaPage
