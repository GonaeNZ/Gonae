let currentLang = 'eng';

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('lang-selector');
  selector.value = currentLang;
  selector.addEventListener('change', (e) => {
    currentLang = e.target.value;
    renderModules();
  });
});