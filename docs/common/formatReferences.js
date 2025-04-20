export function formatReferences(refs) {
    if (!refs || refs.length === 0) return '';
    return '<ul>' + refs.map(ref =>
      `<li><a href="${ref.url}" target="_blank">${ref.text}</a></li>`
    ).join('') + '</ul>';
  }
  