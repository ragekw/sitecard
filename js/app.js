// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const formScreen = document.getElementById('form-screen');
const previewScreen = document.getElementById('preview-screen');
const cardForm = document.getElementById('card-form');
const previewBtn = document.getElementById('preview-btn');
const clearBtn = document.getElementById('clear-btn');
const printBtn = document.getElementById('print-btn');
const emailBtn = document.getElementById('email-btn');
const editBtn = document.getElementById('edit-btn');
const startBtn = document.getElementById('start-btn');

// Card elements
const cardName = document.getElementById('card-name');
const cardSchool = document.getElementById('card-school');
const cardId = document.getElementById('card-id');
const cardMemo = document.getElementById('card-memo');

// Event listeners
startBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  formScreen.style.display = 'block';
});

previewBtn.addEventListener('click', () => {
  const formData = new FormData(cardForm);
  const name = document.getElementById('name').value.trim();
  const school = document.getElementById('school').value;
  const memo = document.getElementById('memo').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !school) {
    alert('يرجى إدخال الاسم واختيار المدرسة / Please enter name and choose a school.');
    return;
  }

  // Populate preview
  cardName.textContent = name;
  cardSchool.textContent = school;
  cardId.textContent = 'ID: ' + generateId();
  cardMemo.textContent = memo;

  if (email) {
    emailBtn.style.display = 'inline-block';
  } else {
    emailBtn.style.display = 'none';
  }

  formScreen.style.display = 'none';
  previewScreen.style.display = 'block';
});

clearBtn.addEventListener('click', () => {
  cardForm.reset();
});

printBtn.addEventListener('click', () => {
  // Use CSS print
  window.print();

  // Optional: Log to localStorage
  logCard();
});

emailBtn.addEventListener('click', () => {
  // For now, manual: prompt to download PDF and attach
  generatePDF().then(url => {
    const email = document.getElementById('email').value;
    alert(`PDF generated. Manually attach ${url} to email and send to ${email}.`);
    window.open(url);
  });
});

editBtn.addEventListener('click', () => {
  previewScreen.style.display = 'none';
  formScreen.style.display = 'block';
});

// Utility functions
function generateId() {
  const d = new Date();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return 'SL-' + d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + '-' + random;
}

function logCard() {
  const cards = JSON.parse(localStorage.getItem('printedCards') || '[]');
  const cardData = {
    name: cardName.textContent,
    school: cardSchool.textContent,
    id: cardId.textContent.replace('ID: ', ''),
    memo: cardMemo.textContent,
    timestamp: new Date().toISOString()
  };
  cards.push(cardData);
  localStorage.setItem('printedCards', JSON.stringify(cards));
}

async function generatePDF() {
  // Using jsPDF and html2canvas for PDF
  if (typeof html2canvas === 'undefined' || typeof jsPDF === 'undefined') {
    alert('jsPDF and html2canvas libraries not loaded. Using print instead.');
    window.print();
    return;
  }

  const cardElement = document.getElementById('card');
  const canvas = await html2canvas(cardElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [90, 60] });
  pdf.addImage(imgData, 'PNG', 0, 0, 90, 60);
  pdf.save('student-card.pdf');
  return pdf.output('bloburl');
}
