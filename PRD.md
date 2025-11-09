# PRD: "Old Student Card" — Commemorative Digital Experience (Step-by-step Guide)

**Project name:** Old Student Card — Commemorative Digital Experience  
**Language:** English (UI will include Arabic labels / RTL support)  
**Format:** Local static web page (HTML / CSS / JS) that generates a printable vintage-style student card (PDF/image), plus optional email delivery.

---

## 1. Project Summary (One-liner)
Build a small, local web page (runs in browser offline) that collects a visitor's name, school choice, and optional short message, then generates a vintage-styled printable card (9×6 cm) and an optional digital copy for email.

---

## 2. Goals & Success Criteria
- Provide each visitor with a personalized vintage “student card” printed on-site.
- Keep flow under 60 seconds per visitor from start to print.
- KPI targets:
  - 100+ cards/day capacity (depends on printer).
  - ≥30% opt-in for digital copy.
  - 90% positive satisfaction in a short survey sample.

---

## 3. Non-functional Constraints & Assumptions
- Runs locally (no external server required). Should work offline after initial setup.
- Target devices: tablet or laptop (Chrome recommended).
- Printer: small thermal or photo printer capable of 9×6 cm. Must support direct printing from device or from generated PDF.
- Fonts: Arabic-supporting fonts installed on device or embedded via @font-face (local files).
- Keep the app single-file where possible for portability.

---

## 4. High-level User Flow (Step-by-step)
1. Visitor sees welcome screen (logo + “Start”).
2. Visitor enters name (required), picks a school from the dropdown, optionally types a short memory line (≤30 chars).
3. Visitor clicks “Preview card”.
4. System renders the card preview (on screen) in vintage style.
5. Visitor clicks “Print” (or staff clicks print). Optionally enters an email to receive a digital copy.
6. Page generates a printable PDF/image sized for 9×6 cm; open system print dialog or auto-send to local printer if supported.
7. Staff hands printed card to visitor; if email requested, system uses local email client or a connected phone to send the file (see Appendix for options).

---

## 5. Minimum Viable Features (MVP)
- Welcome screen with Start button.
- Form: Name (required), School (prepopulated list), Year (auto/given), Short line (optional).
- Preview of card (rendered DOM or canvas).
- Print to PDF with correct dimensions 90 × 60 mm (or 9×6 cm).
- Local saving or download of generated PDF.
- Simple printable assets: background image, stamp overlay, logo.
- Staff instructions screen.

---

## 6. Recommended Tech Stack
- Frontend: plain HTML5, CSS3, vanilla JavaScript (ES6+).
- PDF/image generation: `html2canvas` + `jsPDF` (for accurate rendering) **OR** use CSS print styles and window.print for direct printing.
- Fonts: local Arabic TTF files loaded with `@font-face` (e.g., "Cairo", "Almarai", or custom vintage Arabic).
- Optional: `QRCode` library for adding a small QR linking to the digital copy.
- Local hosting: run from file:// or local static server (e.g., `npx serve`).

---

## 7. File & Folder Structure (suggested)
```
old-student-card/
├── assets/
│   ├── background-9x6.jpg
│   ├── logo.png
│   ├── seal.png
│   ├── fonts/
│   │   ├── Almarai-Regular.ttf
│   │   └── Almarai-Bold.ttf
│   └── sample-data.json
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── prd.md
└── README.md
```

---

## 8. Detailed UI / UX (Step-by-step screens & elements)

### Screen A — Welcome
- Elements: logo, title (“Old Student Card — Commemorative Experience”), short instruction (1–2 lines), big “Start” button.
- Behavior: clicking Start → Screen B.

### Screen B — Input form
- Fields:
  - Name (text, required, max 40 chars). Placeholder example bilingual: "اسمك / Your name".
  - School (dropdown, required) — preset list of historic schools in Jahra.
  - Year (optional) — default to symbolic year (e.g., 1975) or computed from birth year if provided.
  - Short line (optional, max 30 chars) — small memory line/wisdom line.
  - Email (optional, validation).
- Buttons:
  - "Preview Card" (primary).
  - "Clear" (secondary).
- UX notes:
  - Use RTL direction for Arabic elements: `<div dir="rtl">`.
  - Validate name and dropdown before enabling preview.

### Screen C — Preview
- Shows printed-size box scaled for screen preview and an on-card layout:
  - Background image (vintage paper).
  - Top-left: logo.
  - Main content: Name (large), School (smaller), Year, ID number (auto-generated).
  - Bottom-right/center: small digital seal (stamp) overlay with slight transparency.
  - Optional text line shown in italic.
- Buttons:
  - "Print" (primary) — triggers PDF generation/print dialog.
  - "Send by Email" (optional) — prompts for email if not provided earlier.
  - "Edit" — back to form.

---

## 9. Data Model (client-side)
- `visitor = { name: string, schoolId: string, schoolLabel: string, year: string, memo: string, id: string, email?: string, timestamp: string }`
- ID generation: `SL-YYYYMMDD-HHMM-XXXX` or a short random 4-digit number.
- Persistence (optional): localStorage array `printedCards` to store recent entries (for audit or reprints).

---

## 10. Printing & PDF Generation (step-by-step options)

### Option A — CSS print (simpler, recommended for local printers)
1. Create a dedicated print stylesheet with exact physical size:
```css
@page { size: 90mm 60mm; margin: 0; }
.print-card { width: 90mm; height: 60mm; }
```
2. Render card in DOM inside a `.print-card` element.
3. Call `window.print()` — user/staff selects printer and settings (scale 100%).
4. Advantages: high-fidelity with native print; no external libs.

### Option B — html2canvas + jsPDF (more control, cross-browser)
1. Use `html2canvas` to rasterize the `.print-card` DOM to canvas at high DPI.
2. Insert image into `jsPDF` with exact dimensions (mm units).
3. Trigger `doc.save('student-card.pdf')` or `doc.output('bloburl')` to open print dialog.
4. Advantages: produce downloadable PDF; exact pixel rendering of web fonts/images.

### Option C — Server-side (not recommended for offline)
- If you want to email from server and generate PDFs server-side, use a tiny Node script or Google Apps Script. For an offline booth, avoid server-side.

---

## 11. Printer Integration Notes
- Configure the printer driver to accept 90×60 mm paper or set custom size.
- If using thermal printers, ensure margins and bleed are compatible.
- Test multiple print modes: portrait, landscape, and scaling — record the exact scale that produces accurate results.
- Thermal printers may require special settings; for photo printers use standard photo paper.
- If auto-printing is needed, use a small local print helper app (outside scope) or a browser extension that supports silent printing.

---

## 12. Accessibility & Localization
- Provide bilingual labels (Arabic first, then English).
- Use `<label>` tags and `aria-*` attributes for form fields.
- Ensure high-contrast text over background; provide alternative plain background variant for readability.
- Use RTL layout for Arabic and ensure fonts support Arabic glyphs.

---

## 13. Staff Workflow & Training (step-by-step)
1. Station setup: device charged, printer on, paper loaded, backup paper & ink available.
2. Boot device, open `index.html` in Chrome.
3. Staff reads 1-page quick-guide (see Appendix).
4. For each visitor:
   - Greet → press Start.
   - Help visitor enter their name/school/memo.
   - Click Preview → Print.
   - Hand printed card → ask if they want an email copy.
   - Mark completion (optional log in `localStorage` or print counter).
5. Troubleshooting: if print jam or low ink — swap backup printer or paper.

---

## 14. Security & Privacy
- Avoid storing emails or personal data on cloud without consent.
- If collecting emails, explicitly show consent checkbox and short privacy note: "Email will be used only to send your card; we won't store it or use it for marketing."
- If you must store data locally, rotate or clear `localStorage` daily.

---

## 15. QA & Testing Checklist (pre-launch)
- [ ] Form validation: required fields enforce entry.
- [ ] Preview matches printed output (test 5 prints).
- [ ] PDF dimensions exactly 90×60 mm; no clipping.
- [ ] Fonts render correctly on target device.
- [ ] Printer settings tested for scale and bleed.
- [ ] Arabic text displays right-to-left and aligns correctly.
- [ ] Email sending (if implemented) verified for 5 different email clients.
- [ ] Staff quick-guide tested by at least 2 non-technical users.
- [ ] Battery/backup printer swap tested.

---

## 16. Launch Day Checklist (one-page)
- Device battery ≥ 80% + charger present.
- Printer connected, test print 1 card.
- Backup paper/ink ready.
- Paper waste bin near station.
- Quick printed instructions for staff (1 sheet).
- Printed consent note for digital emails.

---

## 17. Implementation: Starter Code (minimal, single-file example)

Below is a compact working example showing structure and JS to render a preview and trigger print. Copy into `index.html` and place `assets/` as described.

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Old Student Card — Demo</title>
  <style>
    @font-face {
      font-family: 'AlmaraiLocal';
      src: url('assets/fonts/Almarai-Regular.ttf') format('truetype');
    }
    body { font-family: AlmaraiLocal, Arial, sans-serif; display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f7f4ee; }
    .app { width:360px;background:#fff;padding:16px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.08); }
    .btn { display:inline-block;padding:10px 14px;border-radius:6px;background:#2b6cb0;color:#fff;text-decoration:none;cursor:pointer;margin-top:8px;}
    .field { margin-bottom:8px; }
    .preview-area { margin-top:10px; display:flex; justify-content:center; }
    /* print card styles */
    .print-card { width:90mm; height:60mm; box-sizing:border-box; padding:8mm; background-image: url('assets/background-9x6.jpg'); background-size:cover; position:relative; font-size:12pt; }
    .name { font-weight:700; font-size:16pt; }
    @page { size: 90mm 60mm; margin:0; }
    @media print {
      body * { visibility:hidden; }
      .print-card, .print-card * { visibility:visible; }
      .print-card { position:fixed; left:0; top:0; }
    }
  </style>
</head>
<body>
  <div class="app" id="app">
    <h2 style="text-align:center">بطاقة الطالب — Demo</h2>
    <div class="field"><label>الاسم / Name</label><input id="name" maxlength="40" style="width:100%"></div>
    <div class="field"><label>المدرسة / School</label>
      <select id="school" style="width:100%">
        <option value="">اختر مدرسة...</option>
        <option value="Al-Jahra Primary">Al-Jahra Primary</option>
        <option value="Jahra Secondary">Jahra Secondary</option>
        <option value="Old Boys School">Old Boys School</option>
      </select>
    </div>
    <div class="field"><label>سطر تذكار (اختياري)</label><input id="memo" maxlength="30" style="width:100%"></div>
    <div><a class="btn" id="previewBtn">Preview Card</a></div>

    <div class="preview-area" id="previewArea" style="display:none">
      <div class="print-card" id="card">
        <img src="assets/logo.png" style="height:28px; position:absolute; left:8px; top:6px;">
        <div style="text-align:center; margin-top:18px;">
          <div class="name" id="cardName">NAME</div>
          <div id="cardSchool">school</div>
          <div style="position:absolute;bottom:8px;left:8px;font-size:9pt" id="cardId">ID: --</div>
          <img src="assets/seal.png" style="position:absolute;right:6px;bottom:6px;height:34px;opacity:.85">
          <div style="position:absolute;bottom:8px;right:8px;font-size:8pt" id="cardMemo"></div>
        </div>
      </div>
    </div>

    <div id="actions" style="display:none; margin-top:8px;">
      <a class="btn" id="printBtn">Print</a>
      <a class="btn" id="editBtn" style="background:#718096">Edit</a>
    </div>
  </div>

  <script>
    const previewBtn = document.getElementById('previewBtn');
    const previewArea = document.getElementById('previewArea');
    const actions = document.getElementById('actions');
    const nameEl = document.getElementById('name');
    const schoolEl = document.getElementById('school');
    const memoEl = document.getElementById('memo');
    const cardName = document.getElementById('cardName');
    const cardSchool = document.getElementById('cardSchool');
    const cardId = document.getElementById('cardId');
    const cardMemo = document.getElementById('cardMemo');

    function genId() {
      const d = new Date();
      const s = Math.floor(Math.random()*9000)+1000;
      return 'SL-' + d.getFullYear() + ('0'+(d.getMonth()+1)).slice(-2) + ('0'+d.getDate()).slice(-2) + '-' + s;
    }

    previewBtn.addEventListener('click', ()=> {
      const name = nameEl.value.trim();
      const school = schoolEl.value;
      if(!name || !school) { alert('Please enter name and choose a school.'); return; }
      cardName.textContent = name;
      cardSchool.textContent = school;
      cardId.textContent = 'ID: ' + genId();
      cardMemo.textContent = memoEl.value.trim();
      previewArea.style.display = 'block';
      actions.style.display = 'block';
    });

    document.getElementById('printBtn').addEventListener('click', ()=> {
      // direct print using print stylesheet
      window.print();
    });

    document.getElementById('editBtn').addEventListener('click', ()=> {
      previewArea.style.display = 'none';
      actions.style.display = 'none';
    });
  </script>
</body>
</html>
```

---

## 18. Optional: Email Delivery Options (offline-friendly)
- Option 1 (manual): Staff exports PDF and attaches to email client on the device; send to visitor.
- Option 2 (automated local): Use a tiny local script (Node + nodemailer) connected to an SMTP account — *requires network*.
- Option 3 (Google Forms + Apps Script): If you want full automation using Google Drive and Gmail, implement Apps Script to generate a Slide or PDF and send it — requires internet and Google account.

---

## 19. Asset Design Checklist
- Create or obtain a high-resolution vintage paper background sized at 900×600 px (or vector) for 9×6 cm at 300 DPI → 1063×709 px (approx). (Note: 300 DPI for print).
- Provide transparent PNG stamp/ seal.
- Provide logo in PNG (transparent) and small JPG for background composition.
- Provide fonts with Arabic support.

---

## 20. Staff Quick-Guide (one page)
1. Open `index.html` in Chrome on device.
2. Click Start.
3. Ask visitor for name, school, optional memo, email.
4. Click Preview → check alignment.
5. Click Print → choose the local printer and confirm size 90×60 mm.
6. Hand card. Offer to email PDF (attach and send if requested).
7. If printing issues: try "Fit to page" off, scale 100%.

---

## 21. Timeline & Effort Estimate (small project)
- Design assets & template: 4–8 hours.
- Build single-page web app (MVP): 4–6 hours.
- Testing & printer calibration: 2–4 hours.
- Staff training & dry run: 1–2 hours.
- Total: ~12–20 hours.

---

## 22. Maintenance & Backup
- Keep a copy of `old-student-card/` on a USB drive.
- Print 5 test cards at start of day to verify alignment.
- Keep spare paper/ink and a second printer powered on during busy hours.

---

## 23. Appendix: Prepopulated School List (example)
- Al-Jahra Primary
- Jahra Secondary School
- Old Boys School
- Central Technical School (historic)
- Girls School of Jahra (historic)

---

## 24. Appendix: Troubleshooting common printing issues
- Text too big → reduce font-size in `.print-card`.
- Image clipped at edges → remove page margins and set `@page { margin:0 }`.
- Printer prints blank line → check background image path and permissions.
- Arabic text appears disconnected → ensure correct font and `<html dir="rtl">`.

---

## 25. Next steps — Checklist to build now
- [ ] Prepare assets (background, seal, logo, fonts).
- [ ] Create folder structure and copy starter `index.html`.
- [ ] Test on the actual device and Chrome.
- [ ] Calibrate printer with test print and adjust CSS `padding`/`margin`.
- [ ] Train staff with the quick-guide.
- [ ] Launch booth.

---

## Contact / Notes
If you want, I can also:
- Generate a ZIP with the starter project (HTML + placeholder assets).
- Convert the starter to English-first UI.
- Provide a ready-to-run Node static server script.

--- 
*End of PRD — "Old Student Card" Commemorative Experience*
