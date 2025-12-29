import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SafeLink from './SafeLink'

const SCROLL_OPTIONS = { behavior: 'smooth', block: 'start' }

const Navigation = ({ navLinks = [], variant = 'default' }) => {
  const [navOpen, setNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const toggleNav = () => setNavOpen((open) => !open)
  const closeNav = () => setNavOpen(false)

  const handleSectionClick = (href, event) => {
    if (!href.startsWith('#')) return

    event.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView(SCROLL_OPTIONS)
      setActiveSection(href)
    }
    closeNav()
  }

  const handleHomeClick = (event) => {
    closeNav()
    if (window.location.pathname !== '/') return

    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sectionElements = useMemo(() => {
    if (typeof document === 'undefined' || !Array.isArray(navLinks)) return []

    return navLinks
      .filter(({ href }) => href?.startsWith('#'))
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
  }, [navLinks])

  useEffect(() => {
    if (sectionElements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-20% 0px -70% 0px' }
    )

    sectionElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionElements])

  const renderLink = (label, href) => {
    if (href.startsWith('/')) {
      return (
        <Link to={href} onClick={() => { closeNav(); window.scrollTo(0, 0); }}>
          {label}
        </Link>
      )
    }

    return (
      <SafeLink
        href={href}
        className={href.startsWith('#') && activeSection === href ? 'active' : ''}
        onClick={(event) => {
          if (href.startsWith('#')) {
            handleSectionClick(href, event)
          } else {
            closeNav()
          }
        }}
      >
        {label}
      </SafeLink>
    )
  }

  return (
    <header className={`site-header ${variant}-header${navOpen ? ' nav-open' : ''}`}>
      <div className="site-header-inner">
        <Link to="/" className="site-identity" onClick={handleHomeClick}>
          <span className="site-brand">theatrico</span>
        </Link>

        <a 
          href="https://www.instagram.com/theatricochatt/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-link"
          aria-label="Follow us on Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        <nav id="site-navigation" className={`site-nav${navOpen ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {navLinks.map(({ label, href }) => (
              <li key={href}>{renderLink(label, href)}</li>
            ))}
          </ul>
        </nav>

        <div className="nav-controls">
          <button
            type="button"
            className={`nav-toggle${navOpen ? ' is-active' : ''}`}
            aria-expanded={navOpen}
            aria-controls="site-navigation"
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navigation
