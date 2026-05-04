# Theatrico Site Dev — Context Addendum (2026-05-03)

## New subpage: `/locksley`
A contractor/remodeler lead-gen subpage has been integrated into this repo at `/locksley`.

### Purpose
- Publish the Locksley contractor site under `theatrico.org/locksley`
- Keep it isolated as a contractor-facing page inside the existing Theatrico React/Vite app
- Use it as a live estimate-first lead-gen page until separate-domain access is available

### Current implementation state
- Route exists in app router
- Static hosting route index includes `locksley`
- Visual direction is already ported:
  - modern / elegant / architectural-leaning
  - custom SVG icon set
  - custom line-drawing illustrations
- Estimator UX exists in two modes:
  - detailed full form
  - interactive expanding selection-tree mode
- Build passed successfully in host app

### Important limitation
- Frontend route is integrated, but live backend submission is still placeholder-configured to `/api/estimate`
- Full production lead capture still needs real backend/email wiring

## Round 2 directive: Art / motion / polish pass
Jon reviewed round 1 and said it is good enough for round 1.
Next requested pass:
- create an **art-agent style workflow**
- have one focused agent review icons, art styles, graphic treatment, and visual dynamism
- then have implementation handled (can be same agent if practical)

### Round 2 goals for `/locksley`
1. Improve icon quality and consistency
2. Improve illustration / line-art quality
3. Add stronger but tasteful animation / motion
4. Add more visual dynamism across pages
5. Ensure upgraded graphics also appear on the estimation page, not just general marketing sections

### Constraints
- Keep the site premium, minimal, and architectural
- Avoid cheesy contractor tropes or stock-photo sludge
- Motion should feel polished, not noisy
- Visual improvements must support conversion, not distract from the estimator

### Suggested implementation approach
- First: design review / critique pass with concrete recommendations
- Second: implementation pass applying the approved/selected direction
- It is acceptable for the same coding/design agent to do both, but keep the critique explicit before implementation

## Practical next steps after visual round 2
1. Review `/locksley` locally in browser
2. Commit the integration branch/state
3. Perform the art/motion pass
4. Then wire production submit backend and deploy
