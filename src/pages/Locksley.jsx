import { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../components/Layout'
import '../styles/locksley.css'

const LOCKSLEY_ESTIMATE_CONFIG = {
  submitEndpoint: '/api/estimate',
  contactTarget: 'jon@theatrico.org',
  note: 'Placeholder endpoint until Theatrico has a backend estimate handler.'
}

const navLinks = [
  { label: 'Estimate', href: '#locksley-estimate' },
  { label: 'Services', href: '#locksley-services' },
  { label: 'Area', href: '#locksley-service-area' },
  { label: 'Contact', href: '#locksley-contact' }
]

const treeConfig = {
  Interior: {
    rooms: ['Kitchen', 'Bathroom', 'Bedroom', 'Living room', 'Whole home', 'Laundry', 'Basement', 'Other'],
    work: ['Full renovation', 'Paint', 'Repair', 'Flooring', 'Drywall', 'Trim / finish', 'Layout changes', 'Cabinetry', 'Other']
  },
  Exterior: {
    rooms: ['Exterior', 'Roofline / trim', 'Deck / porch', 'Siding', 'Entry / facade', 'Windows / doors', 'Garage / detached', 'Other'],
    work: ['Repair', 'Paint', 'Trim / finish', 'Deck work', 'Siding', 'Addition', 'New build', 'Full renovation', 'Other']
  }
}

const initialDetailedValues = {
  company: '',
  projectScope: [],
  roomArea: [],
  workType: [],
  projectDescription: '',
  goals: '',
  painPoints: '',
  budgetRange: '',
  timeline: '',
  address: '',
  cityRegion: '',
  propertyType: '',
  occupancy: '',
  squareFootage: '',
  ageOfHome: '',
  decisionMaker: '',
  startReadiness: '',
  materialsSelected: '',
  siteAccess: '',
  permitsHoa: '',
  specialConditions: [],
  inspiration: '',
  name: '',
  email: '',
  phone: '',
  preferredContact: '',
  bestTimeToReach: '',
  referralSource: ''
}

const initialInteractiveData = {
  projectDescription: '',
  goals: '',
  painPoints: '',
  budgetRange: '',
  timeline: '',
  startReadiness: '',
  address: '',
  cityRegion: '',
  occupancy: '',
  siteAccess: '',
  name: '',
  email: '',
  phone: '',
  preferredContact: ''
}

const optionGroups = {
  scope: ['Interior', 'Exterior'],
  roomArea: ['Kitchen', 'Bathroom', 'Bedroom', 'Living room', 'Whole home', 'Laundry', 'Basement', 'Exterior', 'Roofline / trim', 'Deck / porch', 'Siding', 'Entry / facade', 'Windows / doors', 'Other'],
  workType: ['Full renovation', 'Paint', 'Repair', 'Flooring', 'Drywall', 'Trim / finish', 'Layout changes', 'Cabinetry', 'Deck work', 'Siding', 'Addition', 'New build', 'Other'],
  specialConditions: ['Water damage', 'Structural concern', 'Mold / moisture', 'Active leak', 'Insurance claim', 'Prior unfinished work']
}

const serviceCards = [
  {
    icon: 'icon-kitchen',
    tag: 'Interior',
    title: 'Kitchens, baths, and whole-home renovation',
    copy: 'Layout updates, finish upgrades, utility coordination, and refined detailing where the house needs it most.'
  },
  {
    icon: 'icon-exterior',
    tag: 'Exterior',
    title: 'Exterior repair, paint, trim, and envelope work',
    copy: 'Targeted work that improves curb appeal, durability, and readiness for larger phased improvements.'
  },
  {
    icon: 'icon-build',
    tag: 'Build',
    title: 'Additions and new-build execution support',
    copy: 'Early scoping through active construction, with cleaner project intake before the first walkthrough.'
  }
]

const interactiveStepLabels = [
  'Scope',
  'Areas',
  'Work',
  'Narrative',
  'Budget',
  'Logistics',
  'Contact'
]

const scopeIconMap = {
  Interior: 'icon-kitchen',
  Exterior: 'icon-exterior'
}

const requiredFields = [
  'projectScope',
  'roomArea',
  'workType',
  'projectDescription',
  'goals',
  'budgetRange',
  'timeline',
  'name',
  'email',
  'phone',
  'preferredContact',
  'address',
  'cityRegion',
  'occupancy',
  'decisionMaker',
  'startReadiness'
]

function Icon({ id }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <use href={`/media/locksley/icons.svg#${id}`} />
    </svg>
  )
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0
  return String(value || '').trim().length > 0
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)))
}

function validateDetailed(values) {
  const errors = {}

  requiredFields.forEach((field) => {
    if (!hasValue(values[field])) errors[field] = 'Required'
  })

  if (values.projectDescription.trim() && values.projectDescription.trim().length < 30) {
    errors.projectDescription = 'Add more detail so we can qualify the project well.'
  }

  if (values.goals.trim() && values.goals.trim().length < 15) {
    errors.goals = 'Tell us more about the result you want.'
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email.'
  }

  const digits = values.phone.replace(/\D/g, '')
  if (values.phone.trim() && digits.length < 10) {
    errors.phone = 'Enter a valid phone number.'
  }

  return errors
}

function TextField({ label, name, value, onChange, error, type = 'text', placeholder = '', full = false }) {
  return (
    <div className={full ? 'locksley-field locksley-field-full' : 'locksley-field'}>
      <label htmlFor={`locksley-${name}`}>{label}</label>
      <input id={`locksley-${name}`} name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
      {error && <div className="locksley-error-text">{error}</div>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, error, children }) {
  return (
    <div className="locksley-field">
      <label htmlFor={`locksley-${name}`}>{label}</label>
      <select id={`locksley-${name}`} name={name} value={value} onChange={onChange}>
        <option value="">Select one</option>
        {children}
      </select>
      {error && <div className="locksley-error-text">{error}</div>}
    </div>
  )
}

function TextareaField({ label, name, value, onChange, error, placeholder = '', hint = '' }) {
  return (
    <div className="locksley-field locksley-field-full">
      <label htmlFor={`locksley-${name}`}>{label}</label>
      <textarea id={`locksley-${name}`} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      {hint && <div className="locksley-field-hint">{hint}</div>}
      {error && <div className="locksley-error-text">{error}</div>}
    </div>
  )
}

function PillGroup({ label, name, options, values, onToggle, error }) {
  return (
    <div className="locksley-field locksley-field-full">
      <span className="locksley-label">{label}</span>
      <div className="locksley-choice-grid">
        {options.map((option) => (
          <label className="locksley-choice-pill" key={`${name}-${option}`}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={() => onToggle(name, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <div className="locksley-error-text">{error}</div>}
    </div>
  )
}

export default function Locksley() {
  const formRef = useRef(null)
  const [mode, setMode] = useState('interactive')
  const [detailedValues, setDetailedValues] = useState(initialDetailedValues)
  const [interactiveScopes, setInteractiveScopes] = useState([])
  const [interactiveRooms, setInteractiveRooms] = useState({})
  const [interactiveWork, setInteractiveWork] = useState({})
  const [interactiveData, setInteractiveData] = useState(initialInteractiveData)
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState(null)
  const [interactiveStatus, setInteractiveStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll('.locksley-page .locksley-reveal'))
    revealTargets.forEach((el, index) => {
      el.style.setProperty('--locksley-reveal-delay', `${Math.min(index, 10) * 65}ms`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    revealTargets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const selectedRooms = useMemo(
    () => uniqueValues(interactiveScopes.flatMap((scope) => interactiveRooms[scope] || [])),
    [interactiveRooms, interactiveScopes]
  )

  const selectedWork = useMemo(
    () => uniqueValues(interactiveScopes.flatMap((scope) => interactiveWork[scope] || [])),
    [interactiveScopes, interactiveWork]
  )

  const interactiveStepState = useMemo(() => {
    const hasNarrative = interactiveData.projectDescription.trim().length >= 30 && interactiveData.goals.trim().length >= 15
    const hasBudget = Boolean(interactiveData.budgetRange && interactiveData.timeline && interactiveData.startReadiness)
    const hasLogistics = Boolean(interactiveData.address && interactiveData.cityRegion && interactiveData.occupancy)
    const hasContact = Boolean(interactiveData.name && interactiveData.email && interactiveData.phone && interactiveData.preferredContact)

    return [
      interactiveScopes.length > 0,
      selectedRooms.length > 0,
      selectedWork.length > 0,
      hasNarrative,
      hasBudget,
      hasLogistics,
      hasContact
    ]
  }, [interactiveData, interactiveScopes.length, selectedRooms.length, selectedWork.length])

  const interactiveProgress = useMemo(() => {
    const completed = interactiveStepState.filter(Boolean).length
    return Math.round((completed / interactiveStepState.length) * 100)
  }, [interactiveStepState])

  const selectionSummary = useMemo(() => ([
    {
      label: 'Scope',
      value: interactiveScopes.length ? interactiveScopes.join(' + ') : 'Choose scope',
      active: interactiveScopes.length > 0
    },
    {
      label: 'Areas',
      value: selectedRooms.length ? selectedRooms.slice(0, 3).join(', ') : 'No areas yet',
      active: selectedRooms.length > 0
    },
    {
      label: 'Work',
      value: selectedWork.length ? selectedWork.slice(0, 3).join(', ') : 'No work types yet',
      active: selectedWork.length > 0
    },
    {
      label: 'Timing',
      value: interactiveData.timeline || 'Open',
      active: Boolean(interactiveData.timeline)
    }
  ]), [interactiveData.timeline, interactiveScopes, selectedRooms, selectedWork])

  const onInputChange = (event) => {
    const { name, value } = event.target
    setDetailedValues((current) => ({ ...current, [name]: value }))
  }

  const onInteractiveInputChange = (event) => {
    const { name, value } = event.target
    setInteractiveData((current) => ({ ...current, [name]: value }))
  }

  const toggleDetailedValue = (name, value) => {
    setDetailedValues((current) => {
      const values = current[name].includes(value)
        ? current[name].filter((item) => item !== value)
        : [...current[name], value]
      return { ...current, [name]: values }
    })
  }

  const toggleScope = (scope) => {
    setInteractiveStatus('')
    setInteractiveScopes((current) => {
      if (current.includes(scope)) {
        setInteractiveRooms((rooms) => {
          const next = { ...rooms }
          delete next[scope]
          return next
        })
        setInteractiveWork((work) => {
          const next = { ...work }
          delete next[scope]
          return next
        })
        return current.filter((item) => item !== scope)
      }
      return [...current, scope]
    })
  }

  const toggleTreeValue = (setter, scope, value) => {
    setInteractiveStatus('')
    setter((current) => {
      const existing = current[scope] || []
      const nextValues = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value]
      return { ...current, [scope]: nextValues }
    })
  }

  const validateInteractiveTree = () => {
    if (!interactiveScopes.length) return 'Select at least one broad project scope.'
    if (!selectedRooms.length) return 'Select at least one room or area.'
    if (!selectedWork.length) return 'Select at least one work type.'
    if (interactiveData.projectDescription.trim().length < 30) return 'Add a more detailed project description.'
    if (interactiveData.goals.trim().length < 15) return 'Add the outcome you want.'
    if (!interactiveData.budgetRange.trim()) return 'Select a budget range.'
    if (!interactiveData.timeline.trim()) return 'Select a timeline.'
    if (!interactiveData.startReadiness.trim()) return 'Select start readiness.'
    if (!interactiveData.address.trim()) return 'Add the project address.'
    if (!interactiveData.cityRegion.trim()) return 'Add the city or region.'
    if (!interactiveData.occupancy.trim()) return 'Select occupancy.'
    if (!interactiveData.name.trim()) return 'Add the contact name.'
    if (!interactiveData.email.trim()) return 'Add the contact email.'
    if (!interactiveData.phone.trim()) return 'Add the contact phone.'
    if (!interactiveData.preferredContact.trim()) return 'Select the preferred contact method.'
    return ''
  }

  const syncInteractiveToDetailed = () => {
    setDetailedValues((current) => ({
      ...current,
      projectScope: interactiveScopes,
      roomArea: selectedRooms,
      workType: selectedWork,
      projectDescription: interactiveData.projectDescription,
      goals: interactiveData.goals,
      painPoints: interactiveData.painPoints,
      budgetRange: interactiveData.budgetRange,
      timeline: interactiveData.timeline,
      startReadiness: interactiveData.startReadiness,
      address: interactiveData.address,
      cityRegion: interactiveData.cityRegion,
      occupancy: interactiveData.occupancy,
      siteAccess: interactiveData.siteAccess,
      name: interactiveData.name,
      email: interactiveData.email,
      phone: interactiveData.phone,
      preferredContact: interactiveData.preferredContact,
      decisionMaker: current.decisionMaker || 'I am the sole decision maker',
      propertyType: current.propertyType || 'Primary residence'
    }))
  }

  const buildDetailedRequest = () => {
    const validationMessage = validateInteractiveTree()
    if (validationMessage) {
      setInteractiveStatus(validationMessage)
      return
    }

    syncInteractiveToDetailed()
    setMode('detailed')
    setInteractiveStatus('')
    setFormStatus({
      kind: 'success',
      message: 'Interactive selections applied. Review the detailed form, add anything else, then submit.'
    })
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const resetInteractive = () => {
    setInteractiveScopes([])
    setInteractiveRooms({})
    setInteractiveWork({})
    setInteractiveData(initialInteractiveData)
    setInteractiveStatus('')
  }

  const resetAll = () => {
    setDetailedValues(initialDetailedValues)
    resetInteractive()
    formRef.current?.reset()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateDetailed(detailedValues)
    setErrors(validationErrors)
    setFormStatus(null)

    if (Object.keys(validationErrors).length > 0) {
      setFormStatus({ kind: 'error', message: 'Please fix the highlighted fields and resubmit.' })
      return
    }

    const formData = new FormData(formRef.current)
    setIsSubmitting(true)

    try {
      const response = await fetch(LOCKSLEY_ESTIMATE_CONFIG.submitEndpoint, {
        method: 'POST',
        body: formData
      })
      const text = await response.text()
      let result = null
      try {
        result = text ? JSON.parse(text) : null
      } catch {
        result = null
      }

      if (!response.ok) {
        setFormStatus({
          kind: 'error',
          message: result?.message || `Estimate submit is not wired yet. Backend integration should handle ${LOCKSLEY_ESTIMATE_CONFIG.submitEndpoint}.`
        })
        return
      }

      const attachmentNote = result?.attachments ? ` ${result.attachments} file(s) received.` : ''
      setFormStatus({ kind: 'success', message: `Request received. We will review the project details and follow up soon.${attachmentNote}` })
      resetAll()
    } catch {
      setFormStatus({
        kind: 'error',
        message: `Connection issue. The frontend is currently pointed at ${LOCKSLEY_ESTIMATE_CONFIG.submitEndpoint}; live submit needs backend integration.`
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout navLinks={navLinks} variant="locksley" showFooter={false}>
      <div className="locksley-page">
        <section className="locksley-hero" aria-labelledby="locksley-hero-title">
          <div className="locksley-container locksley-hero-grid">
            <div className="locksley-hero-copy locksley-reveal">
              <span className="locksley-eyebrow">Chattanooga / North Georgia / Lookout / Signal</span>
              <h1 id="locksley-hero-title">Estimate-first remodeling and build intake.</h1>
              <p>
                A serious project starts with a clear brief. 83 Locksley qualifies renovations, repairs, additions, and new-build work before the first walkthrough.
              </p>
              <div className="locksley-actions">
                <a className="locksley-btn locksley-btn-primary" href="#locksley-estimate">Start Estimate</a>
                <a className="locksley-btn locksley-btn-secondary" href="#locksley-services">View Scope</a>
              </div>
              <div className="locksley-metrics" aria-label="Project intake highlights">
                <div>
                  <Icon id="icon-plan" />
                  <strong>Fast intake</strong>
                  <span>Built to sort serious project details quickly.</span>
                </div>
                <div>
                  <Icon id="icon-scope" />
                  <strong>Interior + exterior</strong>
                  <span>Multiple scopes can be active in one request.</span>
                </div>
                <div>
                  <Icon id="icon-pin" />
                  <strong>Local focus</strong>
                  <span>Chattanooga, North Georgia, Lookout, and Signal.</span>
                </div>
              </div>
            </div>
            <div className="locksley-hero-visual locksley-reveal" aria-hidden="true">
              <div className="locksley-drafting-callout">
                <span>Structured intake</span>
                <strong>Estimator-first</strong>
              </div>
            </div>
            <aside className="locksley-estimate-panel locksley-reveal">
              <span className="locksley-eyebrow">Request Estimate</span>
              <h2>Lead with the project, not a vague contact form.</h2>
              <p>
                Pick a guided tree or open the full intake. The goal is a cleaner callback brief: scope, condition, timing, property constraints, and contact preference.
              </p>
              <ul>
                <li>Scope, rooms, and trade details</li>
                <li>Budget and timeline expectations</li>
                <li>Property conditions and access notes</li>
                <li>Decision-maker and readiness signals</li>
              </ul>
              <a className="locksley-btn locksley-btn-light" href="#locksley-estimate">Open Estimator</a>
            </aside>
          </div>
        </section>

        <section id="locksley-estimate" className="locksley-section locksley-estimator-section">
          <div className="locksley-container locksley-form-shell">
            <div className="locksley-form-card locksley-reveal">
              <div className="locksley-form-intro">
                <div>
                  <span className="locksley-eyebrow">Project Intake</span>
                  <h2>Request an estimate</h2>
                  <p>Use the expanding guided flow, or go straight into the complete form.</p>
                </div>
                <div className="locksley-intake-diagram" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="locksley-mode-switch" aria-label="Estimator mode">
                <button
                  className={mode === 'interactive' ? 'locksley-btn locksley-btn-primary' : 'locksley-btn locksley-btn-secondary'}
                  type="button"
                  aria-pressed={mode === 'interactive'}
                  onClick={() => setMode('interactive')}
                >
                  <Icon id="icon-scope" />
                  <span>Interactive guided flow</span>
                </button>
                <button
                  className={mode === 'detailed' ? 'locksley-btn locksley-btn-primary' : 'locksley-btn locksley-btn-secondary'}
                  type="button"
                  aria-pressed={mode === 'detailed'}
                  onClick={() => setMode('detailed')}
                >
                  <Icon id="icon-plan" />
                  <span>Detailed full form</span>
                </button>
              </div>

              {mode === 'interactive' && (
                <section className="locksley-interactive-estimator" aria-label="Interactive estimator">
                  <div className="locksley-interactive-progress">
                    <div>
                      <span className="locksley-eyebrow">Interactive Intake</span>
                      <div className="locksley-step-label">Select everything that applies. Each scope opens more options below.</div>
                    </div>
                    <div className="locksley-progress-cluster" aria-label={`${interactiveProgress}% complete`}>
                      <div className="locksley-progress-number">{interactiveProgress}%</div>
                      <div className="locksley-progress-track" style={{ '--locksley-progress': `${interactiveProgress}%` }} />
                    </div>
                  </div>

                  <div className="locksley-interactive-card">
                    <div className="locksley-step-map" aria-label="Interactive intake progress">
                      {interactiveStepLabels.map((label, index) => (
                        <div className={interactiveStepState[index] ? 'locksley-step-dot is-complete' : 'locksley-step-dot'} key={label}>
                          <span>{index + 1}</span>
                          <strong>{label}</strong>
                        </div>
                      ))}
                    </div>

                    <h3>Build the project scope.</h3>
                    <p>Interior and exterior can both be active, which is useful for phased or whole-property work.</p>

                    <div className="locksley-selection-strip" aria-label="Current estimator selections">
                      {selectionSummary.map((item) => (
                        <div className={item.active ? 'locksley-summary-chip is-active' : 'locksley-summary-chip'} key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="locksley-tree-section">
                      <div className="locksley-tree-label">Scope</div>
                      <div className="locksley-choice-grid locksley-choice-grid-two">
                        {optionGroups.scope.map((scope) => (
                          <button
                            className={`locksley-choice-action${interactiveScopes.includes(scope) ? ' is-selected' : ''}`}
                            type="button"
                            key={scope}
                            onClick={() => toggleScope(scope)}
                          >
                            <Icon id={scopeIconMap[scope]} />
                            <span>{scope}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="locksley-tree-branches">
                      {interactiveScopes.map((scope) => (
                        <div className="locksley-branch-card" key={scope}>
                          <div className="locksley-branch-head">
                            <h4>{scope}</h4>
                            <span>Active</span>
                          </div>
                          <div className="locksley-tree-section">
                            <div className="locksley-tree-label">Which areas?</div>
                            <div className="locksley-choice-grid">
                              {treeConfig[scope].rooms.map((room) => (
                                <button
                                  className={`locksley-choice-action${(interactiveRooms[scope] || []).includes(room) ? ' is-selected' : ''}`}
                                  type="button"
                                  key={`${scope}-${room}`}
                                  onClick={() => toggleTreeValue(setInteractiveRooms, scope, room)}
                                >
                                  {room}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="locksley-tree-section">
                            <div className="locksley-tree-label">What work is being done?</div>
                            <div className="locksley-choice-grid">
                              {treeConfig[scope].work.map((work) => (
                                <button
                                  className={`locksley-choice-action${(interactiveWork[scope] || []).includes(work) ? ' is-selected' : ''}`}
                                  type="button"
                                  key={`${scope}-${work}`}
                                  onClick={() => toggleTreeValue(setInteractiveWork, scope, work)}
                                >
                                  {work}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="locksley-tree-section">
                      <div className="locksley-tree-label">Project narrative</div>
                      <textarea name="projectDescription" value={interactiveData.projectDescription} onChange={onInteractiveInputChange} placeholder="Describe what is changing, what is broken, and what work you want done." />
                      <textarea name="goals" value={interactiveData.goals} onChange={onInteractiveInputChange} placeholder="What outcome are you after?" />
                      <textarea name="painPoints" value={interactiveData.painPoints} onChange={onInteractiveInputChange} placeholder="Known issues, pain points, or constraints." />
                    </div>

                    <div className="locksley-tree-grid">
                      <div className="locksley-tree-section">
                        <div className="locksley-tree-label">Budget / timing</div>
                        <select name="budgetRange" value={interactiveData.budgetRange} onChange={onInteractiveInputChange}>
                          <option value="">Budget range</option>
                          <option>Under $10,000</option>
                          <option>$10,000 - $25,000</option>
                          <option>$25,000 - $50,000</option>
                          <option>$50,000 - $100,000</option>
                          <option>$100,000+</option>
                          <option>Prefer to discuss</option>
                        </select>
                        <select name="timeline" value={interactiveData.timeline} onChange={onInteractiveInputChange}>
                          <option value="">Desired timeline</option>
                          <option>ASAP</option>
                          <option>Within 30 days</option>
                          <option>1-3 months</option>
                          <option>3-6 months</option>
                          <option>6+ months</option>
                          <option>Just exploring</option>
                        </select>
                        <select name="startReadiness" value={interactiveData.startReadiness} onChange={onInteractiveInputChange}>
                          <option value="">How ready are you to start?</option>
                          <option>Ready now</option>
                          <option>Need pricing first</option>
                          <option>Need design / scope help</option>
                          <option>Early research stage</option>
                        </select>
                      </div>

                      <div className="locksley-tree-section">
                        <div className="locksley-tree-label">Project logistics</div>
                        <input name="address" type="text" value={interactiveData.address} placeholder="Project address" onChange={onInteractiveInputChange} />
                        <input name="cityRegion" type="text" value={interactiveData.cityRegion} placeholder="City / region" onChange={onInteractiveInputChange} />
                        <select name="occupancy" value={interactiveData.occupancy} onChange={onInteractiveInputChange}>
                          <option value="">Will the home be occupied during work?</option>
                          <option>Yes, occupied full time</option>
                          <option>Partially occupied</option>
                          <option>No, vacant during work</option>
                        </select>
                        <input name="siteAccess" type="text" value={interactiveData.siteAccess} placeholder="Site access notes (optional)" onChange={onInteractiveInputChange} />
                      </div>
                    </div>

                    <div className="locksley-tree-grid">
                      <div className="locksley-tree-section">
                        <div className="locksley-tree-label">Contact</div>
                        <input name="name" type="text" value={interactiveData.name} placeholder="Full name" onChange={onInteractiveInputChange} />
                        <input name="email" type="email" value={interactiveData.email} placeholder="Email" onChange={onInteractiveInputChange} />
                        <input name="phone" type="tel" value={interactiveData.phone} placeholder="Phone" onChange={onInteractiveInputChange} />
                        <select name="preferredContact" value={interactiveData.preferredContact} onChange={onInteractiveInputChange}>
                          <option value="">Preferred contact method</option>
                          <option>Email</option>
                          <option>Phone</option>
                          <option>Text</option>
                        </select>
                      </div>

                      <div className="locksley-tree-section locksley-finish-panel">
                        <div className="locksley-tree-label">Finish interactive intake</div>
                        <p>The guided answers move into the detailed form for review, files, special conditions, and final submit.</p>
                        {interactiveStatus && <div className="locksley-form-status error">{interactiveStatus}</div>}
                        <button className="locksley-btn locksley-btn-primary" type="button" onClick={buildDetailedRequest}>
                          Build my detailed request
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <form
                ref={formRef}
                className={mode === 'detailed' ? 'locksley-detailed-form is-visible' : 'locksley-detailed-form'}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="locksley-hp-field" aria-hidden="true">
                  <label htmlFor="locksley-company">Company</label>
                  <input id="locksley-company" name="company" type="text" tabIndex="-1" autoComplete="off" value={detailedValues.company} onChange={onInputChange} />
                </div>

                <PillGroup label="Project scope" name="projectScope" options={optionGroups.scope} values={detailedValues.projectScope} onToggle={toggleDetailedValue} error={errors.projectScope} />
                <PillGroup label="Room / area" name="roomArea" options={optionGroups.roomArea} values={detailedValues.roomArea} onToggle={toggleDetailedValue} error={errors.roomArea} />
                <PillGroup label="Requested work" name="workType" options={optionGroups.workType} values={detailedValues.workType} onToggle={toggleDetailedValue} error={errors.workType} />

                <TextareaField label="What do you want done?" name="projectDescription" value={detailedValues.projectDescription} onChange={onInputChange} error={errors.projectDescription} placeholder="Describe the work, current condition, what is changing, and anything broken or incomplete." hint="Include the issue, scope, and what triggered the project." />
                <TextareaField label="What outcome are you after?" name="goals" value={detailedValues.goals} onChange={onInputChange} error={errors.goals} placeholder="Better layout, cleaner finish, more space, resale prep, code cleanup, durability, etc." />
                <TextareaField label="Known issues or pain points" name="painPoints" value={detailedValues.painPoints} onChange={onInputChange} placeholder="Water damage, aging finishes, layout inefficiency, incomplete prior work, access constraints, timeline pressure, etc." />

                <div className="locksley-form-grid">
                  <SelectField label="Budget range" name="budgetRange" value={detailedValues.budgetRange} onChange={onInputChange} error={errors.budgetRange}>
                    <option>Under $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000+</option>
                    <option>Prefer to discuss</option>
                  </SelectField>
                  <SelectField label="Desired timeline" name="timeline" value={detailedValues.timeline} onChange={onInputChange} error={errors.timeline}>
                    <option>ASAP</option>
                    <option>Within 30 days</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                    <option>Just exploring</option>
                  </SelectField>
                  <TextField label="Project address" name="address" value={detailedValues.address} onChange={onInputChange} error={errors.address} placeholder="Street address" />
                  <TextField label="City / region" name="cityRegion" value={detailedValues.cityRegion} onChange={onInputChange} error={errors.cityRegion} placeholder="Chattanooga, Signal Mountain, North Georgia..." />
                  <SelectField label="Property type" name="propertyType" value={detailedValues.propertyType} onChange={onInputChange}>
                    <option>Primary residence</option>
                    <option>Second home</option>
                    <option>Investment property</option>
                    <option>Rental</option>
                    <option>Other</option>
                  </SelectField>
                  <SelectField label="Will the home be occupied during work?" name="occupancy" value={detailedValues.occupancy} onChange={onInputChange} error={errors.occupancy}>
                    <option>Yes, occupied full time</option>
                    <option>Partially occupied</option>
                    <option>No, vacant during work</option>
                  </SelectField>
                  <TextField label="Approximate project size" name="squareFootage" value={detailedValues.squareFootage} onChange={onInputChange} placeholder="Room size, square footage, or rough scale" />
                  <TextField label="Age of home / structure" name="ageOfHome" value={detailedValues.ageOfHome} onChange={onInputChange} placeholder="Ex: 1990s build, 1930s home, not sure" />
                  <SelectField label="Decision-maker status" name="decisionMaker" value={detailedValues.decisionMaker} onChange={onInputChange} error={errors.decisionMaker}>
                    <option>I am the sole decision maker</option>
                    <option>Shared decision with spouse / partner</option>
                    <option>Need additional approvals</option>
                  </SelectField>
                  <SelectField label="How ready are you to start?" name="startReadiness" value={detailedValues.startReadiness} onChange={onInputChange} error={errors.startReadiness}>
                    <option>Ready now</option>
                    <option>Need pricing first</option>
                    <option>Need design / scope help</option>
                    <option>Early research stage</option>
                  </SelectField>
                  <SelectField label="Materials / finishes selected?" name="materialsSelected" value={detailedValues.materialsSelected} onChange={onInputChange}>
                    <option>Yes, mostly selected</option>
                    <option>Partially selected</option>
                    <option>No, need guidance</option>
                  </SelectField>
                  <TextField label="Site access notes" name="siteAccess" value={detailedValues.siteAccess} onChange={onInputChange} placeholder="Steep drive, limited parking, gated access, etc." />
                  <SelectField label="Permits / HOA constraints" name="permitsHoa" value={detailedValues.permitsHoa} onChange={onInputChange}>
                    <option>None known</option>
                    <option>HOA involved</option>
                    <option>Permits likely needed</option>
                    <option>Not sure yet</option>
                  </SelectField>
                </div>

                <div className="locksley-field locksley-field-full">
                  <span className="locksley-label">Special conditions</span>
                  <div className="locksley-checkbox-grid">
                    {optionGroups.specialConditions.map((condition) => (
                      <label className="locksley-checkbox-item" key={condition}>
                        <input
                          type="checkbox"
                          name="specialConditions"
                          value={condition}
                          checked={detailedValues.specialConditions.includes(condition)}
                          onChange={() => toggleDetailedValue('specialConditions', condition)}
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                <TextareaField label="Reference notes / inspiration" name="inspiration" value={detailedValues.inspiration} onChange={onInputChange} placeholder="If you have a style reference, material direction, or example project in mind, describe it here." />

                <div className="locksley-field locksley-field-full">
                  <label htmlFor="locksley-projectFiles">Photos, screenshots, or PDFs</label>
                  <input id="locksley-projectFiles" name="projectFiles" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" multiple />
                  <div className="locksley-field-hint">Upload up to 5 files. Useful for damage photos, inspiration, plans, or scope references.</div>
                </div>

                <div className="locksley-form-grid">
                  <TextField label="Full name" name="name" value={detailedValues.name} onChange={onInputChange} error={errors.name} placeholder="Your name" full />
                  <TextField label="Email" name="email" type="email" value={detailedValues.email} onChange={onInputChange} error={errors.email} placeholder="you@example.com" />
                  <TextField label="Phone" name="phone" type="tel" value={detailedValues.phone} onChange={onInputChange} error={errors.phone} placeholder="(555) 555-5555" />
                  <SelectField label="Preferred contact method" name="preferredContact" value={detailedValues.preferredContact} onChange={onInputChange} error={errors.preferredContact}>
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Text</option>
                  </SelectField>
                  <SelectField label="Best time to reach you" name="bestTimeToReach" value={detailedValues.bestTimeToReach} onChange={onInputChange}>
                    <option>Morning</option>
                    <option>Midday</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Flexible</option>
                  </SelectField>
                  <TextField label="How did you hear about us?" name="referralSource" value={detailedValues.referralSource} onChange={onInputChange} placeholder="Referral, search, drive-by, social, repeat client, etc." full />
                </div>

                {formStatus && <div className={`locksley-form-status ${formStatus.kind}`}>{formStatus.message}</div>}

                <div className="locksley-actions">
                  <button className="locksley-btn locksley-btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>

            <aside className="locksley-sidebar-card locksley-reveal">
              <div className="locksley-icon locksley-icon-frame"><Icon id="icon-build" /></div>
              <span className="locksley-eyebrow">Why this form is long</span>
              <h3>Generic leads waste time.</h3>
              <div className="locksley-side-diagram" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>This intake is intentionally detailed so the project can be qualified correctly before the next conversation.</p>
              <ul className="locksley-checklist">
                <li>Filters out vague, low-quality inquiries</li>
                <li>Surfaces access, timing, and readiness issues early</li>
                <li>Creates a better callback brief internally</li>
                <li>Improves speed to a real next step</li>
              </ul>
              <p className="locksley-microcopy">
                Temporary submit endpoint: <strong>{LOCKSLEY_ESTIMATE_CONFIG.submitEndpoint}</strong>
              </p>
              <p className="locksley-microcopy">{LOCKSLEY_ESTIMATE_CONFIG.note}</p>
            </aside>
          </div>
        </section>

        <section id="locksley-services" className="locksley-section">
          <div className="locksley-container">
            <div className="locksley-section-head locksley-reveal">
              <span className="locksley-eyebrow">Services</span>
              <h2>High-value residential work, kept focused.</h2>
            </div>
            <div className="locksley-grid-three">
              {serviceCards.map((card) => (
                <article className="locksley-card locksley-reveal" key={card.title}>
                  <div className="locksley-icon locksley-icon-frame"><Icon id={card.icon} /></div>
                  <span className="locksley-tag">{card.tag}</span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="locksley-section">
          <div className="locksley-container locksley-about-grid">
            <div className="locksley-illustration locksley-illustration-interior locksley-reveal" aria-hidden="true" />
            <div className="locksley-info-panel locksley-reveal">
              <span className="locksley-eyebrow">Process</span>
              <h2>Better intake. Better follow-through.</h2>
              <p>
                The estimator captures scope, readiness, property conditions, and communication preferences upfront so follow-up can be useful instead of generic.
              </p>
            </div>
            <div className="locksley-info-panel locksley-reveal">
              <span className="locksley-eyebrow">Project Fit</span>
              <ul className="locksley-checklist">
                <li>Quick repairs and larger renovations</li>
                <li>Additions and new-build support</li>
                <li>Interior finish work and exterior refreshes</li>
                <li>Premium residential work that needs a clear brief</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="locksley-service-area" className="locksley-section">
          <div className="locksley-container locksley-contact-grid">
            <div className="locksley-contact-card locksley-reveal">
              <span className="locksley-eyebrow">Service Area</span>
              <h3>Chattanooga and surrounding mountain / North Georgia markets.</h3>
              <p>Including Chattanooga, Signal Mountain, Lookout Mountain, and North Georgia residential projects.</p>
            </div>
            <div id="locksley-contact" className="locksley-contact-card locksley-reveal">
              <span className="locksley-eyebrow">Next Step</span>
              <h3>Use the estimate request as the first conversation.</h3>
              <p>The intake drives follow-up. It is the fastest way to start a serious project discussion.</p>
              <div className="locksley-actions">
                <a className="locksley-btn locksley-btn-primary" href="#locksley-estimate">Request Estimate</a>
                <a className="locksley-btn locksley-btn-secondary" href={`mailto:${LOCKSLEY_ESTIMATE_CONFIG.contactTarget}`}>Email Directly</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="locksley-footer">
          <div className="locksley-container locksley-footer-inner">
            <div>
              <div className="locksley-footer-brand">83 Locksley</div>
              <div className="locksley-footer-copy">Request estimate / Chattanooga / North Georgia / Lookout / Signal</div>
            </div>
            <a className="locksley-btn locksley-btn-secondary" href="#locksley-estimate">Start Estimate</a>
          </div>
        </footer>
      </div>
    </Layout>
  )
}
