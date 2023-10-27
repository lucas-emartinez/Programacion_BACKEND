document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', async () => {
      try {
          const response = await fetch('/api/users/logout', {
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


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)

        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.error('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});