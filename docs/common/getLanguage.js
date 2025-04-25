let currentLang = 'eng';
let lastNonEnglishLang = null;

// expose getter
export function getCurrentLang() {
  return currentLang;
}

export function initLanguageSelector(onChangeCallback) {
  const selector     = document.getElementById('lang-selector');
  const toggleBar    = document.getElementById('toggle-bar');
  const toggleButton = document.getElementById('toggle-lang');

  // grab your social anchors once
  const twitterLink   = document.getElementById('twitter-link');
  const instagramLink = document.getElementById('instagram-link');

  // helper to update the social URLs + text
  function updateSocialLinks(lang) {
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

  // helper to refresh UI elements whenever lang changes
  function refreshUI(restoreScroll) {
    // 1) toggle button text
    if (currentLang === 'eng' && lastNonEnglishLang) {
      toggleButton.textContent = `Switch to ${lastNonEnglishLang.toUpperCase()}`;
    } else {
      toggleButton.textContent = 'Switch to English';
    }

    // 2) show/hide the toggle bar
    toggleBar.style.display = lastNonEnglishLang ? 'block' : 'none';

    // 3) update socials
    updateSocialLinks(currentLang);

    // 4) finally, trigger your page‐content loader
    onChangeCallback(restoreScroll);
  }

  // when the dropdown itself changes
  selector.addEventListener('change', () => {
    currentLang = selector.value;
    if (currentLang !== 'eng') {
      lastNonEnglishLang = currentLang;
    }
    // false = don't restore scroll
    refreshUI(false);
  });

  // when the “switch to…” button is clicked
  toggleButton.addEventListener('click', () => {
    if (currentLang === 'eng' && lastNonEnglishLang) {
      currentLang    = lastNonEnglishLang;
      selector.value = lastNonEnglishLang;
    } else {
      currentLang    = 'eng';
      selector.value = 'eng';
    }
    // true = restore scroll
    refreshUI(true);
  });

  // initial draw
  refreshUI(false);
}
