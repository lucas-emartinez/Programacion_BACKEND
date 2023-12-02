document.addEventListener('DOMContentLoaded', function() {
    const birthDateInput = document.querySelector('input[name="birth_date"]');
    const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en el formato de 'yyyy-mm-dd'

    birthDateInput.setAttribute('max', currentDate);
});

async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            // Si la respuesta es correcta, muestra un toastify de éxito
            Toastify({
                text: 'Usuario creado exitosamente',
                duration: 1000,
                backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                callback: function() {
                    // Redirect to login page after 2000 milliseconds
                    window.location.href = '/login';
                }
            }).showToast();
        } else{
            // Si la respuesta no es correcta, muestra un toastify de error
            Toastify({
                text: result.error,
                duration: 3000,
                backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
            }).showToast();
        }
    } catch (error) {
        // Si hay un error, muestra un toastify de error
        Toastify({
            text: 'Error al crear el usuario',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        }).showToast();
    }
}
          
      