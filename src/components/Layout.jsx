import Navigation from './Navigation'

const Layout = ({ children, navLinks, variant = 'default', className = '' }) => {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className={`site-shell ${variant}-shell ${className}`}>
      <Navigation navLinks={navLinks} variant={variant} />
      <main id="top">
        {children}
      </main>
      <footer className="site-footer">
        <p>© {currentYear} Theatrico. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout