import Layout from '../components/Layout'
import Section from '../components/Section'
import SafeLink from '../components/SafeLink'

const navLinks = [
  { label: 'Theater', href: '#recent-theater' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Technology', href: '/portfolio' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]

const recentWorks = [
  {
    id: 'fantasticks',
    title: 'The Fantasticks!',
    venue: 'West Village, Chattanooga',
    description: 'Classic musical theater in an outdoor setting.',
    pressLinks: [
      { url: 'https://www.wutc.org/podcast/scenic-roots/2023-07-13/theatrico-brings-the-fantasticks-to-chattanoogas-west-village', label: 'Press' },
      { url: 'https://newschannel9.com/this-n-that/recently-on-tnt/the-west-villages-theatrico-presents-the-fantasticks', label: 'Press' }
    ],
    media: { type: 'video', src: '/media/fantastick.mov', poster: '/media/fantastick-poster.jpg' }
  },
  {
    id: 'last-five-years',
    title: 'The Last Five Years',
    venue: 'Barking Legs Theater, Chattanooga',
    description: 'An intimate musical exploring love through time.',
    pressLinks: [
      { url: 'https://newschannel9.com/the-daily-refresh/theatrico-champions-theatres-role-in-promoting-strong-community-bonds', label: 'Press' },
      { url: 'https://www.rachelzatcoff.com/performance-photos?pgid=lzij4kp0-644fa40a-99da-4c25-a248-20940145dc6a', label: 'Rachel Zatcoff' }
    ],
    media: { type: 'image', src: '/media/last-five-years.jpg', srcSet: '/media/last-five-years2.png 2x' }
  },
  {
    id: 'camp-broadway',
    title: 'Camp Broadway',
    venue: 'Memorial Auditorium, Chattanooga',
    description: 'Youth theater intensive program.',
    pressLinks: [
      { url: 'https://tivolichattanooga.com/Education/camp-broadway', label: 'Camp Broadway' }
    ],
    media: { type: 'youtube', src: 'LkX1lgm1gZ0' }
  },
  {
    id: 'motor-car-festival',
    title: 'Chattanooga Motorcar Festival',
    venue: 'Chattanooga, TN',
    description: 'Celebrating automotive heritage and community.',
    pressLinks: [
      { url: 'https://chattanoogamotorcar.com', label: 'Festival Website' }
    ],
    media: { type: 'youtube', src: 'lawUTdpMRnM' }
  }
]

const principles = [
  {
    id: 'precision',
    title: 'Precision feels kind.',
    detail: 'We over-prepare, then choreograph the night so artists and guests never feel the seams.'
  },
  {
    id: 'space',
    title: 'Space is storytelling.',
    detail: 'Every riser, table, and quiet corner is a punctuation mark—we draw the map, then walk it with you.'
  },
  {
    id: 'calm',
    title: 'Calm is contagious.',
    detail: 'We keep crews composed, cues clear, and calls gentle. The room trusts teams who listen.'
  }
]

export default function Home() {
  const resolveMediaSrc = (media) => {
    if (!media) return ''
    if (media.type === 'youtube') return media.src
    if (media.cacheBust) {
      const separator = media.src.includes('?') ? '&' : '?'
      return `${media.src}${separator}v=${media.cacheBust}`
    }
    return media.src
  }

  return (
    <Layout navLinks={navLinks}>
      <section className="hero theater-hero" aria-labelledby="theater-hero-title">
        <div className="hero-media" aria-hidden="true">
          <video
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/hero_poster.jpg"
          >
            <source src="/assets/hero_silent.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="hero-eyebrow hero-eyebrow--center">PRECISION PRODUCTIONS • CHATTANOOGA</p>
        <div className="hero-actions hero-actions--anchor">
          <a className="button" href="mailto:jon@theatrico.org">
            Start a Project
          </a>
          <a className="button button--outline" href="https://www.instagram.com/theatricochatt/" target="_blank" rel="noopener noreferrer">
            Follow Along
          </a>
        </div>
      </section>

      <Section 
        id="recent-theater" 
        heading="RECENT PRODUCTIONS"
        headingClassName=""
        subheading="Theater in Motion"
      >
        <div className="section-list">
          {recentWorks.map(({ id, title, venue, description, pressLinks, media }) => {
            const mediaSrc = resolveMediaSrc(media)
            return (
              <article key={id}>
                <header>
                  <h3>{title}</h3>
                  <span>{venue}</span>
                </header>
                <p>{description}</p>
                {media && (
                  <div className="work-media" aria-label={`${title} media`}>
                    {media.type === 'image' && (
                      <img
                        src={mediaSrc}
                        {...(media.srcSet ? { srcSet: media.srcSet } : {})}
                        alt={title}
                        loading="lazy"
                      />
                    )}
                    {media.type === 'video' && (
                      <video
                        controls
                        preload="metadata"
                        {...(media.poster ? { poster: media.poster } : {})}
                        title={`${title} video`}
                      >
                        <source src={mediaSrc} type="video/mp4" />
                        <source src={mediaSrc} type="video/quicktime" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {media.type === 'youtube' && (
                      <iframe
                        src={`https://www.youtube.com/embed/${media.src}`}
                        title={`${title} video`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    )}
                  </div>
                )}
                {Array.isArray(pressLinks) && pressLinks.length > 0 && (
                  <div className="press-links">
                    {pressLinks.map(({ url, label }) => (
                      <SafeLink key={url} href={url} className="press-link">
                        {label}
                      </SafeLink>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </Section>

      <section className="home-contact">
        <h2>Let’s build something together.</h2>
        <div className="hero-actions">
          <a className="button" href="mailto:jon@theatrico.org">
            Start a Project
          </a>
          <a className="button button--outline" href="mailto:jon@theatrico.org">
            Book a Conversation
          </a>
        </div>
      </section>
    </Layout>
  )
}
