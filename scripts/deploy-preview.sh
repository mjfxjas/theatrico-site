#!/usr/bin/env bash
set -euo pipefail

BUCKET="${PREVIEW_BUCKET:-preview-theatrico.org}"
DISTRIBUTION_ID="${PREVIEW_DISTRIBUTION_ID:-E27TDYDRLPENH6}"

die() {
  echo "[deploy-preview] $*" >&2
  exit 1
}

if ! command -v aws >/dev/null 2>&1; then
  die "aws CLI not found in PATH"
fi

BUILD_DIR=${1:-dist}
PREFIX=${2:-}

if [ ! -d "$BUILD_DIR" ]; then
  die "build directory '$BUILD_DIR' not found"
fi

SYNC_URI="s3://${BUCKET}"
INVALIDATION_PATHS="/*"

if [ -n "$PREFIX" ]; then
  CLEAN_PREFIX=${PREFIX#/}
  CLEAN_PREFIX=${CLEAN_PREFIX%/}
  SYNC_URI="${SYNC_URI}/${CLEAN_PREFIX}"
  INVALIDATION_PATHS="/${CLEAN_PREFIX}/*"
fi

echo "[deploy-preview] syncing ${BUILD_DIR} -> ${SYNC_URI}" >&2
aws s3 sync "${BUILD_DIR}/" "${SYNC_URI}/" --delete --cache-control "public,max-age=60" || {
  die "Failed to sync to S3: ${SYNC_URI}"
}

echo "[deploy-preview] creating CloudFront invalidation for ${INVALIDATION_PATHS}" >&2
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "${INVALIDATION_PATHS}" >/dev/null || {
  die "Failed to invalidate CloudFront distribution: ${DISTRIBUTION_ID}"
}

echo "[deploy-preview] deployment complete" >&2
