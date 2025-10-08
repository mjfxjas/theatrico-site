import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

// Static data moved outside component to prevent recreation on renders
const STATIC_DATA = {
  goals: [
  { id: 1, text: "Spotlight Tivoli's historic venues and renovation milestones with compelling storytelling." },
  { id: 2, text: "Drive donor engagement by highlighting mission, beneficiaries, and future vision." },
  { id: 3, text: 'Supply adaptable assets for web, social, events, and sponsor decks.' },
  { id: 4, text: "Maintain a consistent visual language that reinforces Tivoli's brand." },
  { id: 5, text: 'Track success via view-through rates, donor inquiries, and social engagement (KPIs set collaboratively in kickoff).' }
  ],
  seasons: [
  {
    title: 'Season 1: History',
    description: "Introduce the Tivoli's legacy through lived memories and milestones. We are committed to centering diverse voices that reflect the full breadth of the theatre community.",
    interviews: [
      'Community member who attended the Tivoli as a child.',
      'Veteran performer with first-hand stage experience.',
      'Longtime staff member or caretaker.'
    ],
    visuals: [
      'Archival photos and posters.',
      'Exterior marquees and interior architectural details.',
      'Before-and-after renovation imagery.'
    ]
  },
  {
    title: 'Season 2: Renovation Progress',
    description: 'Document the ongoing restoration work, craftsmanship, and transformation of the historic venue.',
    interviews: [
      'Lead architect or project manager overseeing renovation.',
      'Master craftsperson working on historic restoration details.',
      'Tivoli Foundation leadership discussing renovation milestones.'
    ],
    visuals: [
      'Construction and restoration work in progress.',
      'Before-and-after comparisons of renovated spaces.',
      'Craftspeople at work on historic details and finishes.'
    ]
  },
  {
    title: 'Season 3: Impact',
    description: 'Demonstrate community reach and educational value.',
    interviews: [
      'Chattanooga Symphony & Opera leadership.',
      'Chattanooga Ballet and Boys’ Choir partners.',
      'Epic Performances: Broadway, Music Tours, Comedy, Bobby Stone Film Series',
      'Legacy Community Partnerships: CSO, CHA Ballet, Boys Choir',
      'Education: Jewel Awards, Camp Broadway, TivEd'
    ],
    visuals: [
      'Workshops, student interactions, and partner events.',
      'Archival footage from Camp Broadway and Jewel Awards.',
      'Tivoli Education initiatives in action.'
    ]
  },
  {
    title: 'Season 4: Future',
    description: "Share the Foundation's vision for preservation, expansion, and new ventures.",
    interviews: [
      'Nick Wilkinson on strategic development.',
      'Tivoli executive leadership.',
      'Development stakeholders covering capital projects (black box theatre, new programming).'
    ],
    visuals: [
      'Renderings and architectural mockups.',
      'Construction prep, planning sessions, and community meetings.',
      'Cityscape drone footage tying the Tivoli to Chattanooga’s growth.'
    ]
  }
  ],
  scope: {
  preProduction: [
    'Discovery workshop and key stakeholder interviews (virtual or on-site).',
    'Story development, beat sheets, and shot lists per video.',
    'Talent sourcing and scheduling for primary interviews across Seasons 1-4.',
    'Scheduling, call sheets, and permitting/logistics planning.',
    'Archival research and prep (up to 2 existing asset pulls per video).'
  ],
  production: [
    'Principal photography in Chattanooga (1/2-1 day per video).',
    'On-location audio capture with lavaliers and shotgun microphones.',
    'Drone cinematography where feasible and compliant.',
    'Optional second camera operator on select shoots (as-needed basis).'
  ],
  postProduction: [
    'Assembly edit and sound design (8-10 editor hours per video).',
    'Color correction and grading for a premium finish.',
    'Post-production in DaVinci Resolve, Adobe Creative Cloud, and Final Cut.',
    'Custom lower-thirds and titles aligned to Tivoli brand guidelines.',
    'Captioning and accessibility exports.',
    'Two included rounds of revisions per video (additional revisions at $75/hr).'
  ],
  deliverables: [
    '12 master videos (60-90 sec) in 4K and 1080p h.264, organized into four thematic Seasons.',
    'Social-first cutdowns (square and vertical) for up to four priority videos.',
    'Caption files (.srt) and texted versions on request.',
    'Thumbnail stills pulled from graded footage.',
    'Archival footage log and delivery checklist.'
  ]
  },
  timeline: [
  { phase: 'Kickoff & Alignment', duration: 'Week 1', activities: 'Discovery session, KPI lock, scripting priorities.' },
  { phase: 'Pre-Production Blocks', duration: 'Weeks 2-5', activities: 'Story outlines, scheduling, archival pulls.' },
  { phase: 'Production Windows', duration: 'Weeks 6-11', activities: 'On-location shoots grouped by venue/theme.' },
  { phase: 'Editorial Sprints', duration: 'Weeks 7-14', activities: 'Rolling edits, review cycles, captions.' },
  { phase: 'Final Delivery', duration: 'Weeks 15-16', activities: 'Master exports, social cutdowns, asset handoff.' }
  ],
  budget: [
  { item: 'Complete Video (60-90 sec)', unitCost: '$2,500', quantity: '12', subtotal: '$30,000' },
  { item: 'Travel & Parking (local buffer)', unitCost: '$50', quantity: '12', subtotal: '$600' },
  { item: 'Contingency / Weather Hold', unitCost: '$250', quantity: '1', subtotal: '$250' }
  ],
  included: [
  'Pre-production planning and logistics ($250 value).',
  'Production crew, camera, audio, lighting ($800-$1,000 value).',
  'Post-production edit, graphics, color, captions ($1,000-$1,200 value).',
  'Licensing, storage, insurance coverage ($150-$200 value).'
  ],
  addOns: [
  'Long-form documentary cuts or additional b-roll days.',
  'Premium music licensing (Musicbed / bespoke compositions).',
  'Motion graphics package for sponsor intros/outros.',
  'Livestream or event recap coverage during key launches.'
  ],
  assumptions: [
  'Two revision rounds per video; additional changes billed at $75/hr.',
  'Client provides timely brand assets, logos, and existing archival media.',
  'Premium music outside stock libraries quoted separately.',
  'Drone usage subject to FAA clearance and weather; back-up day included in contingency.',
  'Project billed 50% retainer / 25% mid-point / 25% on final delivery (net 15).',
  'Footage and project files archived for 12 months; longer retention available on request.'
  ],
  pitchDeckSlides: [
  {
    title: 'Slide 1 - Cover / Hero Image',
    bullets: [
      'Full-bleed dramatic photo of the Tivoli marquee or stage.',
      'Dark cinematic overlay with bold title: "Proposal: Tivoli Theatre Renovation Video Series".',
      'Subtitle: Submitted by Chattanooga Chop Shop / Theatrico.'
    ]
  },
  {
    title: 'Slide 2 - Our Vision',
    bullets: [
      'Tagline: "Preserving History Through Modern Storytelling" (placeholder).',
      'Two to three sentence mission statement overlaying a faded background photo.'
    ]
  },
  {
    title: 'Slide 3 - Moodboard',
    bullets: [
      'Grid of six to eight reference images (skyline drone, timelapse, interviews, archival assets, warm lighting).',
      'Caption: "Tone: Intimate, Cinematic, Historic".'
    ]
  },
  {
    title: 'Slide 4 - Color Palette',
    bullets: [
      'Charcoal Black (#1A1A1A) as cinematic foundation.',
      'Antique Gold (#D4AF37) reflecting Tivoli interiors.',
      'Warm White (#F4F4F4) for text and balance.',
      'Muted Blue-Gray (#4B5D67) for cool contrast.',
      'Note: Palette guides lower-thirds, graphics, and overlays.'
    ]
  },
  {
    title: 'Slide 5 - Typography Style',
    bullets: [
      'Heading font: Sleek sans-serif (e.g., Avenir Next).',
      'Body font: Clean serif (e.g., Minion Pro).',
      'Include lower-third mockup with name/title bar in black and gold.'
    ]
  },
  {
    title: 'Slide 6 - Storytelling Approach',
    bullets: [
      'Diagram flow: History (archival) -> Renovation (drone/timelapse) -> People (interviews) -> Community Impact (finale).',
      'Short caption reinforcing progression.'
    ]
  },
  {
    title: 'Slide 7 - Sample Frames From Our Work',
    bullets: [
      'Three to four stills (drone, interiors, interview lighting).',
      'Caption each frame (e.g., "Cinematic interview lighting example").'
    ]
  },
  {
    title: 'Slide 8 - Production Timeline',
    bullets: [
      'Stylized milestone chart from November 2025 kickoff through delivery windows.',
      'Keep layout minimal and visual.'
    ]
  },
  {
    title: 'Slide 9 - Budget Overview',
    bullets: [
      'Modern table highlighting $2,500 per finished video (10-12 total).',
      'Side note: Includes music licensing, captions, archival integration.'
    ]
  },
  {
    title: 'Slide 10 - Why Theatrico',
    bullets: [
      "Full-bleed photo (gear setup or Tivoli exterior).",
      "Bold statement: \"We don't just film history. We preserve it, frame by frame.\"",
      'Centered contact info.'
    ]
  }
  ]
}

// Destructure static data for use in component
const { goals, seasons, scope, timeline, budget, included, addOns, assumptions, pitchDeckSlides } = STATIC_DATA

const navLinks = [
  { label: 'Theater', href: '/' },
  { label: 'Film', href: '/film' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: 'mailto:marycatherine@theatrico.org' }
]

export default function TivoliProposal() {
  return (
    <Layout navLinks={navLinks}>
      <section className="hero" style={{ minHeight: 'auto', padding: 'clamp(2rem, 4vw, 3rem) 0' }}>
        <div className="hero-content">
          <div className="hero-copy">
            <div style={{ marginBottom: '1rem' }}>
              <Link to="/" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.9rem' }}>← theatrico home</Link>
            </div>
            <p className="hero-eyebrow">Theatrico x Tivoli Theatre Foundation</p>
            <h1>Video Content Proposal</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', fontSize: '0.95rem', color: 'var(--ink-soft)', marginTop: '1rem' }}>
              <span>Prepared for: <strong>Tivoli Theatre Foundation</strong></span>
              <span>Prepared by: <strong>Jonathan, Theatrico</strong></span>
              <span>Date: September 30, 2025</span>
            </div>
          </div>
        </div>
      </section>

      <main style={{ padding: '0', display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)' }}>
        <section className="section" id="executive-summary">
          <h2>1. Executive Summary</h2>
          <p>
            Theatrico proposes a 12-part video series to document and celebrate the Tivoli Theatre's historic renovation and restoration. Each 60-90 second film will combine cinematic visuals, archival material, and testimonials to showcase the transformation of this landmark venue and give donors, sponsors, and patrons a vivid sense of the Foundation's preservation efforts ahead of upcoming campaigns.
          </p>
          <p>
            Our Chattanooga-based team brings in-house cinematography, editorial, and finishing to
            deliver polished stories while keeping production nimble and budget-conscious. The series unfolds across four thematic
            Seasons with three episodes each, allowing audiences to journey from the Tivoli's historic legacy through its renovation milestones
            and future preservation vision.
          </p>
        </section>

        <section className="section" id="goals">
          <h2>2. Goals &amp; Success Metrics</h2>
          <ul>
            {goals.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
        </section>

        <section className="section" id="seasons">
          <h2>3. Series Structure &amp; Story Themes</h2>
          <p>
            Each 60-90 second film anchors around a primary interview, supported by cinematic b-roll, archival assets, and sound
            design. The 12 episodes are grouped into four Seasons (three films each) that can be released sequentially or as curated
            playlists.
          </p>
          <div className="section-columns" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {seasons.map(({ title, description, interviews, visuals }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div>
                  <h4>Primary interviews</h4>
                  <ul>
                    {interviews.map((item, index) => (
                      <li key={`${title}-interview-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Supporting visuals</h4>
                  <ul>
                    {visuals.map((item, index) => (
                      <li key={`${title}-visual-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="scope">
          <h2>4. Scope of Work</h2>
          <div className="section-columns">
            <article>
              <h3>Pre-Production</h3>
              <ul>
                {scope.preProduction.map((item, index) => (
                  <li key={`pre-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Production</h3>
              <ul>
                {scope.production.map((item, index) => (
                  <li key={`prod-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Post-Production</h3>
              <ul>
                {scope.postProduction.map((item, index) => (
                  <li key={`post-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Deliverables</h3>
              <ul>
                {scope.deliverables.map((item, index) => (
                  <li key={`deliv-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="timeline">
          <h2>5. Timeline &amp; Milestones</h2>
          <div style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'rgba(0,0,0,0.04)' }}>
                <tr>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Phase</th>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Duration</th>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Key Activities</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map(({ phase, duration, activities }) => (
                  <tr key={phase}>
                    <th scope="row" style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{phase}</th>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{duration}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{activities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            Timeline assumes project start within two weeks of acceptance and Tivoli stakeholder availability. Schedule can be
            compressed with consolidated review windows.
          </p>
        </section>

        <section className="section" id="investment">
          <h2>6. Investment</h2>
          <div style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'rgba(0,0,0,0.04)' }}>
                <tr>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Item</th>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Unit Cost</th>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Quantity</th>
                  <th scope="col" style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {budget.map(({ item, unitCost, quantity, subtotal }) => (
                  <tr key={item}>
                    <th scope="row" style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{item}</th>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{unitCost}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{quantity}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{subtotal}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold' }}>
                  <th scope="row" colSpan={3} style={{ padding: '1rem', borderBottom: 'none' }}>
                    Project Total
                  </th>
                  <td style={{ padding: '1rem', borderBottom: 'none' }}>$30,850</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-columns" style={{ marginTop: '2rem' }}>
            <div>
              <h3>What's included per video ($2,500)</h3>
              <ul>
                {included.map((item, index) => (
                  <li key={`inc-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Optional add-ons</h3>
              <ul>
                {addOns.map((item, index) => (
                  <li key={`addon-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="assumptions">
          <h2>7. Key Assumptions &amp; Policies</h2>
          <ul>
            {assumptions.map((item, index) => (
              <li key={`assume-${index}`}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section" id="why">
          <h2>8. Why Theatrico</h2>
          <ul>
            <li>Chattanooga-local crew with deep familiarity of Tivoli and the surrounding community.</li>
            <li>Lean production footprint that preserves agility without compromising polish.</li>
            <li>Integrated post-production keeps edits nimble and secure.</li>
            <li>Track record creating donor-ready visuals for arts and cultural partners.</li>
          </ul>
        </section>

        <section className="section" id="next-steps">
          <h2>9. Next Steps</h2>
          <ol>
            <li>Approve proposal scope and investment.</li>
            <li>Sign production agreement &amp; submit retainer to lock schedule.</li>
            <li>Confirm kickoff workshop date and priority story list.</li>
            <li>Share initial contacts, brand assets, and archival references.</li>
          </ol>
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px' }}>
            <h3>Primary Contact</h3>
            <p>Jonathan — Founder / Director, Theatrico</p>
            <p>
              <a href="mailto:jon@theatrico.org">jon@theatrico.org</a> · <a href="tel:14233940817">423-394-0817</a>
            </p>
          </div>
        </section>

        <section className="section" id="pitch-deck">
          <h2>10. Pitch Deck &amp; Moodboard Guide</h2>
          <div className="section-columns" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {pitchDeckSlides.map(({ title, bullets }) => (
              <article key={title}>
                <h3>{title}</h3>
                <ul>
                  {bullets.map((bullet, index) => (
                    <li key={`${title}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <section className="section--contact" style={{ marginTop: '2rem' }}>
        <div className="contact-card">
          <p style={{ fontStyle: 'italic', margin: '0 0 1rem 0' }}>We don't just film history. We preserve it, frame by frame.</p>
          <Link to="/" style={{ color: 'var(--accent)' }}>Return to theatrico</Link>
        </div>
      </section>
    </Layout>
  )
}
