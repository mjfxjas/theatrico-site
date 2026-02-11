# Theatrico.org S3 Bucket Audit Report

**Date:** 2026-01-20  
**Bucket:** s3://theatrico.org  
**Total Files:** 89

## Summary
All 89 files in S3 match the local `dist/` folder. The bucket is clean and in sync.

## File Breakdown

### Core Site Files (9 files)
- `index.html` - Main landing page
- `film/index.html` - Film section
- `people/index.html` - People section  
- `tivoli-proposal/index.html` - Tivoli proposal page
- `assets/index-BZBVVkky.css` - Main stylesheet
- `assets/index-DaZrpjxx.js` - Main JavaScript bundle
- `embed-game.html` - Embedded game
- `embed-h8ball.html` - Embedded Magic 8 Ball

### Media Assets (42 files)
**Video files:**
- Hero videos (6): andy_hero, film_hero, hero_silent variants
- Background videos (8): theatrico-film-bg, theatrico-theater-bg (mp4, webm, mobile)
- Project videos (5): fantastick.mov, hk-mill-town.mov, mill-town-collier.mov, small-film-bg.mov

**Images:**
- Posters (6): hero_poster.jpg, film_hero_poster.jpg, andy_hero_poster.jpg, etc.
- Headshots/photos (2): MCheadshot.JPG, CLP.JPEG
- Logos (2): theatrico-marquee.png, camp-broadway.png
- Project images (2): last-five-years.jpg, last-five-years2.png

**Tivoli proposal files (5):**
- Theatrico-Tivoli-Cover-Letter.pdf
- Theatrico-Tivoli-Deck.pdf
- Theatrico-Tivoli-RFP.pdf
- theatrico-tivoli-proposal-package.zip
- tivoli-sign.png

**Backup/source files (2):**
- theatrico-film-bg.mov.bak (65 MB)
- theatrico-theater-bg.mov.bak (131 MB)

### Portfolio Section (20 files)
**ABSH project (9 files):**
- index.html, script.js, styles.css, area.html
- Videos: ANDY_Hero.mov, Andy_movie.mp4, andy_hero_full.mov, property_video_long_branch.mp4
- Image: andy_bond_headshot.jpg

**Edubot project (5 files):**
- index.html, logo.png, books.json
- Thumbnails: philosophy.jpg, world-history-vol1.jpg, world-history-vol2.jpg

**Project logos (6):**
- RFC_logo_clean.png, awscleanup_logo.png, awstoolset_logo.png
- h8ball_logo.png, jobhunter_logo.png, logistix_logo.png
- skyblocks_logo.png, tco_logo.png, wonderdash_logo.png

**Standalone pages (3):**
- magic-h8-ball.html
- rose-colored-glasses.html
- sky-blocks-run.html

### Scrumble App (7 files) ✨ NEW
- `scrumble/index.html` - Main voting interface
- `scrumble/admin.html` - Admin panel
- `scrumble/main.js` - Frontend logic
- `scrumble/admin.js` - Admin logic
- `scrumble/styles.css` - Main styles
- `scrumble/admin.css` - Admin styles
- `scrumble/config.js` - API configuration

### Stream Section (3 files)
- `stream/index.html`
- `stream/stream.css`
- `stream/stream.js`

### System Files (3 files)
- `media/.DS_Store` - macOS metadata (can be deleted)
- `media/branding/.DS_Store` - macOS metadata (can be deleted)
- `media/.gitkeep` - Git placeholder

## Recommendations

### 🗑️ Safe to Delete (196 MB savings)
1. **Backup files (196 MB):**
   - `media/theatrico-film-bg.mov.bak` (65 MB)
   - `media/theatrico-theater-bg.mov.bak` (131 MB)
   - These are source files, should be stored locally or in archive bucket

2. **System files:**
   - `media/.DS_Store`
   - `media/branding/.DS_Store`

### ✅ Keep Everything Else
All other files are actively used by the site or portfolio projects.

## Storage Costs
- **Current size:** ~600 MB
- **After cleanup:** ~400 MB
- **Monthly cost:** ~$0.01 (negligible)

## Next Steps
1. ✅ Scrumble app successfully added to bucket
2. Consider moving `.mov.bak` files to local archive
3. Add `.DS_Store` to `.gitignore` to prevent future uploads
4. All files are in use - no orphaned content detected
