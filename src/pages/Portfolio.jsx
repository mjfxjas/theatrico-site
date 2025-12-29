import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import SafeLink from '../components/SafeLink'

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Technology', href: '/portfolio' },
  { label: 'Contact', href: 'mailto:jon@theatrico.org' }
]

const projects = [
  {
    id: 'logistics',
    title: 'Logistics Control Tower',
    description: 'Operational dashboard with live route visualization, health monitoring, and dispatch controls for fleet management.',
    previewType: 'flow',
    stack: [
      'React front-end',
      'Node/Express API layer',
      'SVG + Canvas data viz',
      'AWS S3 + CloudFront static delivery',
      'CloudFormation IaC',
      'CloudWatch monitoring'
    ],
    link: 'https://d23933lj3ei2am.cloudfront.net'
  },
  {
    id: 'websites',
    title: 'Website Portfolio',
    description: 'Professional marketing websites with cinematic design, responsive layouts, and modern web technologies.',
    previewType: 'carousel',
    sites: [
      { url: 'https://theatrico.org', name: 'Theatrico' },
      { url: 'https://andybondsignaturehomes.com', name: 'Andy Bond Signature Homes' }
    ],
    stack: [
      'React + Vite',
      'Video optimization + accessibility',
      'Anchor-friendly layout system',
      'AWS S3 + CloudFront',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'sky-blocks',
    title: 'Sky Blocks Run',
    description: 'Vertical endless runner game with adaptive gravity, procedural platforms, and zero-gravity sections. Built with HTML5 Canvas for 60fps performance on mobile and desktop.',
    previewType: 'game',
    link: '/portfolio/sky-blocks-run.html',
    stack: [
      'HTML5 Canvas + JavaScript loop',
      'Procedural platform + powerup system',
      'Mobile touch + keyboard controls',
      'AWS S3 + CloudFront delivery',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'magic-h8',
    title: 'Magic H8 Ball',
    description: 'Interactive fortune-telling web toy with shake detection, animated responses, and a Rose Colored Glasses mode for positive affirmations.',
    previewType: 'eight-ball',
    link: '/portfolio/magic-h8-ball.html',
    stack: [
      'HTML / CSS / JavaScript',
      'Gesture + motion micro-interactions',
      'Lightweight embed-ready build',
      'AWS S3 + CloudFront hosting',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'radio-free',
    title: 'Radio Free Chattanooga',
    description: 'Custom live audio streaming platform with real-time broadcast controls, listener stats, and minimal-latency playback.',
    previewType: 'stream',
    link: 'https://theatrico.org/stream/',
    stack: [
      'Icecast streaming server',
      'Liquidsoap audio processing',
      'EC2 instance running 24/7',
      'Real-time listener stats',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'edubot',
    title: 'EduBot',
    description: 'AI-powered educational assistant with conversational interface, adaptive learning paths, and real-time feedback for students.',
    previewType: 'edubot',
    link: '/portfolio/edubot',
    stack: [
      'React + TypeScript',
      'OpenAI API integration',
      'Real-time chat interface',
      'AWS Lambda + API Gateway',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'job-hunter',
    title: 'Job Hunter',
    description: 'Agentic AI automation for LinkedIn job applications with intelligent cover letter generation and form filling. Applies to 50+ jobs daily with zero manual input.',
    previewType: 'placeholder',
    placeholder: 'Video coming soon',
    stack: [
      'Python + Selenium automation',
      'Anthropic Claude API',
      'LinkedIn Easy Apply integration',
      'CSV logging + dashboard',
      'CloudWatch monitoring'
    ]
  },
  {
    id: 'aws-automations',
    title: 'AWS Automations – Cleanup Suite',
    description: 'Multi-service cleanup CLI with Rich live UI, safety switches, and JSON output. Handles S3, EC2, Lambda, EBS, CloudWatch, and IAM with dry-run by default.',
    previewType: 'placeholder',
    placeholder: 'CLI demo',
    stack: [
      'Python + boto3',
      'Rich live terminal UI',
      'Safety-first flags (dry-run, force gates)',
      'Least-privilege IAM guidance',
      'JSON/TTY-friendly output'
    ]
  },
  {
    id: 'aws-utils',
    title: 'AWS Utils – Operational Toolbelt',
    description: 'Unified CLI wrapper for day-to-day AWS operations and cleanup routines with composable commands and config-driven workflows.',
    previewType: 'placeholder',
    placeholder: 'CLI demo',
    stack: [
      'Python CLI',
      'Reusable command registry',
      'Config-driven presets',
      'Dry-run + logging defaults',
      'Shell-friendly UX'
    ]
  },
  {
    id: 'wonder-dash',
    title: 'WonderDash – CloudFront Console',
    description: 'Neon-styled Rich terminal dashboard for CloudFront and core AWS services with live metrics, keypress navigation, and CSV exports.',
    previewType: 'placeholder',
    placeholder: 'CLI demo',
    stack: [
      'Python + Rich TUI',
      'CloudFront live metrics',
      'S3/EC2/Lambda toolkits',
      'Config viewer + exports',
      'Theme toggle (Night/Green)'
    ]
  }
]

const FlowPreview = () => (
  <div className="preview-logistics">
    <iframe
      src="https://d23933lj3ei2am.cloudfront.net"
      title="Logistics Control Tower"
      loading="lazy"
      scrolling="no"
      style={{ overflow: 'hidden' }}
    />
  </div>
)

const CarouselPreview = ({ sites }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const handleDotClick = (i) => () => setActiveIndex(i)

  return (
    <div className="preview-carousel">
      <div className="carousel-frame">
        <iframe
          src={sites[activeIndex].url}
          title={sites[activeIndex].name}
          loading="lazy"
          scrolling="no"
          style={{ overflow: 'hidden' }}
        />
      </div>
      <div className="carousel-dots">
        {sites.map((site, i) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            aria-label={`Visit ${site.name}`}
          >
            {site.name === 'Theatrico' ? 'T' : 'A'}
          </a>
        ))}
      </div>
    </div>
  )
}

const RunnerPreview = () => (
  <div className="preview-runner">
    <iframe src="/portfolio/sky-blocks-run.html" title="Sky Blocks Run" loading="lazy" />
  </div>
)

const EightBallPreview = () => (
  <div className="preview-eightball">
    <iframe src="/embed-h8ball.html" title="Magic H8 Ball" />
  </div>
)

const StreamPreview = () => (
  <div className="preview-logistics">
    <iframe
      src="https://theatrico.org/stream/"
      title="Radio Free Chattanooga"
      loading="lazy"
    />
  </div>
)

const EdubotPreview = () => (
  <div className="preview-edubot">
    <iframe src="/portfolio/edubot" title="EduBot" loading="lazy" />
  </div>
)

const ProjectPreview = ({ project }) => {
  if (project.previewType === 'game') return <RunnerPreview />
  if (project.previewType === 'eight-ball') return <EightBallPreview />
  if (project.previewType === 'stream') return <StreamPreview />
  if (project.previewType === 'flow') return <FlowPreview />
  if (project.previewType === 'edubot') return <EdubotPreview />
  if (project.previewType === 'carousel' && project.sites) return <CarouselPreview sites={project.sites} />

  return (
    <div className="image-placeholder">
      <span>{project.placeholder ?? 'Preview'}</span>
    </div>
  )
}

export default function Portfolio() {
  const [activeStackId, setActiveStackId] = useState(null)

  useEffect(() => {
    if (typeof window.awsRum !== 'undefined') {
      window.awsRum.recordEvent('page_view', {
        page: 'portfolio'
      })
    }
  }, [])

  return (
    <Layout title="Technology - Theatrico" navLinks={navLinks}>
      <Section
        id="projects"
        className="portfolio-section"
        heading="Recent projects"
        subheading="Playable demos, operational tools, and live sites we've shipped."
      >
        <div className="portfolio-showcase">
          {projects.map((project) => (
            <article key={project.id} className="showcase-item">
              <div className="showcase-preview">
                <ProjectPreview project={project} />
              </div>
              <div className="showcase-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {Array.isArray(project.stack) && (
                  <div className="stack-pills">
                    {project.stack.slice(0, 3).map((item) => (
                      <span key={item} className="stack-pill">{item}</span>
                    ))}
                    {project.stack.length > 3 && (
                      <button
                        type="button"
                        className="text-button stack-button"
                        onClick={() => setActiveStackId(project.id)}
                      >
                        View stack
                      </button>
                    )}
                  </div>
                )}
                {project.link && (
                  <SafeLink href={project.link} className="text-button">
                    Visit site
                  </SafeLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contact" className="section--contact portfolio-contact">
        <div className="hero-actions">
          <a href="mailto:jon@theatrico.org" className="button">Get in Touch</a>
        </div>
      </Section>

      <StackModal
        project={projects.find((p) => p.id === activeStackId)}
        onClose={() => setActiveStackId(null)}
      />
    </Layout>
  )
}

const StackModal = ({ project, onClose }) => {
  const closeRef = useRef(null)
  const lastActiveRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = Array.from(document.querySelectorAll('.stack-modal button, .stack-modal a'))
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    lastActiveRef.current = document.activeElement
    closeRef.current?.focus()

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      lastActiveRef.current?.focus?.()
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="stack-modal" role="dialog" aria-modal="true" aria-label={`${project.title} tech stack`}>
      <div className="stack-modal__backdrop" onClick={onClose} />
      <div className="stack-modal__panel">
        <div className="stack-modal__header">
          <div>
            <p className="portfolio-eyebrow">Tech stack</p>
            <h3>{project.title}</h3>
            <p className="stack-note">All sites ship with CloudWatch monitoring and alerts.</p>
          </div>
          <button type="button" className="stack-modal__close" onClick={onClose} aria-label="Close stack details" ref={closeRef}>
            Close
          </button>
        </div>
        <ul className="stack-list">
          {project.stack?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
