# Converting Markdown Script to a React Page

Below is a suggested approach to transform `docs/script-tivoli-pitch.md` (or any script based on `script-template.md`) into a visually rich React page.

## 1. Parse the Markdown
- Use a library like `gray-matter` (for front matter) plus `remark` / `remark-parse` or `markdown-it` to tokenize sections.
- Identify headings (`## 1. Creative Intent`, `## 2. Structure Overview`, etc.) and map them to React components.

```bash
npm install gray-matter remark remark-parse remark-rehype rehype-react
```

## 2. Define Data Structure
For example:
```ts
interface ScriptSection {
  title: string;
  type: 'table' | 'list' | 'text' | 'beats';
  content: any;
}
```
- Convert tables (Structure Overview) into arrays of rows.
- Beats into objects with `visuals`, `audio`, `notes`.

## 3. Create Presentational Components
Examples:
- `<HeroIntro />` – renders project metadata.
- `<SectionHeading />` – stylized headings with anchor links.
- `<ScriptTable />` – for the structure overview; add alternating row colors and responsive stacking.
- `<BeatCard />` – for each beat, possibly in a grid.
- `<CTA>` – closes with contact info and download button.

Styling ideas:
- Use the film palette (ivory / charcoal / gold).  
- Add timeline bars or progress dots for sections.
- Animate section reveals with `framer-motion`.

## 4. Example Component Skeleton
```tsx
const ScriptPage: React.FC<{ data: ScriptData }> = ({ data }) => {
  return (
    <div className="script-page">
      <HeroIntro project={data.project} />
      {data.sections.map((section) => {
        switch (section.type) {
          case 'table':
            return <ScriptTable key={section.title} {...section} />
          case 'beats':
            return <BeatGrid key={section.title} beats={section.content} />
          default:
            return <RichTextBlock key={section.title} {...section} />
        }
      })}
      <CTA contact={data.contact} />
    </div>
  )
}
```

## 5. Enhancements
- **Download button:** Generate PDF export using `react-to-print` or `jspdf`.
- **Timeline:** Render a horizontal progress bar showing section timing (Open / Mid / Close).
- **Media references:** Embed thumbnails linking to pulled YouTube assets (`media/video/*`).
- **Interactive toggles:** Allow toggling between `VO`, `Visuals`, and `Notes` for each beat.

## 6. Next Steps
1. Implement parsing utility (`scripts/parseScript.ts`) to output structured JSON.  
2. Build a `ScriptPage` route at `/tivoli-script` for preview inside the theatrico app.  
3. Optional: expose JSON via `public/scripts/tivoli-pitch.json` for portability.

Keep this folder for additional conversion tools or documentation.
