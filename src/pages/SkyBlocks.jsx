import Layout from '../components/Layout'
import Section from '../components/Section'

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Scrumble', href: 'https://scrumble.dev' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]

export default function SkyBlocks() {
  return (
    <Layout navLinks={navLinks} title="Sky Blocks Run">
      <section className="hero hero--compact">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-eyebrow">Game Prototype</p>
            <h1>Sky Blocks Run</h1>
            <p className="hero-lead">
              Vertical runner built in pure HTML5 Canvas with adaptive gravity, procedural platforms, and zero-gravity sections—tuned for 60fps on mobile and desktop.
            </p>
          </div>
        </div>
      </section>

      <Section
        id="play"
        heading="Play the demo"
        subheading="No installs. Just load and run."
        className="portfolio-section"
      >
        <div className="preview-frame preview-frame--page">
          <iframe
            src="/portfolio/sky-blocks-run.html"
            title="Sky Blocks Run game"
            loading="lazy"
            allow="accelerometer; fullscreen; gamepad; gyroscope"
          />
          <div className="preview-frame-label">Play Sky Blocks Run</div>
        </div>
      </Section>

      <Section
        id="tech"
        heading="What’s under the hood"
        className="portfolio-section"
      >
        <div className="section-columns">
          <article>
            <h3>Game feel</h3>
            <p>Adaptive gravity, coyote time, buffered jumps, and parallax stars for tactile motion without engine overhead.</p>
          </article>
          <article>
            <h3>Procedural pacing</h3>
            <p>Dynamic platform spacing, zero-G sequences, and power-up cadence tuned to keep runs varied.</p>
          </article>
          <article>
            <h3>Performance-first</h3>
            <p>Canvas-only rendering, lightweight effects (motion blur trails, dust), and mobile input handling for 60fps targets.</p>
          </article>
        </div>
      </Section>
    </Layout>
  )
}
