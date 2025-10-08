const Section = ({ 
  id, 
  className = '', 
  heading, 
  subheading, 
  children, 
  variant = 'default' 
}) => {
  const sectionClass = [
    'section',
    variant !== 'default' && `section--${variant}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <section id={id} className={sectionClass}>
      {(heading || subheading) && (
        <div className="section-heading">
          {heading && <h2>{heading}</h2>}
          {subheading && <p>{subheading}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export default Section