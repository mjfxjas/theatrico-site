import { useEffect, useRef } from 'react'

const Section = ({ 
  id, 
  className = '', 
  heading, 
  subheading, 
  children, 
  variant = 'default',
  headingClassName = '',
  subheadingClassName = ''
}) => {
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.2 }
    )

    const heading = headingRef.current
    if (heading) {
      observer.observe(heading)
      const subheading = heading.parentElement?.querySelector('p')
      if (subheading) observer.observe(subheading)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const h1 = subheadingRef.current
    if (!h1) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const translateX = Math.min(30, scrolled / 10)
      h1.style.transform = `translateX(${translateX}px)`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sectionClass = [
    'section',
    variant !== 'default' && `section--${variant}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <section id={id} className={sectionClass}>
      {(heading || subheading) && (
        <div className="section-heading">
          {subheading && <h1 ref={subheadingRef} className={['section-subheading-h1', subheadingClassName].filter(Boolean).join(' ')}>{subheading}</h1>}
          {heading && <h2 ref={headingRef} className={headingClassName}>{heading}</h2>}
        </div>
      )}
      {children}
    </section>
  )
}

export default Section
