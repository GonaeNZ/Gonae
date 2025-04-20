async function render() {
  const [metaRes, modulesRes] = await Promise.all([
    fetch('data/meta.json'),
    fetch('data/modules.json')
  ]);
  const meta = await metaRes.json();
  const data = await modulesRes.json();
  const container = document.getElementById('content');
  container.innerHTML = '';

  const intro = meta.intro[currentLang];
  container.innerHTML += `<div class="intro"><h2>Version: ${meta.version} | Date: ${meta.date}</h2><p>${intro.replace(/\n/g, '<br>')}</p></div><hr/>`;

  data.modules.forEach(entry => {
    const para = document.createElement('div');
    para.className = 'entry';
    para.innerHTML = `
      <div class="meta">${entry.id}</div>
      <div class="text">${entry.content[currentLang]}</div>
      <button class="toggle-commentary">💬 Commentary</button>
      <div class="commentary">${entry.commentary[currentLang] || "No commentary yet."}</div>
    `;
    para.querySelector('.toggle-commentary').onclick = () => {
      const com = para.querySelector('.commentary');
      com.style.display = com.style.display === 'block' ? 'none' : 'block';
    };
    container.appendChild(para);
  });
}

render();