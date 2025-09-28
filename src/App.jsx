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
        borderRadius: '12px',
        display: 'block',
        width,
        height,
        background: '#030305'
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
    const mq = typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)')
      : null

    const updateHoverState = (event) => {
      const enabled = event?.matches ?? false
      setHoverEnabled(enabled)
      if (!enabled) {
        setHoverIndex(null)
        setHoverSource(null)
      }
    }

    if (!mq) {
      setHoverEnabled(false)
      return () => {}
    }

    updateHoverState(mq)

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', updateHoverState)
      return () => mq.removeEventListener('change', updateHoverState)
    }

    if (typeof mq.addListener === 'function') {
      mq.addListener(updateHoverState)
      return () => mq.removeListener(updateHoverState)
    }

    setHoverEnabled(false)
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
    <div style={{ display: 'grid', rowGap: '2.4rem', justifyContent: 'center' }}>
      {words.slice(0, visibleCount).map((word, i) => {
        const isDim = hoverIndex !== null && hoverIndex !== i
        const isActive = hoverIndex === i
        const highlightText = isActive && hoverSource !== 'video'
        const route = i === 0 ? "/theater" : i === 1 ? "/production" : "/events";
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 440px) auto',
              alignItems: 'center',
              columnGap: '2rem'
            }}
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
            <div>
              <Link
                to={route}
                style={{ textDecoration: 'none' }}
                onPointerEnter={() => hoverEnabled && setHoverSource('title')}
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
                    scale: isDim ? 0.75 : 1,
                    color: highlightText ? '#ffffff' : isDim ? '#6e6e73' : '#EAE6D6'
                  }}
                transition={{ duration: 1.2 * SPEED, ease: 'easeOut', delay: i * 0.12 }}
                whileHover={{ scale: 1.25, color: "#ffffff", transition: { duration: 1.6 * SPEED, ease: 'easeInOut' } }}
                  style={{ textAlign: 'left', cursor: 'pointer' }}
                >
                  {word}
                </Motion.h1>
              </Link>
              <Motion.p
                initial={{ opacity: 0, x: -64, filter: 'blur(1px)' }}
                animate={{
                  opacity: (hoverIndex === i || revealed.has(i) || autoShow) ? 1 : 0,
                  y: (hoverIndex === i || revealed.has(i) || autoShow) ? 0 : 8,
                  x: 0,
                  filter: (hoverIndex === i || revealed.has(i) || autoShow) ? 'blur(0px)' : 'blur(1px)',
                  scale: (hoverIndex !== null && hoverIndex !== i) ? 0.85 : 1,
                  color: highlightText ? '#f1f1f5' : (hoverIndex !== null && hoverIndex !== i) ? '#6e6e73' : '#cfcfd6'
                }}
                whileHover={{
                  scale: 1,
                  color: '#ffffff',
                  transition: { duration: 1.2 * SPEED, ease: 'easeInOut' }
                }}
                transition={{ duration: 1.5 * SPEED, ease: 'easeOut', delay: i * 0.12 + 0.1 }}
                style={{
                  fontSize: '1rem',
                  maxWidth: '40ch',
                  marginTop: '0.25rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
                onPointerEnter={() => hoverEnabled && setHoverSource('paragraph')}
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
              style={{ textDecoration: 'none' }}
              onPointerEnter={() => hoverEnabled && setHoverSource('video')}
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
                initial={{ opacity: 0, x: -64 }}
                animate={{
                  opacity: isDim ? 0.65 : 1,
                  x: 0,
                  filter: isDim ? 'blur(1px)' : 'blur(0px)',
                  scale: isDim ? 0.75 : 1
                }}
                transition={{ duration: 1.2 * SPEED, ease: 'easeOut', delay: i * 0.12 + 0.2 }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
                  transition: { duration: 1.6 * SPEED, ease: 'easeInOut' }
                }}
              >
                <ControlledVideo
                  src={videos[i]}
                  poster="/media/poster-placeholder.jpg"
                  width={200}
                  height={175}
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
          borderRadius: 16,
          padding: 20,
          background: 'linear-gradient(180deg,#141417,#101013)',
          border: '1px solid #2a2a2e',
          color: '#f5f5f7',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
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
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a2e', background: '#121214', color: '#f5f5f7' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a2e', background: '#121214', color: '#f5f5f7' }}
          />
          <textarea
            name="message"
            placeholder="Tell us about your date, venue, and goals…"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a2e', background: '#121214', color: '#f5f5f7', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
            <Motion.button type="button" onClick={onClose} className="btn btn--ghost"
              whileHover={{ scale: 1.12, color: '#EAE6D6' }}
              transition={{ duration: 1.0 * SPEED, ease: 'easeInOut' }}
              style={{ borderRadius: 10, padding: '10px 14px' }}
            >
              Cancel
            </Motion.button>
            <Motion.button type="submit" className="btn"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 1.0 * SPEED, ease: 'easeInOut' }}
              style={{ borderRadius: 10, padding: '12px 16px' }}
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
    const mq = typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)')
      : null

    const updateNavMode = (event) => {
      const canHover = event?.matches ?? false
      setIsTouchNav(!canHover)
      if (!canHover) {
        setLinksRevealed(false)
      }
    }

    if (!mq) {
      setIsTouchNav(true)
      setLinksRevealed(false)
      return () => {}
    }

    updateNavMode(mq)

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', updateNavMode)
      return () => mq.removeEventListener('change', updateNavMode)
    }

    if (typeof mq.addListener === 'function') {
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
  const navLinks = [
    { to: '/theater', label: 'Theater' },
    { to: '/production', label: 'Production' },
    { to: '/events', label: 'Events' },
    { to: '/people', label: 'People' },
  ]
  return (
    <header className="site-header">
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
    <div style={{ display: 'grid', rowGap: '2.4rem', justifyContent: 'center' }}>
      {names.slice(0, visibleCount).map((name, i) => {
        const isDim = hoverIndex !== null && hoverIndex !== i;
        const photo = photos[i] || '/placeholder-portrait.png';
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 440px) auto',
              alignItems: 'center',
              columnGap: '2rem'
            }}
          >
            {/* Name + Bio (left column) */}
            <div>
              <Motion.h1
                initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
                animate={{
                  opacity: isDim ? 0.65 : 1,
                  y: 0,
                  filter: isDim ? 'blur(1px)' : 'blur(0px)',
                  scale: isDim ? 0.75 : 1,
                  color: isDim ? '#6e6e73' : '#EAE6D6'
                }}
                transition={{ duration: 1.6 * SPEED, ease: 'easeInOut' }}
                whileHover={{ scale: 1.25, color: "#ffffff", transition: { duration: 1.6 * SPEED, ease: 'easeInOut' } }}
                style={{ textAlign: 'left', cursor: 'default' }}
                onHoverStart={() => { setHoverIndex(i); setRevealed(prev => { const next = new Set(prev); next.add(i); return next; }); }}
                onHoverEnd={() => setHoverIndex(null)}
              >
                {name}
              </Motion.h1>
              <Motion.p
                initial={{ opacity: 0, y: 8, filter: 'blur(1px)' }}
                animate={{
                  opacity: (hoverIndex === i || revealed.has(i) || autoShow) ? 1 : 0,
                  y: (hoverIndex === i || revealed.has(i) || autoShow) ? 0 : 8,
                  filter: (hoverIndex === i || revealed.has(i) || autoShow) ? 'blur(0px)' : 'blur(1px)',
                  scale: (hoverIndex !== null && hoverIndex !== i) ? 0.75 : 1,
                  color: (hoverIndex !== null && hoverIndex !== i) ? '#6e6e73' : '#cfcfd6'
                }}
                whileHover={{ scale: 1.25, color: '#ffffff', transition: { duration: 1.6 * SPEED, ease: 'easeInOut' } }}
                transition={{ duration: 2.4 * SPEED, ease: 'easeInOut' }}
                style={{
                  fontSize: '1rem',
                  maxWidth: '40ch',
                  marginTop: '0.25rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {bios[i]}
              </Motion.p>
              {/* Socials */}
              <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                <a href="https://instagram.com/placeholder" target="_blank" rel="noreferrer" style={{ color: '#EAE6D6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {instagramIcon} <span style={{ fontSize: 14 }}>Instagram</span>
                </a>
              </div>
            </div>

            {/* Photo (right column) */}
            <div
              onMouseEnter={() => { setHoverIndex(i); setRevealed(prev => { const next = new Set(prev); next.add(i); return next; }); }}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Motion.img
                src={photo}
                alt={`${name} portrait`}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isDim ? 0.65 : 1,
                  y: 0,
                  filter: isDim ? 'blur(1px)' : 'blur(0px)',
                  scale: isDim ? 0.75 : 1
                }}
                transition={{ duration: 1.6 * SPEED, ease: 'easeInOut', delay: 0.08 }}
                whileHover={{ scale: 1.15, boxShadow: "0 10px 28px rgba(0,0,0,0.28)", transition: { duration: 1.6 * SPEED, ease: 'easeInOut' } }}
                style={{
                  objectFit: "cover",
                  borderRadius: "12px",
                  display: "block",
                  width: 200,
                  height: 175,
                  background: '#222'
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  );
}

function PeoplePage() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="container hero__content" style={{ gap: 24 }}>
        <div style={{ maxWidth: '60ch' }}>
          <h2 style={{ margin: 0 }}>Meet the team</h2>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
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
    <section className="hero">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="container hero__content">
        <FadeWords
          words={["Theater", "Production", "Events"]}
          videos={["/media/fantastick.mov", "/media/production.mov", "/media/event.mov"]}
          interval={1000}
        />
      </div>
    </section>
  )
}

function PageShell({ title, videoSrc, description, highlights }) {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="container hero__content" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ gridColumn: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Motion.h1
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', color: '#EAE6D6' }}
            transition={{ duration: 0.8 * SPEED, ease: 'easeOut' }}
            whileHover={{ scale: 1.25, color: "#ffffff", transition: { duration: 1.6 * SPEED, ease: 'easeInOut' } }}
            style={{ textAlign: 'left' }}
          >
            {title}
          </Motion.h1>
          {description && (
            <p style={{ marginTop: '0.75rem', maxWidth: '52ch', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {description}
            </p>
          )}
          {highlights && (
            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', display: 'grid', gap: '0.35rem', color: 'var(--text-muted)' }}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ gridColumn: '2 / 3', display: 'flex', justifyContent: 'center' }}>
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 * SPEED, ease: 'easeOut', delay: 0.1 }}
            whileHover={{
              scale: 1.15,
              boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
              transition: { duration: 1.6 * SPEED, ease: 'easeInOut' }
            }}
          >
            <ControlledVideo src={videoSrc} poster="/media/poster-placeholder.jpg" width={300} height={220} />
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
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <span className="muted">Trusted by teams at</span>
      </div>
      <div className="logos__row">
        <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
        <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
        <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
        <div className="logoBox"><img src="/placeholder-logo.png" alt="Placeholder logo" style={{ maxHeight: '40px' }} /></div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="services" className="container grid2 features">
      <div>
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
    <section id="work" className="container showreel">
      <h2>Showreel</h2>
      {/* Swap the src with your real video or a Vimeo/YouTube embed */}
      <div className="videoWrap">
        <video controls playsInline poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop">
          <source src="" type="video/mp4" />
        </video>
      </div>
      <p className="muted">Prefer Vimeo/YouTube? Replace this block with their embed code.</p>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="container testimonials">
      <h2>What clients say</h2>
      <div className="grid3">
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
    <section id="contact" className="container cta">
      <h2>Ready to plan your show?</h2>
      <p>Tell us your date, venue, and goals. We’ll reply with options and pricing.</p>
      <a className="btn" href="mailto:hello@theatrico.co?subject=Theatrico Inquiry">Contact Theatrico</a>
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
