import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import SafeLink from '../components/SafeLink'

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Technology', href: '/portfolio' },
  { label: 'Scrumble', href: 'https://scrumble.dev' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]



const heroHighlights = [
  {
    title: 'Pitch-to-premiere',
    note: 'End-to-end story development, production, and finishing in one shop.'
  },
  {
    title: 'On-location agility',
    note: 'Chattanooga-based crew with multi-cam, drone, and audio packages ready to roll.'
  },
  {
    title: 'Delivery for every channel',
    note: 'Masters, social cutdowns, captioned files, and stills shipped together.'
  }
]

const workItems = [
  {
    heading: 'Collier Construction',
    context: 'campaign profile • Chattanooga, TN',
    summary:
      'Mill Town: Renovation Realized—an intimate exploration of transforming a neglected landmark into vibrant community space.',
    href: 'https://f.io/DVheTNyr',
    media: {
      type: 'video',
      src: '/media/mill-town-collier.mov',
      mimeType: 'video/quicktime',
      title: 'Collier Construction film',
      poster: '/media/mill-town-collier-poster.jpg'
    }
  },
  {
    heading: 'Hefferlin Kronenberg Architects',
    context: 'architectural story • Tennessee Riverfront',
    summary:
      'Cinematic walkthrough of the HK architects studio and featured projects, blending design process interviews with light-driven exterior and aerial coverage.',
    href: 'https://f.io/JgRH-VMw',
    media: {
      type: 'video',
      src: '/media/hk-mill-town.mov',
      mimeType: 'video/quicktime',
      title: 'Hefferlin Kronenberg Architects film',
      poster: '/media/hk-mill-town-poster.jpg'
    }
  },
  {
    heading: 'Sandtown',
    context: 'feature documentary • 2023',
    summary:
      'A 1h 40m documentary produced by Mama Bear Studios, capturing Sandtown with long-form, observational storytelling.',
    href: 'https://www.imdb.com/title/tt29030969/',
    ctaLabel: 'Trailer',
    media: {
      type: 'youtube',
      id: 'BcQiPeCZy18',
      title: 'Sandtown trailer'
    }
  },
  {
    heading: 'Rollers',
    context: 'narrative feature • 2021',
    summary:
      'Produced by Mama Bear Studios, Rollers follows Rufus Paisley as he fights to keep his inherited nightclub alive amid addiction and mounting debts.',
    href: 'https://www.imdb.com/title/tt9124868/',
    ctaLabel: 'Trailer',
    media: {
      type: 'youtube',
      id: 's9Gbe89Hdho',
      title: 'Rollers trailer'
    }
  }
]

const approach = [
  {
    phase: 'Story Architecture',
    detail: 'Discovery workshop, interview sourcing, and beat sheets that map each film to audience goals.'
  },
  {
    phase: 'Production Windows',
    detail: 'Lean crew, multi-cam setups, drone coverage, and high-fidelity audio tailored to each venue.'
  },
  {
    phase: 'Editorial & Finishing',
    detail: 'Color, graphics, captions, and sound design that align with existing brand standards.'
  },
  {
    phase: 'Delivery & Activation',
    detail: 'Masters, social cutdowns, thumbnails, and implementation guidance for web, social, and events.'
  }
]

const capabilities = [
  'FX-3 series cinema cameras with cine prime kit and backup systems.',
  'Licensed drone operations covering downtown Chattanooga footprint.',
  'Location audio: dual lavaliers, shotgun, and backup recorders.',
  'Lighting design tuned for historic interiors and mixed-color venues.',
  'On-set DIT and redundant backups for multi-day shoots.',
  'Post-production in DaVinci Resolve and Adobe Creative Cloud.',
  'Captioning, transcription, and accessibility deliverables built-in.',
  'Secure review portals with version tracking and feedback capture.'
]

const packages = [
  {
    name: 'Single Story',
    price: 'Starting at $4,200',
    description: 'One flagship film (60-90 sec) plus social cutdowns and captioned masters.',
    includes: ['Pre-production workshop', 'Full-day production', 'Two editorial rounds', 'Captions + thumbnail stills']
  },
  {
    name: 'Seasonal Mini-Series',
    price: 'Starting at $11,500',
    description: 'Three-episode arc with shared look, staggered release plan, and partner spotlights.',
    includes: ['Story arc development', 'Two production windows', 'Bespoke graphics package', 'Four social teasers']
  },
  {
    name: 'Annual Campaign',
    price: 'Starting at $28,000',
    description: 'Twelve-film roadmap covering legacy, impact, partners, and future campaign messaging.',
    includes: ['Quarterly production blocks', 'Dedicated post supervisor', 'Asset library management', 'On-call add-on days']
  }
]

export default function Film() {

  return (
    <Layout navLinks={navLinks} variant="film">
      <section className="hero film-hero" aria-labelledby="film-hero-title">
        <div className="hero-media" aria-hidden="true">
          <video
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/film_hero_poster.jpg"
          >
            <source src="/assets/film_hero_silent.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="film-intro">
        <div className="film-intro-content">
          <h1 className="scroll-fade">Cinematic Storytelling</h1>
          <p className="hero-lead">
            We build cinematic stories for businesses, cultural institutions, and events that deserve to be remembered.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Start a Project
            </a>
          </div>
        </div>
        <div className="hero-grid">
          {heroHighlights.map(({ title, note }) => (
            <article key={title}>
              <header>{title}</header>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <Section 
        id="work" 
        heading="Selected film work" 
        subheading="Series, campaigns, and performance captures we have recently delivered."
      >
        <div className="section-list film-work-list">
          {workItems.map(({ heading, context, summary, href, ctaLabel, media }) => (
            <article key={heading}>
              <header>
                <h3>{heading}</h3>
                <span>{context}</span>
              </header>
              <p>{summary}</p>
              {media && (
                <div className="work-media" aria-label={`${heading} media`}>
                  {media.type === 'video' ? (
                    <video
                      controls
                      preload="metadata"
                      {...(media.poster ? { poster: media.poster } : {})}
                      title={media.title ?? `${heading} video`}
                    >
                      <source src={media.src} type={media.mimeType ?? 'video/mp4'} />
                    </video>
                  ) : null}
                  {media?.type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${media.id}`}
                      title={media.title ?? `${heading} trailer`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : null}
                </div>
              )}
              {href && (
                <SafeLink className="work-cta" href={href}>
                  {ctaLabel ?? 'Watch the piece'}
                </SafeLink>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section 
        id="approach" 
        variant="columns"
        className="film-approach"
        heading="How we work" 
        subheading="Every series moves through the same calm, precise cadence."
      >
        <div className="section-columns">
          {approach.map(({ phase, detail }) => (
            <article key={phase}>
              <h3>{phase}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="film-capabilities">
          <h3>Capabilities</h3>
          <ul>
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="contact" variant="contact" className="film-contact">
        <div className="contact-card">
          <h2>Bring us into your next season.</h2>
          <p>
            Share your goals, timeline, and stakeholders. We will respond within one business day with a tailored outline,
            initial schedule, and production availability.
          </p>
          <ul>
            <li>
              <a href="mailto:jon@theatrico.org">jon@theatrico.org</a>
            </li>
            <li>
              <a href="tel:14233940817">423-394-0817</a>
            </li>
          </ul>
        </div>
      </Section>
    </Layout>
  )
}
