document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (!logoutButton) return;
  logoutButton.addEventListener('click', async () => {
      try {
          const response = await fetch('/api/sessions/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (response.ok) {
              window.location.href = response.url;
          } else {
              console.error('Error al cerrar sesión');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

