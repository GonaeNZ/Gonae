export function initializeExpandButtons() {
    document.querySelectorAll('.toggle-commentary').forEach(button => {
      button.addEventListener('click', () => {
        const commentary = button.nextElementSibling;
        commentary.style.display = commentary.style.display === 'block' ? 'none' : 'block';
      });
    });
  }
  