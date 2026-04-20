import { useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const products = [
  {
    id: 'gift-box-stella',
    name: 'Gift Box Stella',
    category: 'Selezione Boutique',
    price: 68,
    image: '/images/stella/cantina-boutique.png',
  },
  {
    id: 'colazione-signature',
    name: 'Colazione Signature',
    category: 'Il Caffè',
    price: 34,
    image: '/images/stella/colazione-portici.png',
  },
  {
    id: 'degustazione-dolce',
    name: 'Degustazione Dolce',
    category: 'Pasticceria',
    price: 42,
    image: '/images/stella/hero-sala.png',
  },
  {
    id: 'experience-stella',
    name: 'Experience Stella',
    category: 'Ristorante',
    price: 120,
    image: '/images/stella/sala-archi.png',
  },
]

function ShopPage() {
  const [cart, setCart] = useState({})

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    gsap.utils.toArray('.shop-reveal').forEach((node, index) => {
      gsap.to(node, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
        },
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id] > 0)
        .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const shipping = subtotal > 0 ? 9 : 0
  const total = subtotal + shipping

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  return (
    <main className="page-shell shop-shell">
      <section className="shop-header editorial-frame shop-reveal">
        <span className="label">Shop</span>
        <h1>Mini E-commerce Stella</h1>
        <p>
          Acquista una selezione curata di esperienze e prodotti firmati Paolo
          Griffa. Catalogo essenziale, checkout rapido.
        </p>
      </section>

      <section className="shop-layout">
        <div className="shop-catalog">
          {products.map((product) => (
            <article
              key={product.id}
              className="shop-product editorial-frame shop-reveal"
            >
              <img src={product.image} alt={product.name} />
              <div className="shop-product-body">
                <span className="label">{product.category}</span>
                <h2>{product.name}</h2>
                <p>EUR {product.price.toFixed(2)}</p>
                <button
                  type="button"
                  className="shop-btn"
                  onClick={() => addToCart(product.id)}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="shop-cart editorial-frame shop-reveal">
          <h2>Carrello</h2>
          {cartItems.length === 0 ? (
            <p className="shop-empty">Nessun prodotto selezionato.</p>
          ) : (
            <ul className="shop-cart-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>EUR {item.price.toFixed(2)}</span>
                  </div>
                  <div className="qty-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="shop-totals">
            <div>
              <span>Subtotale</span>
              <span>EUR {subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Spedizione</span>
              <span>EUR {shipping.toFixed(2)}</span>
            </div>
            <div className="shop-total-final">
              <span>Totale</span>
              <span>EUR {total.toFixed(2)}</span>
            </div>
          </div>

          <button type="button" className="shop-btn shop-btn-primary">
            Procedi al checkout
          </button>
        </aside>
      </section>
    </main>
  )
}

export default ShopPage
