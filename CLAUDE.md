# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A local web application for generating printable vintage student cards with Arabic/RTL support. This is a client-side only app with no build process or backend - it runs directly in the browser using vanilla JavaScript, HTML, and CSS.

## Running the Application

**Local Server (Recommended):**
```bash
npx serve
```
Then open `http://localhost:3000` in Chrome.

**Direct File Access:**
```
file:///<path-to-project>/index.html
```
Open `index.html` directly in Chrome browser.

## Architecture

### Three-Screen Flow
The app uses a simple state machine with three screens managed by vanilla JS:

1. **Welcome Screen** (`#welcome-screen`) - Entry point with "Start" button
2. **Form Screen** (`#form-screen`) - User input form for name, school, memo, email
3. **Preview Screen** (`#preview-screen`) - Card preview with print/email/edit actions

Screen transitions are handled via `display: none/block` toggling in `js/app.js`.

### Key Components

**HTML (`index.html`):**
- RTL layout (`<html dir="rtl">`)
- Hardcoded school options in `<select>` dropdown
- External CDN dependencies: jsPDF (2.5.1) and html2canvas (1.4.1)

**JavaScript (`js/app.js`):**
- Pure vanilla JS, no frameworks
- Event-driven screen navigation
- `generateId()`: Creates unique card IDs in format `SL-YYYYMMDD-XXXX`
- `logCard()`: Stores printed cards in localStorage
- `generatePDF()`: Converts card DOM to PDF using html2canvas + jsPDF

**CSS (`css/styles.css`):**
- Custom Arabic font loading via `@font-face` (Almarai from `assets/fonts/`)
- Print-specific styles with `@media print` for 90mm x 60mm card format
- Card background image: `assets/background-9x6.jpg`

### Data Flow
1. User fills form → validates name and school are present
2. Populates preview card DOM with form data
3. Print button triggers `window.print()` using CSS print styles
4. Optional: Email button generates PDF blob URL via html2canvas/jsPDF
5. Card data logged to localStorage as JSON array

## Print Configuration

Cards are designed for **90mm x 60mm** custom print size:
- Set via `@page { size: 90mm 60mm; margin: 0; }`
- Printer must be configured for custom 90x60mm size at 100% scale
- Only `.print-card` element and children are visible during print

## Arabic/RTL Handling

- RTL direction set at document level (`dir="rtl"`)
- Custom Almarai fonts loaded from `assets/fonts/` (Regular and Bold)
- All UI text is bilingual (Arabic / English)
- Card text automatically flows RTL when Arabic characters are entered

## Assets Structure

```
assets/
├── fonts/               # Almarai-Regular.ttf, Almarai-Bold.ttf
├── background-9x6.jpg   # Card background
├── logo.png            # Displayed on card and welcome screen
├── seal.png            # Stamp overlay on card
└── sample-data.json    # Reference data for schools (not actively used)
```

## Offline Use

For offline environments, download and host CDN dependencies locally:
- jsPDF: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
- html2canvas: https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js

Update script tags in `index.html` to point to local paths.

## Known Issues & Constraints

### Security
- **No SRI hashes** on CDN scripts (index.html:76-77) - Consider adding integrity checks or hosting locally
- **No input validation** on email field - Accepts any format before localStorage storage

### Broken/Incomplete Features
- **Email functionality** (js/app.js:65-72) is non-functional - Generates PDF but requires manual email attachment; consider removing or implementing properly
- **sample-data.json** exists but unused - Schools are hardcoded in HTML select options instead

### Missing Error Handling
- No try-catch around localStorage operations (could be disabled or full)
- No error handling for html2canvas/jsPDF failures
- Library detection happens too late (js/app.js:101) - Should check on page load
- No handling for missing image assets (logo.png, seal.png, background-9x6.jpg)

### Accessibility Gaps
- Uses `alert()` for validation errors (not screen-reader friendly)
- No ARIA labels on bilingual buttons
- No focus management when switching screens
- Missing `aria-required` on required form fields

### UX Limitations
- No loading states during PDF generation
- No responsive design - Preview card may overflow on mobile screens
- No inline validation feedback

## Troubleshooting Notes

- **Text overflow:** Adjust font sizes in `.print-card` styles (currently 12pt-16pt)
- **Print clipping:** Check `@page` margins and printer settings
- **Arabic rendering:** Verify Almarai fonts are loaded and `dir="rtl"` is set
- **Blank prints:** Confirm background image paths are correct and browser allows background printing
- **Dead code:** FormData created but unused (js/app.js:26)
