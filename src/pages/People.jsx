import Layout from '../components/Layout'
import Section from '../components/Section'

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Technology', href: '/portfolio' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]

const teamMembers = [
  {
    id: 'mary-catherine',
    name: 'Mary Catherine Schimpf',
    title: 'Director, Choreographer, Founder',
    bio: 'Mary Catherine brings precision and artistry to every production, crafting experiences that move audiences through carefully orchestrated moments of discovery and connection.',
    photo: '/media/MCheadshot.JPG',
    photoAlt: 'Mary Catherine Schimpf headshot'
  },
  {
    id: 'jonathan',
    name: 'Jonathan Schimpf',
    title: 'Cinematographer, Editor, Producer',
    bio: 'Jonathan captures the essence of live performance through cinematic storytelling, weaving together light, movement, and narrative to preserve the magic of ephemeral moments.'
  }
]

import { useEffect, useRef } from 'react'

export default function People() {
  const titleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      },
      { threshold: 0.2 }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Layout navLinks={navLinks}>
      <section className="hero hero--compact">
        <div className="hero-copy">
          <p className="hero-eyebrow">leadership / vision / craft</p>
          <h1 ref={titleRef} className="scroll-fade">The people behind the theater.</h1>
          <p className="hero-lead">
            Theatrico is built by practitioners who understand that great experiences emerge from deep collaboration, 
            careful preparation, and genuine care for both artists and audiences.
          </p>
        </div>
      </section>

      <Section
        id="team"
        heading="Team"
        subheading="The directors, producers, and craftspeople who bring each project to life."
        variant="compact"
      >
        <div className="team-roster">
          {teamMembers.map(({ id, name, title, bio, photo, photoAlt }) => (
            <article key={id} className="team-profile">
              <div className={`profile-image${photo ? ' profile-image--has-photo' : ''}`}>
                {photo && (
                  <img src={photo} alt={photoAlt ?? `${name} portrait`} loading="lazy" />
                )}
              </div>
              <div className="profile-content">
                <header className="profile-header">
                  <h3 className="profile-name">{name}</h3>
                  <p className="profile-title">{title}</p>
                </header>
                <p className="profile-bio">{bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="people-contact">
        <h2>Theater with Us</h2>
        <div className="hero-actions">
          <a className="button" href="mailto:jon@theatrico.org">
            Join Our Team
          </a>
          <a className="button button--outline" href="mailto:jon@theatrico.org">
            Collaborate
          </a>
        </div>
      </section>
    </Layout>
  )
}
