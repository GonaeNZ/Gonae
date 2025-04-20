async function loadModules() {
  const [metaRes, modulesRes] = await Promise.all([
    fetch(metaPath),
    fetch(modulesPath)
  ]);
  const meta = await metaRes.json();
  const modules = await modulesRes.json();
  return { meta, modules };
}


async function renderModules() {
  const { meta, modules } = await loadModules();
  const container = document.getElementById('content');
  container.innerHTML = '';

  const intro = meta.intro[currentLang];
  container.innerHTML += `<div class="intro">
    <h2>Version: ${meta.version} | Date: ${meta.date}</h2>
    <p>${intro.replace(/\n/g, '<br>')}</p></div><hr/>`;

  modules.modules.forEach(entry => {
    const para = document.createElement('div');
    para.className = 'entry';
    para.innerHTML = `
      <div class="meta">${entry.id}</div>
      <div class="text">${entry.content[currentLang]}</div>
      <button class="toggle-commentary">💬 Commentary</button>
      <div class="commentary">${entry.commentary[currentLang] || "No commentary yet."}</div>
      <div class="references">${formatReferences(entry.references)}</div>
    `;
    container.appendChild(para);
  });

  initializeExpandButtons();
}

document.addEventListener('DOMContentLoaded', renderModules);