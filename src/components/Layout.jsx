import { useEffect } from 'react'
import Navigation from './Navigation'

const Layout = ({
  children,
  navLinks = [],
  variant = 'default',
  className = '',
  showNavigation = true,
  showFooter = true
}) => {
  const currentYear = new Date().getFullYear()

  const shellClassName = ['site-shell', `${variant}-shell`, className, !showNavigation ? 'no-nav' : '']
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    const revealSelectors = [
      '.section-list article',
      '.section-columns article',
      '.team-profile',
      '.showcase-item',
      '.film-service-grid article',
      '.film-work-list article',
      '.film-package-grid article',
      '.film-approach .section-columns article'
    ]

    const revealTargets = Array.from(document.querySelectorAll(revealSelectors.join(',')))
    revealTargets.forEach((el) => el.classList.add('reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )

    revealTargets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fadeTargets = Array.from(document.querySelectorAll('.scroll-fade'))
    fadeTargets.forEach((el) => {
      el.style.transform = ''
      el.style.opacity = ''
    })
  }, [])

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('.hero-bg-video'))
    if (videos.length === 0) return undefined

    let ticking = false
    const update = () => {
      const viewportMid = window.innerHeight / 2
      videos.forEach((video) => {
        const rect = video.getBoundingClientRect()
        const delta = viewportMid - (rect.top + rect.height / 2)
        const shift = Math.max(-14, Math.min(14, delta * 0.05))
        const opacity = Math.max(0.6, Math.min(1, 1 - Math.abs(shift) / 40))
        video.style.transform = `translateY(${shift}px) scale(1.02)`
        video.style.opacity = opacity.toFixed(2)
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={shellClassName}>
      {showNavigation && <Navigation navLinks={navLinks} variant={variant} />}
      <main id="top">
        {children}
      </main>
      {showFooter && (
        <footer className="site-footer">
          <p>© {currentYear} Theatrico. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default Layout
