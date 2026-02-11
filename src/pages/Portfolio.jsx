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

const engineeringFocus = {
  summary:
    'I build and operate production web systems with an emphasis on secure delivery, practical reliability, and maintainable cloud operations.',
  detail:
    'Recent work has centered on AWS serverless architecture, CI/CD hardening, IAM/OIDC security, deployment troubleshooting, and release workflows that are safer under real production pressure.',
  stack: ['AWS', 'Terraform', 'SAM/CloudFormation', 'GitHub Actions', 'React', 'Node', 'Python']
}

const featuredProjects = [
  {
    id: 'scrumble',
    title: 'Scrumble',
    description: 'Production serverless application with hardened AWS deployment workflows.',
    logo: 'SC',
    logoType: 'text',
    logoSize: 'large',
    stack: ['AWS SAM', 'Lambda', 'DynamoDB', 'GitHub Actions', 'OIDC + IAM'],
    outcomes: [
      'Replaced static AWS keys in CI with GitHub OIDC role assumption and trust-policy controls.',
      'Standardized backend deploy flow with safer parameter handling and rollback-aware troubleshooting.',
      'Reduced deployment risk by making IAM gaps explicit and codifying repeatable policy updates.'
    ],
    link: 'https://scrumble.cc'
  },
  {
    id: 'logistics',
    title: 'Logistics Control Tower',
    description: 'Live route visibility and fleet operations dashboard for active delivery workflows.',
    logo: '/portfolio/logistix_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React', 'Node/Express', 'SVG + Canvas', 'CloudFront'],
    outcomes: [
      'Consolidated route status, map context, and fleet controls into a single operator view.',
      'Improved dispatch responsiveness by reducing tool-switching across operations tasks.',
      'Shipped frontend and backend updates through a repeatable CI/CD path for faster release cycles.'
    ],
    link: 'https://d23933lj3ei2am.cloudfront.net'
  },
  {
    id: 'edubot',
    title: 'EduBot',
    description: 'AI tutoring assistant with curriculum-aware prompts and serverless delivery.',
    logo: '/portfolio/edubot/logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React + TypeScript', 'OpenAI', 'Lambda'],
    outcomes: [
      'Implemented structured prompt and response flow to keep outputs aligned to classroom context.',
      'Used serverless deployment to keep runtime costs predictable at low-to-moderate traffic.',
      'Delivered a practical prototype that can be extended into production guardrails and analytics.'
    ],
    link: '/portfolio/edubot'
  },
  {
    id: 'websites',
    title: 'Theatrico',
    description: 'High-performance marketing site built for media-heavy storytelling.',
    logo: '/portfolio/tco_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['React + Vite', 'Video optimization', 'CloudFront'],
    outcomes: [
      'Balanced cinematic media design with practical delivery constraints for mobile and desktop.',
      'Maintained reliable release flow via GitHub Actions checks and controlled deploy steps.',
      'Preserved brand quality while improving operational maintainability for ongoing content updates.'
    ],
    link: 'https://theatrico.org'
  }
]

const additionalProjects = [
  {
    id: 'aws-automations',
    title: 'AWS Cleanup Suite',
    description: 'Multi-service cleanup CLI with safety-first defaults.',
    logo: '/portfolio/awscleanup_logo.png',
    logoType: 'image',
    stack: ['Python + boto3', 'Rich TUI', 'Dry-run defaults'],
    link: 'https://github.com/mjfxjas/aws_automations'
  },
  {
    id: 'wonder-dash',
    title: 'WonderDash',
    description: 'Terminal dashboard for CloudFront usage visibility.',
    logo: '/portfolio/wonderdash_logo.png',
    logoType: 'image',
    logoSize: 'large',
    stack: ['Python + Rich', 'Live metrics', 'CSV exports'],
    link: 'https://github.com/mjfxjas/wonder_dash'
  },
  {
    id: 'radio-free',
    title: 'Radio Free Chattanooga',
    description: 'Live community audio streaming stack.',
    logo: '/portfolio/RFC_logo_clean.png',
    logoType: 'image',
    stack: ['Icecast', 'Liquidsoap', 'EC2'],
    link: '/stream/'
  },
  {
    id: 'absh',
    title: 'Andy Bond Signature Homes',
    description: 'Luxury real estate portfolio site.',
    logo: '/portfolio/absh/absh_logo.png',
    logoType: 'image',
    stack: ['React', 'Video backgrounds', 'S3'],
    link: 'https://andybondsignaturehomes.com'
  }
]

const labsProjects = [
  {
    id: 'aws-utils',
    title: 'AWS Toolbelt (Lab)',
    description: 'Config-driven command-line toolkit for routine AWS tasks.',
    logo: '/portfolio/awstoolset_logo.png',
    logoType: 'image',
    stack: ['Python CLI', 'Config-driven', 'Shell-friendly'],
    link: 'https://github.com/mjfxjas/aws-examples'
  },
  {
    id: 'radio-free',
    title: 'Job Hunter (Lab)',
    description: 'Job-application workflow experiment with browser automation.',
    logo: '/portfolio/jobhunter_logo.png',
    logoType: 'image',
    stack: ['Python + Selenium', 'LLM API', 'Workflow automation'],
    link: 'https://github.com/mjfxjas/job_hunter'
  },
  {
    id: 'sky-blocks',
    title: 'Sky Blocks Run (Lab)',
    description: 'Game mechanics experiment for mobile controls and physics.',
    logo: '/portfolio/skyblocks_logo.png',
    logoType: 'image',
    stack: ['HTML5 Canvas', 'JavaScript', 'Mobile controls'],
    link: '/portfolio/sky-blocks-run.html'
  },
  {
    id: 'magic-h8',
    title: 'Magic H8 Ball (Lab)',
    description: 'Interaction and animation prototype for playful UI effects.',
    logo: '/portfolio/h8ball_logo.png',
    logoType: 'image',
    stack: ['HTML/CSS/JS', 'Motion detection', 'Animations'],
    link: '/portfolio/magic-h8-ball.html'
  }
]

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
        id="featured-work"
        className="portfolio-section"
        heading="Featured Work"
        subheading="Production systems with real delivery and operations impact."
      >
        <div className="portfolio-grid">
          {featuredProjects.map((project) => {
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
                {Array.isArray(project.outcomes) && project.outcomes.length > 0 && (
                  <ul className="project-outcomes">
                    {project.outcomes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
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

      <Section
        id="additional-work"
        className="portfolio-section"
        heading="Additional Production Work"
        subheading="Client sites and supporting platform tools."
      >
        <div className="portfolio-grid">
          {additionalProjects.map((project) => {
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

      <Section
        id="engineering-focus"
        className="portfolio-section"
        heading="Engineering Focus"
        subheading="How I approach delivery and operations."
      >
        <div className="hiring-snapshot-card">
          <p className="hiring-role-target">{engineeringFocus.summary}</p>
          <p className="hiring-location">{engineeringFocus.detail}</p>
          <div className="stack-pills">
            {engineeringFocus.stack.map((item) => (
              <span key={item} className="stack-pill">{item}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="labs"
        className="portfolio-section"
        heading="Labs / Experiments"
        subheading="Smaller prototypes that sharpen UI and automation skills."
      >
        <div className="portfolio-grid">
          {labsProjects.map((project) => {
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
