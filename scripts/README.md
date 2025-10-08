# Script Conversion Notes

This folder collects instructions and utilities for turning Markdown-based scripts into web-presentable React pages.

## Workflow Outline
1. Draft scripts in Markdown (see `docs/script-template.md`).
2. Use a parser to convert Markdown sections into structured JSON.
3. Feed the parsed data into a React page that renders each script section with styled components.
4. Add optional enhancements: anchors, timeline bars, CTA cards, and download buttons.

See `scripts/react-script-page.md` for implementation guidance.
