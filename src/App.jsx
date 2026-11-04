import { useEffect, useState } from 'react'
import { site, nav, hero, about, services, approach, leader, contact, footer } from './content.js'

const LEAF =
  'M0 -2 C-4 -10 -20 -14 -20 -26 C-20 -33 -13 -37 -7 -34 C-3 -32 0 -28 0 -25 C0 -28 3 -32 7 -34 C13 -37 20 -33 20 -26 C20 -14 4 -10 0 -2 Z'

function Clover({ size = 24, color = 'currentColor', className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-40 -40 80 80" fill={color} aria-hidden="true">
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={LEAF} transform={`rotate(${r})`} />
      ))}
    </svg>
  )
}

const ICONS = {
  building: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  register: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
}

function Icon({ name }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

// Adds .in to [data-reveal] elements as they scroll into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    document.documentElement.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap top-row">
        <a className="brand" href="#home" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
          <Clover size={38} color="#C9A6DD" className="brand-mark" />
          <span>
            <b>{site.shortName}</b>
            <small>{site.tagline}</small>
          </span>
        </a>
        <nav className={`links${open ? ' open' : ''}`} id="main-nav" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="top-actions">
          <a className="btn btn-light btn-sm" href="#contact">Get in touch</a>
          <button className="menu-btn" aria-expanded={open} aria-controls="main-nav" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow rise" style={{ '--d': '0ms' }}>{hero.eyebrow}</p>
          <h1 className="rise" style={{ '--d': '120ms' }}>
            {hero.titleStart}
            <em>{hero.titleEmphasis}</em>.
          </h1>
          <p className="lede rise" style={{ '--d': '260ms' }}>{hero.lede}</p>
          <div className="ctas rise" style={{ '--d': '380ms' }}>
            <a className="btn btn-light" href="#services">Our services</a>
            <a className="btn btn-ghost" href="#contact">Talk to us</a>
          </div>
          <div className="strap">
            {site.strap.map((s, i) => (
              <span key={s} className="rise" style={{ '--d': `${520 + i * 110}ms` }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <svg viewBox="0 0 320 320">
            <g className="orbit">
              <circle cx="160" cy="160" r="150" fill="none" stroke="#C9A6DD" strokeOpacity=".3" strokeDasharray="2 10" strokeLinecap="round" />
              <circle cx="160" cy="10" r="4" fill="#9BE0B4" />
            </g>
            <g className="orbit orbit-rev">
              <circle cx="160" cy="160" r="118" fill="none" stroke="#C9A6DD" strokeOpacity=".2" />
              <circle cx="278" cy="160" r="3" fill="#E3CDF0" />
            </g>
            <g transform="translate(160 160) scale(2.75)" fill="#C9A6DD">
              <g className="clover-spin">
                {[0, 90, 180, 270].map((r, i) => (
                  <g key={r} transform={`rotate(${r})`}>
                    <path className="leaf" style={{ '--i': i }} d={LEAF} />
                  </g>
                ))}
              </g>
            </g>
            <circle className="pulse" cx="160" cy="160" r="7" fill="#9BE0B4" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="stack" data-reveal>
          <p className="eyebrow">About us</p>
          <h2>{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="muted">{p}</p>
          ))}
        </div>
        <aside className="who" data-reveal style={{ '--i': 2 }}>
          <h3>{about.whoTitle}</h3>
          <ul>
            {about.who.map((w) => (
              <li key={w}>
                <Clover size={16} color="var(--clover)" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="tint">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Services</p>
          <h2>{services.title}</h2>
          <p>{services.intro}</p>
        </div>
        <div className="services">
          {services.items.map((s, i) => (
            <article className="svc" key={s.title} data-reveal style={{ '--i': i }}>
              <div className="ic"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Our approach</p>
          <h2>{approach.title}</h2>
        </div>
        <div className="values" data-reveal>
          {approach.values.map((v, i) => (
            <div className="val" key={v.title} style={{ '--i': i }}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        <p className="closing" data-reveal>{approach.closing}</p>
      </div>
    </section>
  )
}

function Leadership() {
  return (
    <section id="leadership" className="tint">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Leadership</p>
          <h2>{leader.title}</h2>
        </div>
        <div className="leader" data-reveal>
          {leader.photo ? (
            <img className="avatar" src={leader.photo} alt={leader.name} />
          ) : (
            <div className="avatar" aria-hidden="true">{leader.initials}</div>
          )}
          <div className="stack-sm">
            <h3>{leader.name}</h3>
            <p className="role">{leader.role}</p>
            <p className="muted">{leader.bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const items = [
    { label: 'Office', value: contact.address },
    { label: 'Postal address', value: contact.postal },
    contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    contact.whatsapp && { label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${contact.whatsapp}` },
    contact.linkedin && { label: 'LinkedIn', value: 'Follow us', href: contact.linkedin },
  ].filter(Boolean)

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="head" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2>{contact.title}</h2>
          <p>{contact.intro}</p>
        </div>
        <div className="contact-grid">
          {items.map((c, i) => (
            <div className="c-item" key={c.label} data-reveal style={{ '--i': i }}>
              <span className="eyebrow">{c.label}</span>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{c.value}</a>
              ) : (
                <p>{c.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main id="home">
        <Hero />
        <About />
        <Services />
        <Approach />
        <Leadership />
        <Contact />
      </main>
      <footer>
        <div className="wrap footer-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{footer.credit}</span>
        </div>
      </footer>
    </>
  )
}
