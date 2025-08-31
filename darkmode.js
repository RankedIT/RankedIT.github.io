document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('darkModeToggle');
  const body = document.body;

  // Bestimme Start-Theme: saved > prefers-color-scheme > light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-mode' || savedTheme === 'light-mode') {
    body.classList.add(savedTheme);
  } else {
    // System preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.add(prefersDark ? 'dark-mode' : 'light-mode');
  }

  // Wenn der Button nicht existiert (z. B. test pages), dann beende sauber
  if (!toggleButton) return;

  // Update aria-pressed for accessibility
  const updateAria = () => {
    const isDark = body.classList.contains('dark-mode');
    toggleButton.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  };
  updateAria();

  toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.replace('dark-mode', 'light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      body.classList.replace('light-mode', 'dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
    updateAria();
  });
});