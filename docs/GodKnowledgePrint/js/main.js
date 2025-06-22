
const metaPath = 'data/meta.json';
const modulesPath = 'data/GodKnowledge.json';

async function loadModules() {
  try {
    const [metaRes, modulesRes] = await Promise.all([
      fetch(metaPath),
      fetch(modulesPath)
    ]);
    const meta = await metaRes.json();
    const modules = await modulesRes.json();
    return { meta, modules };
  } catch (e) {
    console.error("Error loading modules:", e);
    return null;
  }
}

async function renderModules() {
  const data = await loadModules();
  if (!data) return;
  const { meta, modules } = data;

  const container = document.getElementById('content');
  const verseLang = await getCurrentLang(); // ✅ await the language setting

  container.innerHTML = `
    <div class="intro">
      <h2>Version: ${meta.version} | Date: ${meta.date}</h2>
      <p>${meta.intro.eng.replace(/\n/g, '<br>')}</p>
      <p>${meta.intro.kor.replace(/\n/g, '<br>')}</p>
    </div>
  `;

  // ✅ Use for...of to allow await inside loop
  for (const entry of modules.modules) {
  const div = document.createElement('div');
  div.className = 'entry';

  const commentaryEng = entry.commentary?.eng || '';
  const commentaryKor = entry.commentary?.kor || '';
  const contentEng = entry.content?.eng || '';
  const contentKor = entry.content?.kor || '';
  const refsHtml = await formatReferences(entry.references, verseLang);

  div.innerHTML = `
    <div>
      <span class="meta-text">${entry.id}.</span>
      <span class="text">${contentEng}</span><br/>
      <span class="text">${contentKor}</span>
    </div>
${(commentaryEng || commentaryKor) ? `
  <div class="commentary">
    ${commentaryEng ? `<div><strong>EN:</strong> ${commentaryEng}</div>` : ''}
    ${commentaryKor ? `<div><strong>KR:</strong> ${commentaryKor}</div>` : ''}
  </div>
` : ''}
    <div class="verses">${refsHtml}</div>
  `;

  container.appendChild(div);
}
}

document.addEventListener('DOMContentLoaded', async () => {
  await initLanguageSelector(renderModules);
  await renderModules();
});


async function getCurrentLang() {
  return localStorage.getItem('verseLang')?.trim() || 'eng';
}


const VERSION_MAP = {
  eng: 'NIV',
  kor: 'KLB',
};

const BOOK_TRANSLATIONS = {
  Genesis: { kor: '창세기' },
  Revelation: { kor: '요한계시록' },
  // ... include rest as needed
};

const REF_SPLIT = /^(.+?)\s+([\d].*)$/;

function formatReferences(refs, currentLang = 'eng') {
  if (!Array.isArray(refs) || refs.length === 0) return '';

  const version = VERSION_MAP[currentLang] || VERSION_MAP.eng;

  const items = refs.map(engTextRaw => {
    const engText = engTextRaw.trim();
    let displayText = engText;

    if (currentLang !== 'eng') {
      const m = REF_SPLIT.exec(engText);
      if (m) {
        const [ , book, remainder ] = m;
        const trans = BOOK_TRANSLATIONS[book]?.[currentLang] || book;
        displayText = `${trans} ${remainder}`;
      }
    }

    const url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(engText)}&version=${version}`;
    return `<div class="verse-link"><a href="${url}" target="_blank">${displayText}</a></div>`;
  });

  return `<div class="verses">${items.join('')}</div>`;
}



// ✅ fixed initLanguageSelector
async function initLanguageSelector(callback) {
  const selector = document.getElementById('lang-selector');
  if (!selector) {
    console.warn('Language selector not found');
    return;
  }

const current = await getCurrentLang();
selector.value = current || 'eng';

  selector.addEventListener('change', async () => {
    localStorage.setItem('verseLang', selector.value);
    await callback(); // ✅ re-render with awaited callback
  });
}

function cleanText(text) {
  return (text || '')
    .replace(/\n/g, '<br>')
    .trim();
}
