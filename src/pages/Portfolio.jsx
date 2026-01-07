import { useEffect } from 'react'
import Layout from '../components/Layout'
import Section from '../components/Section'

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
    description: 'Live route visualization and fleet management dashboard.',
    logo: '/portfolio/logistix_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React', 'Node/Express', 'SVG + Canvas'],
    link: 'https://d23933lj3ei2am.cloudfront.net'
  },
  {
    id: 'edubot',
    title: 'EduBot',
    description: 'AI tutor with curriculum-aligned responses.',
    logo: '/portfolio/edubot/logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React + TypeScript', 'OpenAI', 'Lambda'],
    link: '/portfolio/edubot'
  },
  {
    id: 'websites',
    title: 'Theatrico',
    description: 'Cinematic marketing site with video backgrounds.',
    logo: '/portfolio/tco_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React + Vite', 'Video optimization', 'CloudFront'],
    link: 'https://theatrico.org'
  },
  {
    id: 'absh',
    title: 'Andy Bond Signature Homes',
    description: 'Luxury real estate portfolio site.',
    logo: '/portfolio/absh/absh_logo.png',
    logoType: 'image',
    stack: ['React', 'Video backgrounds', 'S3'],
    link: 'https://andybondsignaturehomes.com'
  },
  {
    id: 'radio-free',
    title: 'Radio Free Chattanooga',
    description: 'Live audio streaming platform.',
    logo: '/portfolio/RFC_logo_clean.png',
    logoType: 'image',
    stack: ['Icecast', 'Liquidsoap', 'EC2'],
    link: '/stream/'
  },
  {
    id: 'sky-blocks',
    title: 'Sky Blocks Run',
    description: 'Endless runner game with adaptive gravity.',
    logo: '/portfolio/skyblocks_logo.png',
    logoType: 'image',
    stack: ['HTML5 Canvas', 'JavaScript', 'Mobile controls'],
    link: '/portfolio/sky-blocks-run.html'
  },
  {
    id: 'magic-h8',
    title: 'Magic H8 Ball',
    description: 'Interactive fortune-telling toy.',
    logo: '/portfolio/h8ball_logo.png',
    logoType: 'image',
    stack: ['HTML/CSS/JS', 'Motion detection', 'Animations'],
    link: '/portfolio/magic-h8-ball.html'
  },
  {
    id: 'job-hunter',
    title: 'Job Hunter',
    description: 'LinkedIn automation with AI cover letters.',
    logo: '/portfolio/jobhunter_logo.png',
    logoType: 'image',
    stack: ['Python + Selenium', 'Claude API', 'Easy Apply'],
    link: 'https://github.com/mjfxjas/job_hunter'
  },
  {
    id: 'aws-automations',
    title: 'AWS Cleanup Suite',
    description: 'Multi-service cleanup CLI with safety switches.',
    logo: '/portfolio/awscleanup_logo.png',
    logoType: 'image',
    stack: ['Python + boto3', 'Rich TUI', 'Dry-run defaults'],
    link: 'https://github.com/mjfxjas/aws_automations'
  },
  {
    id: 'aws-utils',
    title: 'AWS Toolbelt',
    description: 'Unified CLI for AWS operations.',
    logo: '/portfolio/awstoolset_logo.png',
    logoType: 'image',
    stack: ['Python CLI', 'Config-driven', 'Shell-friendly'],
    link: 'https://github.com/mjfxjas/aws-examples'
  },
  {
    id: 'wonder-dash',
    title: 'WonderDash',
    description: 'CloudFront terminal dashboard.',
    logo: '/portfolio/wonderdash_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['Python + Rich', 'Live metrics', 'CSV exports'],
    link: 'https://github.com/mjfxjas/wonder_dash'
  }
]

const FlowPreview = () => null
const CarouselPreview = () => null
const RunnerPreview = () => null
const EightBallPreview = () => null
const StreamPreview = () => null
const EdubotPreview = () => null
const ProjectPreview = () => null

export default function Portfolio() {
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
        id="portfolio"
        className="portfolio-section"
        heading="Recent Work"
        subheading="Interactive demos, production apps, and tools."
      >
        <div className="portfolio-grid">
          {projects.map((project) => {
            const isLink = Boolean(project.link)
            const CardTag = isLink ? 'a' : 'div'
            const isLargeLogo = project.logoSize === 'large'
            const logoSize = isLargeLogo ? 160 : 80
            const cardProps = isLink
              ? {
                  href: project.link,
                  target: project.link?.startsWith('http') ? '_blank' : undefined,
                  rel: project.link?.startsWith('http') ? 'noopener noreferrer' : undefined
                }
              : {}

            return (
              <CardTag
                key={project.id}
                className={`project-card ${!isLink ? 'project-card--static' : ''}`}
                {...cardProps}
              >
                <div className={`project-logo ${isLargeLogo ? 'logo-large' : ''}`}>
                  {project.logoType === 'image' ? (
                    <img
                      src={project.logo}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={logoSize}
                      height={logoSize}
                    />
                  ) : (
                    <span className="logo-text">{project.logo}</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-pills">
                  {project.stack.map((item) => (
                    <span key={item} className="stack-pill">{item}</span>
                  ))}
                </div>
              </CardTag>
            )
          })}
        </div>
      </Section>

      <Section id="contact" className="section--contact portfolio-contact">
        <div className="hero-actions">
          <a href="mailto:jon@theatrico.org" className="button">Get in Touch</a>
        </div>
      </Section>
    </Layout>
  )
}
