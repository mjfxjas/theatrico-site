const SafeLink = ({ href, children, className, ...props }) => {
  // Sanitize href to prevent XSS attacks
  const sanitizedHref = href && !href.toLowerCase().startsWith('javascript:') ? href : '#'
  
  // Improved external link detection
  const isExternal = sanitizedHref?.startsWith('https://') || 
                    sanitizedHref?.startsWith('http://') || 
                    sanitizedHref?.startsWith('//')
  
  return (
    <a 
      href={sanitizedHref}
      className={className}
      {...(isExternal && { 
        target: '_blank', 
        rel: 'noopener noreferrer' 
      })}
      {...props}
    >
      {children}
    </a>
  )
}

export default SafeLink