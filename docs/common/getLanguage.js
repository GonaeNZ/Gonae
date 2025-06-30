let currentLang = localStorage.getItem('lang') || 'eng';
let lastNonEnglishLang = currentLang !== 'eng' ? currentLang : null;

// 🔓 Global getter
export function getCurrentLang() {
  return currentLang;
}

export function initLanguageSelector(onChangeCallback) {
  const selector      = document.getElementById('lang-selector');
  const toggleBar     = document.getElementById('toggle-bar');
  const toggleButton  = document.getElementById('toggle-lang');
  const twitterLink   = document.getElementById('twitter-link');
  const instagramLink = document.getElementById('instagram-link');

  // 🛡 Safety checks
  if (!selector || !toggleBar || !toggleButton) {
    console.warn("Missing UI elements for language selector.");
    return;
  }

  // 🧩 Assign dropdown to match saved or default language
  selector.value = currentLang;

  // 🧠 Update social media links
  function updateSocialLinks(lang) {
    if (!twitterLink || !instagramLink) return;

    if (lang === 'kor') {
      twitterLink.href        = 'https://x.com/GonaeKR';
      twitterLink.textContent = '트위터';
      instagramLink.href         = 'https://www.instagram.com/gonaenz/';
      instagramLink.textContent  = '인스타그램';
    } else {
      twitterLink.href        = 'https://x.com/GonaeNZ';
      twitterLink.textContent = 'Twitter';
      instagramLink.href         = 'https://www.instagram.com/gonaenz/';
      instagramLink.textContent  = 'Instagram';
    }
  }

  // 🔄 Refresh UI elements based on currentLang
  function refreshUI(restoreScroll) {
    localStorage.setItem('lang', currentLang);

    // 1) toggle button text
    if (currentLang === 'eng' && lastNonEnglishLang) {
      toggleButton.textContent = `Switch to ${lastNonEnglishLang.toUpperCase()}`;
    } else {
      toggleButton.textContent = 'Switch to English';
    }

    // 2) toggle bar visibility
    toggleBar.style.display = lastNonEnglishLang ? 'block' : 'none';

    // 3) socials
    updateSocialLinks(currentLang);

    // 4) re-render content
    onChangeCallback(restoreScroll);
  }

  // ⬇ When dropdown is changed manually
  selector.addEventListener('change', () => {
    currentLang = selector.value;
    if (currentLang !== 'eng') {
      lastNonEnglishLang = currentLang;
    }
    refreshUI(false); // do not restore scroll
  });

  // 🔁 When toggle button is clicked
  toggleButton.addEventListener('click', () => {
    if (currentLang === 'eng' && lastNonEnglishLang) {
      currentLang    = lastNonEnglishLang;
      selector.value = lastNonEnglishLang;
    } else {
      currentLang    = 'eng';
      selector.value = 'eng';
    }
    refreshUI(true); // do restore scroll
  });

  // 🚀 Initial load
  refreshUI(false);
}
