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
    id: 'theatrico-portfolio',
    title: 'Theatrico Portfolio',
    description: 'Public portfolio showcasing current theater, film, and technology work.',
    logo: '/portfolio/tco_logo.png',
    logoType: 'image',
    stack: ['React + Vite', 'Media-rich UI', 'CloudFront'],
    outcomes: [
      'Consolidates public project work in a single, easy-to-scan destination.',
      'Maintains a stable release workflow for ongoing updates and content changes.',
      'Balances visual presentation with practical performance and maintainability.'
    ],
    link: 'https://theatrico.org/portfolio'
  }
]

const additionalProjects = [
  {
    id: 'aws-automations',
    title: 'aws-automations',
    description: 'Published Python package for AWS automation utilities.',
    logo: 'AA',
    logoType: 'text',
    stack: ['Python', 'PyPI', 'AWS'],
    link: 'https://pypi.org/project/aws-automations/'
  },
  {
    id: 'aws-cost-optimizer',
    title: 'aws-cost-optimizer',
    description: 'Published Python package focused on AWS cost optimization workflows.',
    logo: 'ACO',
    logoType: 'text',
    stack: ['Python', 'PyPI', 'AWS Billing'],
    link: 'https://pypi.org/project/aws-cost-optimizer/'
  },
  {
    id: 'wonder-dash',
    title: 'wonder-dash',
    description: 'Published Python package for terminal-based AWS usage dashboards.',
    logo: 'WD',
    logoType: 'text',
    stack: ['Python', 'PyPI', 'CLI'],
    link: 'https://pypi.org/project/wonder-dash/'
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
        subheading="Current public work with direct production and portfolio relevance."
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
        heading="Published Packages (PyPI)"
        subheading="Selected packages that are currently published and publicly installable."
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

      <Section id="contact" className="section--contact portfolio-contact">
        <div className="hero-actions">
          <a href="mailto:jon@theatrico.org" className="button">Get in Touch</a>
        </div>
      </Section>
    </Layout>
  )
}
