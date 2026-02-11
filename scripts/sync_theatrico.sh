#!/bin/bash
set -euo pipefail

DIST_ID="E2RBUOYJY81G2Q"

echo "=== Syncing Theatrico Site ==="

# Sync scrumble
echo "→ Syncing scrumble..."
cp -r /Users/jon/projects/scrumble/app/* /Users/jon/projects/theatrico-site-dev/public/scrumble/

# Sync to S3
cd /Users/jon/projects/theatrico-site-dev
echo "→ Syncing to S3..."
aws s3 sync public/ s3://theatrico.org/ --delete --cache-control max-age=3600

# Invalidate CloudFront
echo "→ Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/scrumble/*" --query 'Invalidation.Id' --output text

echo "✓ Done: https://theatrico.org/scrumble/"
