# Theatrico Site (Vite + React)

Landing site for Theatrico, built with React and Vite.

## Requirements

- Node.js 18+
- npm

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The build output is written to `dist/`. The build script also runs `scripts/create-spa-route-indexes.mjs` to copy `index.html` into SPA route folders used by static hosting.

## Preview Hosting

See `docs/preview-hosting.md` for the CloudFront + S3 preview flow. The deploy helper is `scripts/deploy-preview.sh`.

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production bundle and SPA route indexes
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
