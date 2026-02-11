import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/TivoliProposal.css'

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]

const DOCUMENTS = [
  {
    title: 'Cover Letter (PDF)',
    description: 'Letter of introduction from Mary Catherine and Jonathan Schimpf.',
    file: '/media/tivoli/Theatrico-Tivoli-Cover-Letter.pdf'
  },
  {
    title: 'Visual Reference Deck',
    description: 'Mood, tone, and reference frames for the proposed video series.',
    file: '/media/tivoli/Theatrico-Tivoli-Deck.pdf'
  },
  {
    title: 'RFP Response',
    description: 'Complete proposal outlining scope, budget, and production approach.',
    file: '/media/tivoli/Theatrico-Tivoli-RFP.pdf'
  }
]

const DOWNLOAD_ALL = '/media/tivoli/theatrico-tivoli-proposal-package.zip'
const HERO_IMAGE = '/media/tivoli/tivoli-sign.png'

export default function TivoliProposal() {
  return (
    <Layout
      navLinks={navLinks}
      variant="landing"
      showNavigation
      showFooter={false}
      className="tivoli-shell"
    >
      <article className="tivoli-proposal">
        <section className="tivoli-proposal-hero" aria-labelledby="tivoli-hero-title">
          <img
            className="tivoli-proposal-hero-media"
            src={HERO_IMAGE}
            alt="Tivoli Theatre marquee signage"
          />
          <div className="tivoli-proposal-hero-content">
            <h2>THEATRICO × TIVOLI THEATRE FOUNDATION</h2>
            <h1 id="tivoli-hero-title">Video Series Proposal</h1>
            <p className="tivoli-proposal-hero-subtitle">
              A cinematic storytelling proposal to document the renovation of the Jewel of the South.
            </p>
            <p className="tivoli-proposal-hero-subtitle">October 2025</p>
            <a className="tivoli-proposal-downloads-link" href="#proposal-package">
              View the proposal package
            </a>
          </div>
        </section>

        <section
          className="tivoli-section tivoli-documents"
          id="proposal-package"
          aria-labelledby="proposal-package-heading"
        >
          <header className="tivoli-section-header">
            <span>Proposal Package</span>
            <h3 id="proposal-package-heading">Explore the materials</h3>
            <p>
              Review the cover letter, visual reference deck, and full proposal without leaving the page.
              Download the full packet if you prefer to view offline.
            </p>
          </header>

          <div className="tivoli-downloads">
            <a href={DOWNLOAD_ALL} download>
              Download all files (.zip)
            </a>
          </div>

          <div className="tivoli-documents-grid">
            {DOCUMENTS.map(({ title, description, file }) => (
              <article key={title} className="tivoli-doc-card">
                <header>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </header>
                <div className="tivoli-doc-frame">
                  <iframe title={title} src={`${file}#view=FitH`}>
                    <p>
                      Your browser cannot display this PDF.{' '}
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        Open the document in a new tab
                      </a>
                      .
                    </p>
                  </iframe>
                </div>
                <div className="tivoli-doc-links">
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    Open PDF
                  </a>
                  <a href={file} download>
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tivoli-section tivoli-about" aria-labelledby="about-theatrico-heading">
          <h4 id="about-theatrico-heading">About Theatrico</h4>
          <p>
            Theatrico produces cinematic storytelling for cultural institutions across Chattanooga.
            We partner with venues, nonprofits, and creative teams to develop narratives that honor place,
            people, and performance. Explore our film work to see the tone and craft we bring to every engagement.
          </p>
          <Link to="/film" className="about-cta">
            Visit the film portfolio →
          </Link>
        </section>

        <footer className="tivoli-custom-footer">
          <span className="logo-wordmark">theatrico</span>
          <nav aria-label="Contact and social links">
            <a href="mailto:jon@theatrico.org">jon@theatrico.org</a>
            <a href="https://www.instagram.com/theatricochatt/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="tel:14233940817">423-394-0817</a>
          </nav>
        </footer>
      </article>
    </Layout>
  )
}
