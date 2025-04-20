let currentLang = 'eng';
document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'eng' ? 'kor' : 'eng';
  document.getElementById('lang-toggle').innerText = currentLang === 'eng' ? '🇬🇧 English' : '🇰🇷 한국어';
  render();
});