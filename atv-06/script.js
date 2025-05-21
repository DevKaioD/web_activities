const toggleBtn = document.getElementById('toggle-dark-mode');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Salva preferência no localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Ao carregar, verifica se o usuário já tinha uma preferência
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  });