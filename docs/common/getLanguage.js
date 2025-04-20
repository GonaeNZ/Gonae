let currentLang = 'eng';
let lastNonEnglishLang = null;

export function getCurrentLang() {
  return currentLang;
}

export function initLanguageSelector(onChangeCallback) {
  const selector = document.getElementById('lang-selector');
  const toggleBar = document.getElementById('toggle-bar');
  const toggleButton = document.getElementById('toggle-lang');

  selector.addEventListener('change', () => {
    currentLang = selector.value;

    if (currentLang !== 'eng') {
      lastNonEnglishLang = currentLang;
    }

    updateToggleButton();
    toggleBar.style.display = lastNonEnglishLang ? 'block' : 'none';

    onChangeCallback(false); // don't restore scroll
  });

  toggleButton.addEventListener('click', () => {
    if (currentLang === 'eng' && lastNonEnglishLang) {
      currentLang = lastNonEnglishLang;
      selector.value = lastNonEnglishLang;
    } else {
      currentLang = 'eng';
      selector.value = 'eng';
    }

    updateToggleButton();
    toggleBar.style.display = lastNonEnglishLang ? 'block' : 'none';

    onChangeCallback(true); // restore scroll
  });

  function updateToggleButton() {
    if (currentLang === 'eng' && lastNonEnglishLang) {
      toggleButton.textContent = `Switch to ${lastNonEnglishLang.toUpperCase()}`;
    } else {
      toggleButton.textContent = 'Switch to English';
    }
  }

  // Initialize button text and bar
  updateToggleButton();
  toggleBar.style.display = lastNonEnglishLang ? 'block' : 'none';
}
