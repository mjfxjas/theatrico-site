import Navigation from './Navigation'

const Layout = ({
  children,
  navLinks = [],
  variant = 'default',
  className = '',
  showNavigation = true,
  showFooter = true
}) => {
  const currentYear = new Date().getFullYear()

  const shellClassName = ['site-shell', `${variant}-shell`, className, !showNavigation ? 'no-nav' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={shellClassName}>
      {showNavigation && <Navigation navLinks={navLinks} variant={variant} />}
      <main id="top">
        {children}
      </main>
      {showFooter && (
        <footer className="site-footer">
          <p>© {currentYear} Theatrico. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default Layout
