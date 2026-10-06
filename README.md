# Theatrico Site

React 19 and Vite 7 site with home, film, people, and Tivoli proposal pages.
Routes are defined in `src/App.jsx`; static hosting builds include an
`index.html` copy for each route so direct page links can load.

## Local Development

Use Node.js 20.19+ or 22.12+ and npm. CI currently uses Node 20.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Keep source changes in `src/` and static
assets in `public/`; `dist/` is generated output.

## Validation and Build

```bash
npm run lint
npm run build
npm run preview
```

Lint checks the repository with ESLint. Build creates `dist/` and runs
`scripts/create-spa-route-indexes.mjs` to generate route entry points for
`/film`, `/people`, and `/tivoli-proposal`. Preview serves the build locally.
There is no automated application test suite configured yet; check navigation,
direct route loads, and mobile layouts before publishing interface changes.

## Project Layout

- `src/pages/`: route pages.
- `src/components/`: shared interface components.
- `public/`: static files copied into the build.
- `scripts/`: static route generation and preview deployment helpers.
- `docs/preview-hosting.md`: historical preview infrastructure and deployment notes.
- `.github/workflows/ci-cd.yml`: lint/build checks and manually selected deployment.

## Deployment

Pushes and pull requests targeting `main` or `dev` run the build checks.
Deployment requires manually running the CI/CD workflow and selecting `dev`
or `prod`. The selected target needs the corresponding bucket and AWS OIDC
role secrets; `AWS_REGION` is required and the CloudFront distribution is optional.

The workflow syncs `dist/` to the selected S3 bucket with `--delete` and
invalidates CloudFront when configured. Verify the target before running it.
Preview helpers also publish to AWS; they are separate from local preview.
Never commit AWS credentials or private environment files.
