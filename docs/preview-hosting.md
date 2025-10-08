# Preview hosting playbook

Everything under `preview.theatrico.org` is served by CloudFront, backed by the private S3 bucket `preview-theatrico.org`.

## AWS resources

- **Route 53**: `preview.theatrico.org` A-ALIAS → CloudFront `d2fhbcy5w1i95t.cloudfront.net`
- **CloudFront distribution**: `E27TDYDRLPENH6` (PriceClass_100, default root `index.html`)
- **ACM certificate**: `arn:aws:acm:us-east-1:147795258921:certificate/b002d70b-cea2-42d0-88eb-6d8834ad9421`
- **S3 bucket**: `preview-theatrico.org` (private, accessed via Origin Access Control `E3RAZJE6JWBAB3`)

## Deploying a preview

1. Build the site locally, e.g. `npm run build` (outputs to `dist/`).
2. Sync the build to the preview bucket. You can use `./scripts/deploy-preview.sh dist redesign` to publish under `preview.theatrico.org/redesign/`.
3. Share the URL. Examples:
   - Root: `https://preview.theatrico.org/`
   - Custom folder: `https://preview.theatrico.org/redesign/`

The deploy script automatically creates a CloudFront invalidation so clients see the update right away.

## Housekeeping

- Keep the bucket private; all access should route through CloudFront.
- When a preview is no longer needed, remove its folder with `aws s3 rm s3://$PREVIEW_BUCKET/<folder>/ --recursive` and run a targeted invalidation (`./scripts/deploy-preview.sh` handles that when rerun).
- If you plan to publish many concurrent previews, consider using unique folders for each branch (`feature-name/`) and tracking them in a simple spreadsheet or README.
