# Tasks for Building "Old Student Card" Project

## Project Overview
Build a local static web app that generates printable vintage student cards with Arabic/RTL support, based on PRD.md.

## High Priority Tasks
- [ ] Create folder structure inside sitecard/: assets/, css/, js/, index.html, README.md
- [ ] Build index.html with welcome screen, input form, preview, and starter code
- [ ] Create css/styles.css with RTL support, print styles (@page size 90mm 60mm), and responsive design
- [ ] Create js/app.js with form validation, preview rendering, PDF generation (jsPDF + html2canvas), print functionality

## Medium Priority Tasks
- [ ] Prepare assets: background-9x6.jpg, logo.png, seal.png, fonts/ (Almarai-Regular.ttf, Almarai-Bold.ttf)
- [ ] Integrate Arabic fonts with @font-face and ensure proper RTL layout
- [ ] Add Arabic labels, RTL direction, and bilingual placeholders
- [ ] Implement PDF generation and printing (CSS print or jsPDF option)
- [ ] Test basic user flow: form input → preview → print/download
- [ ] Test printing on target device with correct dimensions (90x60mm)

## Low Priority Tasks
- [ ] Add optional email sending (manual attachment or local SMTP if needed)
- [ ] Create README.md with setup instructions, staff quick-guide, and troubleshooting
- [ ] Run QA checklist: form validation, rendering accuracy, font support, print fidelity

## Notes
- All development in /home/rashed/project/sitecard/
- Use vanilla HTML/CSS/JS
- Ensure offline functionality
- Target: Chrome browser on tablet/laptop
