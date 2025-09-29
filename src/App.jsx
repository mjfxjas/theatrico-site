import { useState, useEffect, useRef } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

const hostedDomain = 'https://theatrico-login.auth.us-east-1.amazoncognito.com'
const appRedirectUri = window.location.hostname.endsWith('cloudfront.net')
  ? 'https://d84l1y8p4kdic.cloudfront.net/login'
  : `${window.location.origin}/login`
const SPEED = 0.8
const instagramIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm11 2.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
)

function ControlledVideo({
  src,
  poster,
  playCount = Infinity,
  width = 200,
  height = 175,
  objectFit = 'cover'
}) {
  const videoRef = useRef(null)
  const loopsRef = useRef(0)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    loopsRef.current = 0

    if (!Number.isFinite(playCount)) {
      videoEl.loop = true
      videoEl.play().catch(() => {})
      return () => {
        videoEl.loop = false
      }
    }

    const handleEnded = () => {
      loopsRef.current += 1
      if (loopsRef.current < playCount) {
        videoEl.currentTime = 0
        videoEl.play().catch(() => {})
      } else {
        videoEl.pause()
        if (poster) videoEl.setAttribute('poster', poster)
      }
    }

    videoEl.removeAttribute('loop')
    videoEl.addEventListener('ended', handleEnded)
    videoEl.play().catch(() => {})

    return () => {
      videoEl.removeEventListener('ended', handleEnded)
    }
  }, [playCount, poster, src])

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      src={src}
      poster={poster}
      style={{
        objectFit,
        borderRadius: '18px',
        display: 'block',
        width,
        height,
        background: 'linear-gradient(180deg, rgba(14, 14, 26, 0.9), rgba(26, 26, 40, 0.85))',
        boxShadow: '0 18px 42px rgba(6, 6, 18, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    />
  )
}

function FadeWords({ words, videos, interval = 1000 }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [hoverSource, setHoverSource] = useState(null)
  const [revealed, setRevealed] = useState(() => new Set()) // indices that have been revealed
  const [autoShow, setAutoShow] = useState(false) // after 3s, show all
  const [hoverEnabled, setHoverEnabled] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setHoverEnabled(false)
      return () => {}
    }

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')

    const updateHoverState = (event) => {
      const enabled = event?.matches ?? false
      setHoverEnabled(enabled)
      if (!enabled) {
        setHoverIndex(null)
        setHoverSource(null)
      }
    }

    updateHoverState(mq)

    if (typeof mq.addEventListener === 'function' && typeof mq.removeEventListener === 'function') {
      mq.addEventListener('change', updateHoverState)
      return () => mq.removeEventListener('change', updateHoverState)
    }

    if (typeof mq.addListener === 'function' && typeof mq.removeListener === 'function') {
      mq.addListener(updateHoverState)
      return () => mq.removeListener(updateHoverState)
    }

    return () => {}
  }, [])

  // Short, 2-sentence descriptions (max 3 lines via CSS clamp)
  const descriptions = [
    "We stage immersive performances with precise show-calling and evocative lighting. Opening night energy—minus the stress.",
    "Concept-to-camera production for brand stories and promos. Cinematic quality with agency-clear communication.",
    "From salons to conferences, we orchestrate run-of-show and guest flow. Elegant builds and cues that feel effortless."
  ];

  useEffect(() => {
    if (visibleCount < words.length) {
      const id = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, interval);
      return () => clearTimeout(id);
    }
  }, [visibleCount, words.length, interval]);

  useEffect(() => {
    const t = setTimeout(() => setAutoShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero__matrix">
      {words.slice(0, visibleCount).map((word, i) => {
        const isDim = hoverIndex !== null && hoverIndex !== i
        const isActive = hoverIndex === i
        const highlightText = isActive && hoverSource !== 'video'
        const route = i === 0 ? "/theater" : i === 1 ? "/production" : "/events";
        return (
          <div
            key={i}
            className="hero__matrix-row"
            onMouseEnter={() => {
              if (!hoverEnabled) return
              setHoverIndex(i)
              setHoverSource('title')
              setRevealed(prev => {
                const next = new Set(prev)
                next.add(i)
                return next
              })
            }}
            onMouseLeave={() => {
              if (!hoverEnabled) return
              setHoverIndex(null)
              setHoverSource(null)
            }}
          >
            {/* Word + Description (left column) */}
            <div className="hero__matrix-copy">
              <Link
                to={route}
                className="hero__matrix-link"
                onPointerEnter={() => {
                  if (hoverEnabled) setHoverSource('title')
                }}
                onFocus={() => {
                  setHoverIndex(i)
                  setHoverSource('title')
                }}
              >
                <Motion.h1
                  initial={{ opacity: 0, x: -64, filter: 'blur(2px)' }}
                  animate={{
                    opacity: isDim ? 0.65 : 1,
                    x: 0,
                    filter: isDim ? 'blur(1px)' : 'blur(0px)',
                    scale: isDim ? 0.9 : 1,
                    color: highlightText ? '#ffffff' : isDim ? '#7b7b86' : '#f8f4e7',
                    textShadow: highlightText
                      ? '0 22px 48px rgba(8, 8, 18, 0.6)'
                      : isDim
                        ? '0 8px 18px rgba(8, 8, 18, 0.4)'
                        : '0 16px 36px rgba(8, 8, 18, 0.55)'
                  }}
                  transition={{ duration: 1.2 * SPEED, ease: 'easeOut', delay: i * 0.12 }}
                  whileHover={{
                    scale: 1.12,
                    color: '#ffffff',
                    textShadow: '0 28px 60px rgba(8, 8, 18, 0.65)',
                    transition: { duration: 1.4 * SPEED, ease: 'easeInOut' }
                  }}
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: 'clamp(2.65rem, 7vw, 3.95rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {word}
                </Motion.h1>
              </Link>
              <Motion.p
                className="hero__matrix-description"
                initial={{ opacity: 0, x: -64, filter: 'blur(1px)' }}
                animate={{
                  opacity: (hoverIndex === i || revealed.has(i) || autoShow) ? 1 : 0,
                  y: (hoverIndex === i || revealed.has(i) || autoShow) ? 0 : 8,
                  x: 0,
                  filter: (hoverIndex === i || revealed.has(i) || autoShow) ? 'blur(0px)' : 'blur(1px)',
                  scale: (hoverIndex !== null && hoverIndex !== i) ? 0.95 : 1,
                  color: highlightText ? '#ffffff' : (hoverIndex !== null && hoverIndex !== i) ? '#6f7184' : 'rgba(248, 244, 231, 0.78)'
                }}
                whileHover={{
                  scale: 1,
                  color: '#ffffff',
                  transition: { duration: 1.2 * SPEED, ease: 'easeInOut' }
                }}
                transition={{ duration: 1.5 * SPEED, ease: 'easeOut', delay: i * 0.12 + 0.1 }}
                style={{ margin: 0 }}
                onPointerEnter={() => {
                  if (hoverEnabled) setHoverSource('paragraph')
                }}
                onFocus={() => {
                  setHoverIndex(i)
                  setHoverSource('paragraph')
                }}
              >
                {descriptions[i]}
              </Motion.p>
            </div>

            {/* Video (right column) */}
            <Link
              to={route}
              className="hero__matrix-link"
              onPointerEnter={() => {
                if (hoverEnabled) setHoverSource('video')
              }}
              onFocus={() => {
                setHoverIndex(i)
                setHoverSource('video')
                setRevealed(prev => {
                  const next = new Set(prev)
                  next.add(i)
                  return next
                })
              }}
            >
              <Motion.div
                className="hero__matrix-visual"
                initial={{ opacity: 0, x: -64 }}
                animate={{
                  opacity: isDim ? 0.7 : 1,
                  x: 0,
                  filter: isDim ? 'blur(1px)' : 'blur(0px)',
                  scale: isDim ? 0.92 : 1
                }}
                transition={{ duration: 1.2 * SPEED, ease: 'easeOut', delay: i * 0.12 + 0.2 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 24px 56px rgba(8, 8, 18, 0.6)',
                  transition: { duration: 1.6 * SPEED, ease: 'easeInOut' }
                }}
              >
                <ControlledVideo
                  src={videos[i]}
                  poster="/media/poster-placeholder.jpg"
                  width={220}
                  height={180}
                />
              </Motion.div>
            </Link>
          </div>
        )
      })}
    </div>
  );
}

function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
    onClose();
  };

  return (
    <Motion.div
      className="contactOverlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <Motion.div
        className="contactModal"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.24 * SPEED, ease: 'easeOut' }}
        style={{
          width: 'min(560px, 92vw)',
          borderRadius: 20,
          padding: '2rem',
          background: 'linear-gradient(160deg, rgba(16, 16, 34, 0.96), rgba(30, 22, 48, 0.88))',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: 'var(--text)',
          boxShadow: '0 32px 80px rgba(6, 6, 18, 0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h2 style={{ margin: 0, fontSize: 24, color: '#EAE6D6' }}>Contact Theatrico</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#aaa', fontSize: 20, cursor: 'pointer' }} aria-label="Close">×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 10, 18, 0.7)', color: 'var(--text)', boxShadow: '0 12px 26px rgba(6, 6, 18, 0.4)' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 10, 18, 0.7)', color: 'var(--text)', boxShadow: '0 12px 26px rgba(6, 6, 18, 0.4)' }}
          />
          <textarea
            name="message"
            placeholder="Tell us about your date, venue, and goals…"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(10, 10, 18, 0.7)', color: 'var(--text)', resize: 'vertical', boxShadow: '0 12px 26px rgba(6, 6, 18, 0.4)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
            <Motion.button type="button" onClick={onClose} className="btn btn--ghost"
              whileHover={{ scale: 1.12, color: '#EAE6D6' }}
              transition={{ duration: 1.0 * SPEED, ease: 'easeInOut' }}
              style={{ borderRadius: 14, padding: '10px 16px' }}
            >
              Cancel
            </Motion.button>
            <Motion.button type="submit" className="btn"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 1.0 * SPEED, ease: 'easeInOut' }}
              style={{ borderRadius: 14, padding: '12px 20px' }}
            >
              Send
            </Motion.button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
}

export default function App() {
  const [showContact, setShowContact] = useState(false)

  return (
    <>
      <Header onOpenContact={() => setShowContact(true)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/theater" element={<TheaterPage />} />
          <Route path="/production" element={<ProductionPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
      <AnimatePresence>
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      </AnimatePresence>
    </>
  )
}

function Header({ onOpenContact }) {
  const [linksRevealed, setLinksRevealed] = useState(false)
  const [isTouchNav, setIsTouchNav] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setIsTouchNav(true)
      setLinksRevealed(false)
      return () => {}
    }

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')

    const updateNavMode = (event) => {
      const canHover = event?.matches ?? false
      setIsTouchNav(!canHover)
      if (!canHover) {
        setLinksRevealed(false)
      }
    }

    updateNavMode(mq)

    if (typeof mq.addEventListener === 'function' && typeof mq.removeEventListener === 'function') {
      mq.addEventListener('change', updateNavMode)
      return () => mq.removeEventListener('change', updateNavMode)
    }

    if (typeof mq.addListener === 'function' && typeof mq.removeListener === 'function') {
      mq.addListener(updateNavMode)
      return () => mq.removeListener(updateNavMode)
    }

    return () => {}
  }, [])

  useEffect(() => {
    if (!isTouchNav || !linksRevealed) return

    const timeoutId = setTimeout(() => setLinksRevealed(false), 4000)
    return () => clearTimeout(timeoutId)
  }, [isTouchNav, linksRevealed])

  const revealLinks = () => setLinksRevealed(true)
  const hideLinks = () => setLinksRevealed(false)
  const handleNavItemClick = () => {
    if (isTouchNav) hideLinks()
  }
  const handleBrandClick = () => {
    if (isTouchNav) {
      setLinksRevealed(prev => !prev)
    } else {
      revealLinks()
    }
  }
  const expanded = linksRevealed
  const headerClassName = isTouchNav ? 'site-header site-header--touch' : 'site-header'
  const navLinks = [
    { to: '/theater', label: 'Theater' },
    { to: '/production', label: 'Production' },
    { to: '/events', label: 'Events' },
    { to: '/people', label: 'People' },
  ]
  return (
    <header className={headerClassName}>
      <div className="container nav" style={{ position: 'relative' }}>
        <Motion.div
          className="toolbar-expand"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: expanded ? 1 : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35 * SPEED, ease: 'easeOut' }}
        />
        <Motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 * SPEED, ease: 'easeOut' }}
          style={{ display: 'inline-block', cursor: 'pointer' }}
          onHoverStart={revealLinks}
          onFocus={revealLinks}
          onClick={handleBrandClick}
        >
          <NavLink to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="logo">T</span>
            <span className="wordmark">Theatrico</span>
          </NavLink>
        </Motion.div>

        <nav className={`nav-links ${linksRevealed ? 'nav-links--visible' : ''}`} onMouseEnter={revealLinks}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onFocus={revealLinks}
              onClick={handleNavItemClick}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Motion.a
            href="https://instagram.com/placeholder"
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost nav-action-link nav-action-link--icon"
            whileHover={{ scale: 1.08, color: 'var(--text)' }}
            transition={{ duration: 0.4 * SPEED, ease: 'easeOut' }}
            onMouseEnter={revealLinks}
            onClick={handleNavItemClick}
            onFocus={revealLinks}
          >
            {instagramIcon}
            <span style={{ marginLeft: 8 }}>Instagram</span>
          </Motion.a>
          <Motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 * SPEED, ease: 'easeOut' }}
            onMouseEnter={revealLinks}
          >
            <NavLink
              to="/login"
              className={({ isActive }) => `btn btn--ghost nav-action-link${isActive ? ' active' : ''}`}
              onFocus={revealLinks}
              onClick={handleNavItemClick}
            >
              Login
            </NavLink>
          </Motion.div>
          <Motion.button
            className="btn"
            whileHover={{ scale: 1.08, color: 'var(--text)' }}
            transition={{ duration: 0.5 * SPEED, ease: 'easeOut' }}
            onClick={() => {
              if (onOpenContact) onOpenContact()
              handleNavItemClick()
            }}
            onFocus={revealLinks}
            onMouseEnter={revealLinks}
          >
            Contact
          </Motion.button>
        </div>
      </div>
    </header>
  )
}
// FadeProfiles component: mirrors FadeWords but with images and bios/socials
function FadeProfiles({ names, photos, interval = 1000 }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [revealed, setRevealed] = useState(() => new Set());
  const [autoShow, setAutoShow] = useState(false);

  // Short, 2-sentence bios (clamped to 3 lines)
  const bios = [
    "MC leads creative direction and stagecraft. Obsessed with pacing, reveals, and audience flow.",
    "Gab drives production—budgets, crews, and timelines—so ideas land precisely on show day.",
    "Ellie shapes story and client comms, bringing clarity to concept and elegance to delivery."
  ];

  useEffect(() => {
    if (visibleCount < names.length) {
      const id = setTimeout(() => setVisibleCount((p) => p + 1), interval);
      return () => clearTimeout(id);
    }
  }, [visibleCount, names.length, interval]);

  useEffect(() => {
    const t = setTimeout(() => setAutoShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero__matrix hero__matrix--profiles">
      {names.slice(0, visibleCount).map((name, i) => {
        const isDim = hoverIndex !== null && hoverIndex !== i;
        const photo = photos[i] || '/placeholder-portrait.png';
        return (
          <div
            key={i}
            className="hero__matrix-row hero__matrix-row--profiles"
            onMouseEnter={() => {
              setHoverIndex(i);
              setRevealed(prev => {
                const next = new Set(prev);
                next.add(i);
                return next;
              });
            }}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="hero__matrix-copy">
              <Motion.h1
                initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
                animate={{
                  opacity: isDim ? 0.65 : 1,
                  y: 0,
                  filter: isDim ? 'blur(1px)' : 'blur(0px)',
                  scale: isDim ? 0.92 : 1,
                  color: isDim ? '#7b7b86' : '#f8f4e7',
                  textShadow: isDim ? '0 8px 18px rgba(8, 8, 18, 0.4)' : '0 18px 40px rgba(8, 8, 18, 0.55)'
                }}
                transition={{ duration: 1.4 * SPEED, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.08,
                  color: '#ffffff',
                  textShadow: '0 28px 60px rgba(8, 8, 18, 0.65)',
                  transition: { duration: 1.4 * SPEED, ease: 'easeInOut' }
                }}
                style={{
                  textAlign: 'left',
                  cursor: 'default',
                  fontSize: 'clamp(2.1rem, 4.5vw, 2.9rem)',
                  letterSpacing: '-0.01em'
                }}
              >
                {name}
              </Motion.h1>
              <Motion.p
                className="hero__matrix-description"
                initial={{ opacity: 0, y: 8, filter: 'blur(1px)' }}
                animate={{
                  opacity: (hoverIndex === i || revealed.has(i) || autoShow) ? 1 : 0,
                  y: (hoverIndex === i || revealed.has(i) || autoShow) ? 0 : 8,
                  filter: (hoverIndex === i || revealed.has(i) || autoShow) ? 'blur(0px)' : 'blur(1px)',
                  scale: (hoverIndex !== null && hoverIndex !== i) ? 0.96 : 1,
                  color: (hoverIndex !== null && hoverIndex !== i) ? '#6f7184' : 'rgba(248, 244, 231, 0.78)'
                }}
                transition={{ duration: 1.6 * SPEED, ease: 'easeOut' }}
                style={{ margin: 0 }}
              >
                {bios[i]}
              </Motion.p>
              <div className="hero__matrix-socials">
                <a className="hero__matrix-social" href="https://instagram.com/placeholder" target="_blank" rel="noreferrer">
                  {instagramIcon}
                  <span>Instagram</span>
                </a>
              </div>
            </div>
            <Motion.div
              className="hero__matrix-visual hero__matrix-visual--portrait"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isDim ? 0.7 : 1,
                y: 0,
                scale: isDim ? 0.92 : 1
              }}
              transition={{ duration: 1.2 * SPEED, ease: 'easeOut', delay: 0.1 }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 28px 64px rgba(8, 8, 18, 0.6)',
                transition: { duration: 1.6 * SPEED, ease: 'easeInOut' }
              }}
            >
              <img src={photo} alt={`${name} portrait`} loading="lazy" />
            </Motion.div>
          </div>
        )
      })}
    </div>
  );
}

function PeoplePage() {
  return (
    <section className="hero hero--sub hero--team">
      <div className="hero__bg" aria-hidden="true">
        <span className="grain-overlay" aria-hidden="true"></span>
      </div>
      <span className="decor-orb decor-orb--peach hero__orb hero__orb--left" aria-hidden="true"></span>
      <span className="decor-orb decor-orb--violet hero__orb hero__orb--right" aria-hidden="true"></span>
      <span className="decor-ring hero__ring" aria-hidden="true"></span>
      <div className="container hero__content hero__content--sub hero__content--team">
        <div className="hero__sub-copy hero__team-copy">
          <h2>Meet the team</h2>
          <p>
            Theatrico brings together producers, directors, designers, and show callers who have led Broadway tours, launch shows, and destination gatherings. We build bespoke crews around each engagement so you get senior expertise, responsive communication, and a calm show day.
          </p>
        </div>
        <FadeProfiles
          names={["MC", "GAB", "ELLIE"]}
          photos={["/people/mc.jpg", "/people/gab.jpg", "/people/ellie.jpg"]}
          interval={800}
        />
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <Showreel />
      <Testimonials />
      <CTA />
    </>
  )
}

function LoginPage() {
  const auth = useAuth()
  const debug = new URLSearchParams(window.location.search).get('debug') === '1'

  const handleSignIn = async () => {
    try {
      await auth.signinRedirect({ redirect_uri: appRedirectUri })
    } catch (error) {
      console.error('Cognito signin redirect failed, falling back to manual URL', error)
      const params = new URLSearchParams({
        client_id: '1096dsoaspipnk2joqgl1q50cn',
        response_type: 'code',
        scope: 'openid email phone',
        redirect_uri: appRedirectUri
      })
      window.location.assign(`${hostedDomain}/oauth2/authorize?${params.toString()}`)
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signoutRedirect({
        post_logout_redirect_uri: appRedirectUri
      })
    } catch (error) {
      console.error('Cognito signout redirect failed, clearing local session', error)
      auth.removeUser()
      window.location.replace(appRedirectUri)
    }
  }

  const DebugPanel = () => (
    <pre style={{
      marginTop: 24,
      padding: 16,
      border: '1px solid rgba(234,230,214,0.18)',
      borderRadius: 12,
      background: 'rgba(12,12,18,0.6)',
      color: '#EAE6D6',
      fontSize: 12,
      maxWidth: 520,
      whiteSpace: 'pre-wrap'
    }}>
      {JSON.stringify({
        location: window.location.href,
        isLoading: auth.isLoading,
        isAuthenticated: auth.isAuthenticated,
        error: auth.error ? String(auth.error) : null,
        user: auth.user ? {
          profile: auth.user.profile,
          id_token: !!auth.user.id_token,
          access_token: !!auth.user.access_token,
          refresh_token: !!auth.user.refresh_token
        } : null
      }, null, 2)}
    </pre>
  )

  let content
  if (auth.isLoading) {
    content = <p>Contacting Cognito…</p>
  } else if (auth.error) {
    content = (
      <>
        <p>We ran into an error: {auth.error.message}</p>
        <Motion.button className="btn" whileHover={{ scale: 1.05 }} onClick={handleSignIn}>
          Try again
        </Motion.button>
      </>
    )
  } else if (auth.isAuthenticated) {
    content = (
      <>
        <h2>Welcome back, {auth.user?.profile?.email || auth.user?.profile?.sub}</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          <code style={{ background: 'rgba(12,12,18,0.55)', padding: '12px 14px', borderRadius: 10 }}>
            ID Token: {auth.user?.id_token?.slice(0, 32) || '—'}…
          </code>
          <code style={{ background: 'rgba(12,12,18,0.55)', padding: '12px 14px', borderRadius: 10 }}>
            Access Token: {auth.user?.access_token?.slice(0, 32) || '—'}…
          </code>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Motion.button className="btn" whileHover={{ scale: 1.05 }} onClick={() => auth.removeUser()}>
            Sign out (local)
          </Motion.button>
          <Motion.button className="btn btn--ghost" whileHover={{ scale: 1.05 }} onClick={handleSignOut}>
            Sign out (Cognito)
          </Motion.button>
        </div>
      </>
    )
  } else {
    content = (
      <>
        <h2>Sign in to Theatrico</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Use your Theatrico credentials to continue. You&rsquo;ll be redirected to the secure Cognito login screen.
        </p>
        <Motion.button className="btn" whileHover={{ scale: 1.05 }} onClick={handleSignIn}>
          Continue to login
        </Motion.button>
      </>
    )
  }

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="container hero__content" style={{ gap: 18, maxWidth: 520 }}>
        {content}
        {debug && <DebugPanel />}
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="hero hero--home">
      <div className="hero__bg" aria-hidden="true">
        <span className="grain-overlay" aria-hidden="true"></span>
      </div>
      <span className="decor-orb decor-orb--peach hero__orb hero__orb--left" aria-hidden="true"></span>
      <span className="decor-orb decor-orb--violet hero__orb hero__orb--right" aria-hidden="true"></span>
      <span className="decor-ring hero__ring" aria-hidden="true"></span>
      <div className="container hero__content">
        <div className="hero__intro">
          <Motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 * SPEED, ease: 'easeOut' }}
          >
            Stagecraft & storytelling
          </Motion.span>
          <FadeWords
            words={["Theater", "Production", "Events"]}
            videos={["/media/fantastick.mov", "/media/production.mov", "/media/event.mov"]}
            interval={1000}
          />
          <Motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 * SPEED, ease: 'easeOut', delay: 0.2 }}
          >
            Creative direction, technical calling, and cinematic capture under one collaborative team. We design the arc, produce the crew, and run the room so your story lands.
          </Motion.p>
          <Motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 * SPEED, ease: 'easeOut', delay: 0.3 }}
          >
            <Link className="btn" to="/events">
              Plan an event
            </Link>
            <a className="btn btn--ghost" href="#work">
              Watch the reel
            </a>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

function PageShell({ title, videoSrc, description, highlights }) {
  return (
    <section className="hero hero--sub">
      <div className="hero__bg" aria-hidden="true">
        <span className="grain-overlay" aria-hidden="true"></span>
      </div>
      <span className="decor-orb decor-orb--peach hero__orb hero__orb--left" aria-hidden="true"></span>
      <span className="decor-orb decor-orb--fuchsia hero__orb hero__orb--right" aria-hidden="true"></span>
      <span className="decor-ring hero__ring" aria-hidden="true"></span>
      <div className="container hero__content hero__content--sub">
        <div className="hero__sub-copy">
          <Motion.h1
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              color: '#f8f4e7',
              textShadow: '0 18px 40px rgba(8, 8, 18, 0.55)'
            }}
            transition={{ duration: 0.8 * SPEED, ease: 'easeOut' }}
            whileHover={{
              scale: 1.08,
              color: '#ffffff',
              textShadow: '0 28px 60px rgba(8, 8, 18, 0.65)',
              transition: { duration: 1.4 * SPEED, ease: 'easeInOut' }
            }}
            style={{ textAlign: 'left', fontSize: 'clamp(2.6rem, 5vw, 3.4rem)' }}
          >
            {title}
          </Motion.h1>
          {description && (
            <p>
              {description}
            </p>
          )}
          {highlights && (
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="hero__sub-visual">
          <Motion.div
            className="hero__matrix-visual hero__matrix-visual--large"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 * SPEED, ease: 'easeOut', delay: 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 28px 64px rgba(8, 8, 18, 0.6)',
              transition: { duration: 1.6 * SPEED, ease: 'easeInOut' }
            }}
          >
            <ControlledVideo src={videoSrc} poster="/media/poster-placeholder.jpg" width={320} height={240} />
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

function TheaterPage() {
  return (
    <PageShell
      title="Theater"
      videoSrc="/media/fantastick.mov"
      description="Cue-to-cue precision for stage productions, premieres, and plays. Our team manages rehearsals, calling, and lighting so artists can focus on the story."
      highlights={[
        'Show calling and stage management tailored to your venue',
        'Lighting, audio, and scenic teams that move in sync',
        'Rehearsal support with detailed run sheets and cue stacks'
      ]}
    />
  )
}
function ProductionPage() {
  return (
    <PageShell
      title="Production"
      videoSrc="/media/production.mov"
      description="Concept-to-camera production for brand films, launch spots, and visual assets. We partner with internal teams to translate strategy into cinematic results."
      highlights={[
        'Creative treatment, scripting, and shotlists',
        'Crew sourcing, permitting, and on-set direction',
        'Editorial, color, and sound mixes delivered on schedule'
      ]}
    />
  )
}
function EventsPage() {
  return (
    <PageShell
      title="Events"
      videoSrc="/media/event.mov"
      description="From pop-ups to executive summits, we stage environments that guide guests with intention. Every element—run-of-show, hospitality, and brand—works in concert."
      highlights={[
        'Spatial design, vendor coordination, and load-in oversight',
        'Guest flow planning with timing, cues, and contingencies',
        'Capture, recap, and content extensions for continued impact'
      ]}
    />
  )
}

function Logos() {
  return (
    <section className="container logos" aria-label="Trusted by">
      <div className="section-surface section-surface--muted logos__surface">
        <span className="grain-overlay" aria-hidden="true"></span>
        <span className="decor-orb decor-orb--violet logos__orb" aria-hidden="true"></span>
        <div className="logos__heading">
          <span className="muted">Trusted by teams at</span>
        </div>
        <div className="logos__row">
          <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
          <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
          <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
          <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="services" className="features">
      <div className="container">
        <div className="section-surface section-surface--glow features__surface">
          <span className="grain-overlay" aria-hidden="true"></span>
          <span className="decor-orb decor-orb--peach features__orb" aria-hidden="true"></span>
          <div className="features__grid">
            <div className="features__copy">
              <h2>What we do</h2>
              <ul className="featureList">
                <li><strong>Live Events:</strong> staging, lighting direction, show-calling</li>
                <li><strong>Brand Experiences:</strong> launches, pop-ups, hospitality</li>
                <li><strong>Cinematic Promos:</strong> scripting, shoot, edit, color</li>
                <li><strong>Full Service:</strong> creative direction to on-site ops</li>
              </ul>
            </div>
            <Card
              title="Signature Package"
              text="End-to-end creative and production for one hero event + a 60–90s film deliverable and cutdowns."
              bullets={['Creative treatment', 'Run of show', 'Crew & gear', '4K master + social']}
              cta="See sample scope"
              href="#work"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({ title, text, bullets, cta, href }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
      <ul className="bullets">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <a className="btn btn--ghost" href={href}>{cta}</a>
    </div>
  )
}

function Showreel() {
  return (
    <section id="work" className="showreel">
      <div className="container">
        <div className="section-surface section-surface--glow showreel__surface">
          <span className="grain-overlay" aria-hidden="true"></span>
          <span className="decor-orb decor-orb--fuchsia showreel__orb" aria-hidden="true"></span>
          <div className="showreel__heading">
            <h2>Showreel</h2>
            <p className="muted">Moments from premieres, brand films, and destination gatherings.</p>
          </div>
          <div className="videoWrap">
            <video controls playsInline poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop">
              <source src="" type="video/mp4" />
            </video>
          </div>
          <p className="muted showreel__note">Prefer Vimeo/YouTube? Replace this block with their embed code.</p>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-surface section-surface--muted testimonials__surface">
          <span className="grain-overlay" aria-hidden="true"></span>
          <span className="decor-orb decor-orb--violet testimonials__orb" aria-hidden="true"></span>
          <h2>What clients say</h2>
          <div className="grid3 testimonials__grid">
            <Quote
              text="Theatrico took our fuzzy idea and turned it into a knockout event and film."
              author="Marketing Director, Collier"
            />
            <Quote
              text="Flawless execution. Our audience was blown away."
              author="Producer, Side Quest"
            />
            <Quote
              text="Fast, clear, and cinematic. Exactly what we needed."
              author="Head of Comms, CCS"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Quote({ text, author }) {
  return (
    <figure className="quote">
      <blockquote>“{text}”</blockquote>
      <figcaption>— {author}</figcaption>
    </figure>
  )
}

function CTA() {
  return (
    <section id="contact" className="cta">
      <div className="container">
        <div className="section-surface section-surface--cta cta__surface">
          <span className="grain-overlay" aria-hidden="true"></span>
          <span className="decor-orb decor-orb--peach cta__orb" aria-hidden="true"></span>
          <h2>Ready to plan your show?</h2>
          <p>Tell us your date, venue, and goals. We’ll reply with creative directions, crews, and budgets within 48 hours.</p>
          <div className="cta__actions">
            <a className="btn" href="mailto:hello@theatrico.co?subject=Theatrico Inquiry">Contact Theatrico</a>
            <a className="btn btn--ghost" href="/people">Meet the team</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="container footer">
      <span>© {new Date().getFullYear()} Theatrico</span>
      <span className="muted">Chattanooga, TN • Available worldwide</span>
    </footer>
  )
}
