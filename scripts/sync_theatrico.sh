#!/usr/bin/env bash
set -euo pipefail

# One-command deploy trigger for theatrico-site CI/CD workflow.
# This replaces the old direct S3/CloudFront sync behavior.

WORKFLOW_FILE="ci-cd.yml"
DEPLOY_ENV=""
REF=""
WATCH=1

usage() {
  cat <<'EOF'
Usage:
  scripts/sync_theatrico.sh --env <dev|prod> [--ref <branch>] [--no-watch]

Examples:
  scripts/sync_theatrico.sh --env dev
  scripts/sync_theatrico.sh --env prod --ref main
  scripts/sync_theatrico.sh --env prod --no-watch
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --env)
      DEPLOY_ENV="${2:-}"
      shift 2
      ;;
    --ref)
      REF="${2:-}"
      shift 2
      ;;
    --no-watch)
      WATCH=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 2
      ;;
  esac
done

if [ -z "$DEPLOY_ENV" ]; then
  echo "Error: --env is required." >&2
  usage
  exit 2
fi

if [ "$DEPLOY_ENV" != "dev" ] && [ "$DEPLOY_ENV" != "prod" ]; then
  echo "Error: --env must be 'dev' or 'prod'." >&2
  exit 2
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI not found." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: gh is not authenticated. Run: gh auth login" >&2
  exit 1
fi

echo "=== Triggering CI/CD deploy ==="
echo "Workflow: ${WORKFLOW_FILE}"
echo "Environment: ${DEPLOY_ENV}"
if [ -n "$REF" ]; then
  echo "Ref: ${REF}"
fi

WORKFLOW_YAML="$(gh workflow view "$WORKFLOW_FILE" --yaml)"
SUPPORTS_DEPLOY_INPUT=0
if printf "%s\n" "$WORKFLOW_YAML" | rg -q "deploy_environment:"; then
  SUPPORTS_DEPLOY_INPUT=1
fi

RUN_REF="$REF"
if [ -z "$RUN_REF" ]; then
  # Backward-compatible default for workflows that route by branch ref.
  if [ "$DEPLOY_ENV" = "prod" ]; then
    RUN_REF="main"
  else
    RUN_REF="dev"
  fi
fi

if [ "$SUPPORTS_DEPLOY_INPUT" -eq 1 ]; then
  gh workflow run "$WORKFLOW_FILE" --ref "$RUN_REF" -f deploy_environment="$DEPLOY_ENV"
else
  echo "Note: workflow has no deploy_environment input; using ref=${RUN_REF}" >&2
  gh workflow run "$WORKFLOW_FILE" --ref "$RUN_REF"
fi

echo "Dispatch sent."

if [ "$WATCH" -eq 1 ]; then
  echo "Watching latest run for ${WORKFLOW_FILE}..."
  gh run watch "$(gh run list --workflow "$WORKFLOW_FILE" --limit 1 --json databaseId --jq '.[0].databaseId')"
fi
