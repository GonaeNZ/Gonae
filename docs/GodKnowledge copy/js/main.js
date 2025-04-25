import { cleanText } from '../../common/cleanText.js';
import { formatReferences } from '../../common/formatReferences.js';
import { initializeExpandButtons } from '../../common/initializeExpand.js';
import { getCurrentLang, initLanguageSelector } from '../../common/getLanguage.js';

const metaPath = 'data/meta.json';
const modulesPath = 'data/GodKnowledge.json';

async function loadModules() {
  const [metaRes, modulesRes] = await Promise.all([
    fetch(metaPath),
    fetch(modulesPath)
  ]);
  const meta = await metaRes.json();
  const modules = await modulesRes.json();
  return { meta, modules };
}

async function renderModules(restoreScroll = true) {
    const { meta, modules } = await loadModules();
    const container = document.getElementById('content');
    const currentLang = getCurrentLang();
  
    const previouslyExpanded = getExpandedIds();
    const topEntryId = restoreScroll ? getTopVisibleEntryId() : null;
  
    container.innerHTML = `
      <div class="intro">
        <h2>Version: ${meta.version} | Date: ${meta.date}</h2>
        <p>${meta.intro[currentLang].replace(/\n/g, '<br>')}</p>
      </div><hr/>
    `;
  
    modules.modules.forEach(entry => {
      const para = document.createElement('div');
      para.className = 'entry';
  
      const commentaryText = cleanText(entry.commentary[currentLang]);
      const showCommentary = commentaryText && commentaryText !== "No commentary yet.";
      const refsHtml = formatReferences(entry.references);
      const hasVerses = refsHtml && refsHtml.trim() !== '';
  
      para.innerHTML = `
        <div class="meta">${entry.id}</div>
        <div class="text">${cleanText(entry.content[currentLang])}</div>
        ${showCommentary ? `
          <button class="toggle-commentary">💬 Commentary</button>
          <div class="commentary">${commentaryText}</div>
        ` : ''}
        ${hasVerses ? `
          <button class="toggle-verses">📖 Verses</button>
          <div class="verses" style="display: none;">${refsHtml}</div>
        ` : ''}
      `;
      container.appendChild(para);
    });
  
    initializeExpandButtons();
    restoreExpanded(previouslyExpanded);
  
    // Add verse toggle handlers
    document.querySelectorAll('.toggle-verses').forEach(btn => {
      btn.addEventListener('click', () => {
        const verses = btn.nextElementSibling;
        if (verses.style.display === 'block') {
          verses.style.display = 'none';
          btn.textContent = '📖 Verses';
        } else {
          verses.style.display = 'block';
          btn.textContent = '✖ Hide Verses';
        }
      });
    });
  
    if (restoreScroll && topEntryId) {
      scrollToEntryById(topEntryId);
    }
  }
  
  initLanguageSelector(renderModules);
  document.addEventListener('DOMContentLoaded', renderModules);
  
  function getExpandedIds() {
    return [...document.querySelectorAll('.commentary')]
      .filter(el => el.style.display === 'block')
      .map(el => el.closest('.entry')?.querySelector('.meta')?.textContent);
  }
  
  function restoreExpanded(ids) {
    ids.forEach(id => {
      const entry = [...document.querySelectorAll('.entry')]
        .find(e => e.querySelector('.meta')?.textContent === id);
      if (entry) {
        const commentary = entry.querySelector('.commentary');
        if (commentary) commentary.style.display = 'block';
      }
    });
  }
  
  function getTopVisibleEntryId() {
      const entries = [...document.querySelectorAll('.entry')];
      const top = window.scrollY;
    
      for (const entry of entries) {
        const rect = entry.getBoundingClientRect();
        const absTop = rect.top + window.scrollY;
        if (absTop >= top) {
          return entry.querySelector('.meta')?.textContent;
        }
      }
      return null;
    }
    
    function scrollToEntryById(id) {
      const entry = [...document.querySelectorAll('.entry')]
        .find(e => e.querySelector('.meta')?.textContent === id);
      if (entry) {
        entry.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
