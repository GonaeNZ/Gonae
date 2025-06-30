import { getCurrentLang, initLanguageSelector } from '../../common/getLanguage.js';

const contentBasePath = 'content/pageContent'; // prefix for lang-based file paths

function getTextFilePath(langCode) {
  return `${contentBasePath}${langCode}.txt`;
}

async function loadTextContent(langCode) {
  const container = document.getElementById('content');
  container.innerHTML = '<p>Loading content...</p>';

  const filePath = getTextFilePath(langCode);

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`File not found: ${filePath}`);
    const text = await response.text();
    container.innerHTML = formatPlainText(text);
  } catch (err) {
    container.innerHTML = `<p>Content not available for <strong>${langCode}</strong>.</p>`;
    console.error(`Error loading ${filePath}:`, err);
  }
}

function formatPlainText(text) {
  return text
    .split('\n\n').map(paragraph =>
      `<p>${paragraph.trim().replace(/\n/g, '<br/>')}</p>`
    ).join('\n');
}

async function renderTextPage(restoreScroll = false) {
  const langCode = getCurrentLang();
  await loadTextContent(langCode);
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector(renderTextPage);
  renderTextPage();
});
