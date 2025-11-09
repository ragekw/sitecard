# Old Student Card — Commemorative Experience

A local web app for generating printable vintage student cards with Arabic/RTL support.

## Setup Instructions

1. Ensure Chrome browser is installed.
2. Place all files in a folder accessible via file:// or run a local server (e.g., `npx serve`).
3. Open `index.html` in Chrome.
4. For printing: Configure printer for 90x60mm custom size.

## Staff Quick-Guide

1. Open `index.html` in Chrome.
2. Click "ابدأ / Start".
3. Help visitor enter name, school, optional memo/email.
4. Click "معاينة البطاقة / Preview Card".
5. Click "طباعة / Print" → select printer, ensure 100% scale.
6. Hand card; for email, manually attach generated PDF.

## Troubleshooting

- Text too big: Adjust font-size in CSS.
- Clipping: Check @page margins.
- Arabic issues: Ensure fonts loaded and dir="rtl".
- Print blank: Verify background image paths.

## Dependencies

- jsPDF: Include `<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>`
- html2canvas: Include `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>`

For offline use, download and host locally.
