
let currentLang = 'eng';
document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'eng' ? 'kor' : 'eng';
  document.getElementById('lang-toggle').innerText = currentLang === 'eng' ? '🇬🇧 English' : '🇰🇷 한국어';
  render();
});

async function render() {
  const res = await fetch('data/GodKnowledge.json');
  const data = await res.json();
  const container = document.getElementById('content');
  container.innerHTML = '';

  const intro = data.intro[currentLang];
  container.innerHTML += `<div class="intro">${intro.replace(/\n/g, '<br>')}</div><hr/>`;

  data.entries.forEach(entry => {
    const para = document.createElement('div');
    para.className = 'entry';
    para.innerHTML = `
      <div class="meta">${entry.number}</div>
      <div class="text">${entry[currentLang]}</div>
      <button class="toggle-commentary">💬 Commentary</button>
      <div class="commentary">${entry.commentary || "No commentary yet."}</div>
    `;
    para.querySelector('.toggle-commentary').onclick = () => {
      const com = para.querySelector('.commentary');
      com.style.display = com.style.display === 'block' ? 'none' : 'block';
    };
    container.appendChild(para);
  });
}

render();
