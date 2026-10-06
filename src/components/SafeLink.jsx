import { safeLinkAttributes } from './safe-link.js'

const SafeLink = ({ href, children, className, target, rel, ...props }) => (
  <a
    className={className}
    {...props}
    {...safeLinkAttributes(href, { target, rel })}
  >
    {children}
  </a>
)

export default SafeLink
